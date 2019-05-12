//Data
//Coffee Stores
var dataset = "https://raw.githubusercontent.com/wjlnfgd/cpln692-final/master/data/coffeePA.geojson";
var parsedData;
$.ajax(dataset).done(function(data){
  parsedData = JSON.parse(data);
});

// County Boundaries in PA
var phillyBoundary = "https://raw.githubusercontent.com/wjlnfgd/cpln692-final/master/data/PaCounty2019_05.geojson";
var boundary;
$.ajax(phillyBoundary).done(function(data){
  boundary = JSON.parse(data);
});

//Map
var map = L.map('map', {
  center: [41.0131,-77.6184],
  zoom: 8,
  zoomControl: false
});

var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

L.control.zoom({
    position:'topright'
}).addTo(map);

//Get Data Ready!
$(document).ready(function() {
  // Philly boundary
  $.ajax(phillyBoundary).done(function(data) {
    boundary = JSON.parse(data);
    defaultBoundary();
    // First plot philly boundary then plot markers - crucial for layer order
    $.ajax(dataset).done(function(data) {
      parsedData = JSON.parse(data);
      defaultPage();
    });
  });
});
