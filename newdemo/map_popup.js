let selectedLatLng = null;

function initMapPopup(mapDivId) {
  const map = L.map(mapDivId).setView([27.7172, 85.3240], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  let marker;
  map.on('click', function (e) {
    selectedLatLng = e.latlng;
    if (marker) marker.setLatLng(e.latlng);
    else marker = L.marker(e.latlng).addTo(map);
  });
}

function getSelectedLatLng() {
  return selectedLatLng;
}

export { initMapPopup, getSelectedLatLng };