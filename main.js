window.onload=init;
     
function init () {

	const frederictonLatLon = [-66.7675296, 45.9925778];
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
				source: new ol.source.OSM()
			 })
		],
		target: 'js-map'
	})

	const popupContainerElement = document.getElementById("popup-coordinates");

	const popup = new ol.Overlay({
		element: popupContainerElement, 
		positioning: 'bottom-center',
	})

	map.addOverlay(popup);

	map.on('click', function(e){
		console.log(e);
		const clickedCoordinate = e.coordinate;
		popup.setPosition(undefined);
		popup.setPosition(clickedCoordinate);
		
		
		const lonLat = ol.proj.transform(clickedCoordinate, 'EPSG:3857', 'EPSG:4326');
		console.log(lonLat);
		popupContainerElement.innerHTML = lonLat[1] + ", " + lonLat[0];
	})
 
} 