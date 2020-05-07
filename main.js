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
 
} 