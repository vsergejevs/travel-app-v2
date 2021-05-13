const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations + ' This log lives in mapbox.js');

mapboxgl.accessToken =
  'pk.eyJ1IjoidnNlcmdleWV2IiwiYSI6ImNrbWY5ZHVkMDB1aHUycnA1b2hyMmhoYWEifQ.kDNxctFydEwGgwnWkWfLyg';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/vsergeyev/ckmfw7xsyo6bz17l90vh2tjpt',
  // center: [-122.29286, 38.294065],
  // zoom: 5
});

// figure out position of the map based on tour location points, bounds will be the area displayed on the map
const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup()
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  // Extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 200,
    left: 100,
    right: 100,
  },
});
