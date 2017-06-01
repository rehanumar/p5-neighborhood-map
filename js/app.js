/* app.js
 * This file provides the basic setup of the whole site. It is mainly used to
 * define the init functions of the APIs. Like in this case it have the initMap
 * function of the google Maps API.
 *
 * generally these kind of methods does not fall into viewModel, Model and view
 * categories, As these methods need to do direct DOM manipulation. And it is
 * not considered a good practice to do DOM manipulation in viewModels.
 *
 * This initMap function pushes data into models defined in models.js.
 */
 

function initMap() {
  googleMap = new google.maps.Map(document.getElementById('map'), {
    center: {lat:35.455357, lng:23.476961},
    zoom: 2
  });

  infoWindow = new google.maps.InfoWindow();

  ko.utils.arrayForEach(markersModel, function(marker) {
    var googleMarker = new google.maps.Marker({
      map: googleMap,
      position: marker.pos,
      id: marker.id,
      title: marker.name
    });

    googleMarker.addListener('click', function (googleMarker) {
      return function () {
        var markerPos = {lat: googleMarker.position.lat(), lng: googleMarker.position.lng()};
        weatherModel(googleMarker.position.lat(), googleMarker.position.lng(), googleMarker.title);
        googleMap.setCenter(markerPos);
        toggleBounce(googleMarker);
        populateInfoWindow(googleMap, googleMarker, infoWindow);
        setTimeout(getStreetView.bind(markerPos),100);
      };
    }(googleMarker));

    googleMarkersModel.push(googleMarker);
  });

  function toggleBounce(googleMarker) {
    if (googleMarker.getAnimation() || googleMarker.getAnimation() !== undefined) {
      googleMarker.setAnimation(null);
    } else {
      googleMarker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function(){
        toggleBounce(googleMarker);
      }, 750);
    }
  }

  function populateInfoWindow(map, googleMarker, infoWindow) {
    infoWindow.setContent('<div id="pano"></div>');
    infoWindow.open(map, googleMarker);
  }

  function getStreetView() {
    var markerPos = this;
    var sv = new google.maps.StreetViewService();
    var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));

    sv.getPanorama({location: markerPos, radius: 50}, displayStreetView);

    function displayStreetView(data, status) {
      if(status === google.maps.StreetViewStatus.OK) {
        panorama.setPano(data.location.pano);
        panorama.setPov({
            heading: 270,
            pitch: 0
          });
        panorama.setVisible(true);
      } else {
        document.getElementById('pano').innerText = 'street view is not available for this location!';
      }
    }
  }

}
