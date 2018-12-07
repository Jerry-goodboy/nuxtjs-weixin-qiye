import L from 'leaflet'
var esri = require('esri-leaflet')
var esriLeafletRenderers = require('esri-leaflet-renderers')
var proj4 = require('proj4')
var proj4leaflet = require('proj4leaflet')
// debugger
export default () => {
	L.esri = esri
	window.L = L;
}