window.onload=init;
     
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

	// const markerLayer = new ol.layer.Vector({
	// 	source: new ol.source.Vector({
	// 		features: [
	// 			new ol.Feature({
	// 				geometry: new ol.geom.Point(ol.proj.fromLonLat([-66.76460698310346, 45.99618390011389]))
	// 			})
	// 		]
	// 	})
	// });
	// map.addLayer(markerLayer);

	addMapMarker(map, 45.99618390011389, -66.76460698310346,)

	const popupContainerElement = document.getElementById("popup-coordinates");

	const popup = new ol.Overlay({
		element: popupContainerElement, 
		positioning: 'bottom-center',
	})

	map.addOverlay(popup);

	map.on('click', function(e){
		const clickedCoordinate = e.coordinate;
		popup.setPosition(undefined);
		popup.setPosition(clickedCoordinate);
		
		
		const lonLat = ol.proj.transform(clickedCoordinate, 'EPSG:3857', 'EPSG:4326');
		console.log(lonLat);
		popupContainerElement.innerHTML = lonLat[1] + ", " + lonLat[0];
		document.getElementById("lat").value = lonLat[1];
		document.getElementById("lon").value = lonLat[0];
	})


	const dragRotateInteraction = new ol.interaction.DragRotate({
		condition: ol.events.condition.altKeyOnly
	})

	map.addInteraction(dragRotateInteraction)
 
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