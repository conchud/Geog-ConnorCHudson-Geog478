<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Interactive GeoJSON Map</title>
<link
rel="stylesheet"
href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
crossorigin=""
/>
<style>
body {
font-family: Arial, sans-serif;
margin: 0;
padding: 0;
text-align: center;
}

h1 {
margin: 20px 0;
font-size: 24px;
color: #333;
}

#mapid {
height: 600px;
width: 90%;
max-width: 1200px;
margin: 0 auto;
border: 2px solid #ccc;
border-radius: 8px;
}

.info {
margin: 10px auto;
max-width: 800px;
font-size: 14px;
color: #555;
}
</style>
</head>
<body>
<h1>Interactive GeoJSON Map with Leaflet</h1>
<div class="info">
This map displays various GeoJSON features, including styled points, lines,
and polygons. Click on a feature to see its properties, or interact with the
map to explore its dynamic functionalities.
</div>
<div id="mapid"></div>

<script
src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
integrity="sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw=="
crossorigin=""
></script>
<script>
// Initialize the map
var map = L.map("mapid").setView([39.75621, -104.99404], 6);

// Add a tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
attribution:
'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
maxZoom: 18,
}).addTo(map);

// GeoJSON Feature - Point
var geojsonFeature = {
type: "Feature",
properties: {
name: "Coors Field",
amenity: "Baseball Stadium",
popupContent: "This is where the Rockies play!",
},
geometry: {
type: "Point",
coordinates: [-104.99404, 39.75621],
},
};

// Add GeoJSON Point with a custom CircleMarker
var geojsonMarkerOptions = {
radius: 8,
fillColor: "#ff7800",
color: "#000",
weight: 1,
opacity: 1,
fillOpacity: 0.8,
};

L.geoJSON(geojsonFeature, {
pointToLayer: function (feature, latlng) {
return L.circleMarker(latlng, geojsonMarkerOptions);
},
onEachFeature: function (feature, layer) {
if (feature.properties && feature.properties.popupContent) {
layer.bindPopup(feature.properties.popupContent);
}
},
}).addTo(map);

// GeoJSON Lines
var myLines = [
{
type: "LineString",
coordinates: [
[-100, 40],
[-105, 45],
[-110, 55],
],
},
{
type: "LineString",
coordinates: [
[-105, 40],
[-110, 45],
[-115, 55],
],
},
];

var myStyle = {
color: "#0078ff",
weight: 5,
opacity: 0.7,
};

L.geoJSON(myLines, { style: myStyle }).addTo(map);

// GeoJSON Polygons with per-feature styling
var states = [
{
type: "Feature",
properties: { party: "Republican" },
geometry: {
type: "Polygon",
coordinates: [
[
[-104.05, 48.99],
[-97.22, 48.98],
[-96.58, 45.94],
[-104.03, 45.94],
[-104.05, 48.99],
],
],
},
},
{
type: "Feature",
properties: { party: "Democrat" },
geometry: {
type: "Polygon",
coordinates: [
[
[-109.05, 41.0],
[-102.06, 40.99],
[-102.03, 36.99],
[-109.04, 36.99],
[-109.05, 41.0],
],
],
},
},
];

L.geoJSON(states, {
style: function (feature) {
switch (feature.properties.party) {
case "Republican":
return { color: "#ff0000" };
case "Democrat":
return { color: "#0000ff" };
}
},
onEachFeature: function (feature, layer) {
if (feature.properties && feature.properties.party) {
layer.bindPopup("Party: " + feature.properties.party);
}
},
}).addTo(map);

// GeoJSON Features with a filter
var someFeatures = [
{
type: "Feature",
properties: {
name: "Coors Field",
show_on_map: true,
},
geometry: {
type: "Point",
coordinates: [-104.99404, 39.75621],
},
},
{
type: "Feature",
properties: {
name: "Busch Field",
show_on_map: false,
},
geometry: {
type: "Point",
coordinates: [-104.98404, 39.74621],
},
},
];

L.geoJSON(someFeatures, {
filter: function (feature, layer) {
return feature.properties.show_on_map;
},
onEachFeature: function (feature, layer) {
if (feature.properties && feature.properties.name) {
layer.bindPopup(feature.properties.name);
}
},
}).addTo(map);
</script>
</body>
</html>