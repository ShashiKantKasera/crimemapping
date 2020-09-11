window.onload = init;

function init(){

     // Controls
     const fullScreenControl = new ol.control.FullScreen();
     const mousePositionControl = new ol.control.MousePosition();
     const overViewMapControl = new ol.control.OverviewMap({
       collapsed: false,
       layers: [
         new ol.layer.Tile({
           source: new ol.source.OSM()      
         })
       ]
     });
       const scaleLineControl = new ol.control.ScaleLine();
       const zoomSliderControl = new ol.control.ZoomSlider();
       const zoomToExtentControl = new ol.control.ZoomToExtent();


  const map = new ol.Map({
    view: new ol.View({
      center: [-13615705,4526800],
      zoom: 11,
     //extent: [-122.5136420999999984,37.7081536000000028 ,-122.3655653999999942,37.8199754899999974],   
    }),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    target: 'openlayers-map',
    controls: ol.control.defaults().extend([
      fullScreenControl,
      mousePositionControl,
      overViewMapControl,
      scaleLineControl,
      zoomSliderControl,
      zoomToExtentControl
    ])
  });

    // california GeoJSON
  
      
  
    const austCitiesLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: './data.geojson'
      })
     
    })
    map.addLayer(austCitiesLayer);

    // Map Features Click Logic
  const navElements = document.querySelector('.column-navigation');
  const cityNameElement = document.getElementById('location');
  const cityImageElement = document.getElementById('address');
  const mapView = map.getView();

  map.on('singleclick', function(evt){
    console.log(evt.coordinate);
    map.forEachFeatureAtPixel(evt.pixel, function(feature, layer){
      let featureName = feature.get('crime');
      let navElement = navElements.children.namedItem(featureName); 
      mainLogic(feature, navElement)
    })
  })

  function mainLogic(feature, clickedAnchorElement){

    let aussieCitiesFeatures = austCitiesLayer.getSource().getFeatures();
   
  

    let featureName = feature.get('location');
    let featureName1 = feature.get('address');
    let featureName2 = feature.get('crimeaction');
    let featureName3 = feature.get('date');
    let featureName4 = feature.get('crime');
    let featureName5 = feature.get('policeaction');
    cityNameElement.innerHTML = 'Crime Location in California city: ' + featureName + '</br>' +
                                          'Address :' + featureName1 + '</br>' +
                                          'Crime Action: ' + featureName2 + '</br>' +
                                          'Date :' + featureName3 + '</br>' +
                                          'Crime: ' + featureName4 + '</br>' +
                                          'Police Action :' + featureName5 

    }

     // Navigation Button Logic
     const anchorNavElements = document.querySelectorAll('.column-navigation > a');
     for(let anchorNavElement of anchorNavElements){
       anchorNavElement.addEventListener('click', function(e){
         let clickedAnchorElement = e.currentTarget;
         let clickedAnchorElementID = clickedAnchorElement.id;
         let aussieCitiesFeatures = austCitiesLayer.getSource().getFeatures();
         aussieCitiesFeatures.forEach(function(feature){
           let featureCityName = feature.get('crime');
           if(clickedAnchorElementID === featureCityName){
             mainLogic(feature, clickedAnchorElement);
           }
          })
           // Home Navigation Case
      if(clickedAnchorElementID === 'Home'){
        mainLogic(undefined, clickedAnchorElement)
      }
      
      })
     }
}
 