/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibW9nbGk2MyIsImEiOiJja3QxbHJzeHMwYm1wMm9vOGV0cnZuczE4In0.I15j6E1VAsL-AeiikwjYQQ';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mogli63/ckt1mh1of15rt17o1h6hs1z9b',
    center: [-118.113491, 34.111745],
    zoom: 8,
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // CREATE and ADD MARKER
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // ADD POPUP
    new mapboxgl.Popup({
      offset: 34,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    // extends the map bounds to include current locations
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};


