const locations = JSON.parse(document.getElementById('map').dataset.locations);

mapboxgl.accessToken = 'pk.eyJ1IjoidnNlcmdleWV2IiwiYSI6ImNrbWY5ZHVkMDB1aHUycnA1b2hyMmhoYWEifQ.kDNxctFydEwGgwnWkWfLyg';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/vsergeyev/ckmfw7xsyo6bz17l90vh2tjpt',
  center: [-122.29286, 38.294065],
  zoom: 5
});