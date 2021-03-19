const locations = JSON.parse(document.getElementById('map').dataset.locations);

mapboxgl.accessToken = 'pk.eyJ1IjoidnNlcmdleWV2IiwiYSI6ImNrbWY5ZHVkMDB1aHUycnA1b2hyMmhoYWEifQ.kDNxctFydEwGgwnWkWfLyg';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11'
});