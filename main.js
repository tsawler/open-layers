window.onload=init;

const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

closer.onclick = function() {
	popupOverlay.setPosition(undefined);
	closer.blur();
	return false;
};

const popupOverlay = new ol.Overlay({
	element: container,
	autoPan: true,
	autoPanAnimation: {
		duration: 250
	}
});
     
function init () {

	// Controls
	const fullScreenControl = new ol.control.FullScreen();
	const zoomSliderControl = new ol.control.ZoomSlider();
	const zoomToExtentControl = new ol.control.ZoomToExtent();

	const frederictonLatLon = [-66.76388278666946, 45.99639632131496];
	const frederictonMercator = ol.proj.fromLonLat(frederictonLatLon);

	const map = new ol.Map({
		view: new ol.View({
			center: frederictonMercator,
			zoom: 17,
			maxZoom: 20,
			minZoom: 2,
		}),
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM(),
			 })
		],
		target: 'js-map',
		keyboardEventTarget: document,
		controls: ol.control.defaults().extend([
			fullScreenControl,
			zoomSliderControl,
			zoomToExtentControl,
		])
	})

	addMapMarker(map, 45.99639632131496,-66.76388278666946)

	

	map.addOverlay(popupOverlay);

	map.on('singleclick', function (event) {
		if (map.hasFeatureAtPixel(event.pixel) === true) {
			var coordinate = event.coordinate;
   
			content.innerHTML = 'Myria lives here!';
			popupOverlay.setPosition(coordinate);
		} else {
			popupOverlay.setPosition(undefined);
			closer.blur();
		}
	});
 
} 

function addMapMarker(m, lat, lng) {
	var vectorLayer = new ol.layer.Vector({
	  source:new ol.source.Vector({
		features: [new ol.Feature({
			  geometry: new ol.geom.Point(ol.proj.transform([parseFloat(lng), parseFloat(lat)], 'EPSG:4326', 'EPSG:3857')),
		  })]
	  }),
	  style: new ol.style.Style({
		image: new ol.style.Icon({
		  anchor: [0.5, 0.5],
		  anchorXUnits: "fraction",
		  anchorYUnits: "fraction",
		//   src: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Map_pin_icon.svg"
		  src: "img/pin.svg"
		})
	  })
	});

	m.addLayer(vectorLayer); 
  }