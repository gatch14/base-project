function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center:
      {
        lat: 48.866667,
        lng: 2.333333
      },
    zoom: 13
  });
}
window.onload= initMap;