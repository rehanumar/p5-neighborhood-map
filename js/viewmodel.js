function AppViewModel() {
    var self = this;
    self.visibleMarkers = ko.observableArray(markersModel);
    self.googleMarkers = ko.observableArray(googleMarkersModel);
    self.searchTerm = ko.observable('');
    // calling the weatherModel to display the weather information of first marker.
    var firstMarker = self.visibleMarkers()[0];
    // weatherModel(firstMarker.pos.lat, firstMarker.pos.lng, firstMarker.name);

    self.filterResults = ko.computed(function() {
      if(!self.searchTerm()) {
        ko.utils.arrayFilter(self.googleMarkers(), function (marker) {
          marker.setMap(googleMap);
        });
        return self.visibleMarkers();
      } else {
        ko.utils.arrayFilter(self.googleMarkers(), function (marker) {
          if(ko.utils.stringStartsWith(marker.title.toLowerCase(), self.searchTerm().toLowerCase())) {
            marker.setMap(googleMap);
          } else {
            marker.setMap(null);
          }
        });
        return ko.utils.arrayFilter(self.visibleMarkers(), function(marker) {
          return ko.utils.stringStartsWith(marker.name.toLowerCase(), self.searchTerm().toLowerCase());
        });
      }
    });

    self.showMarkerInfo = function () {
      var $index = this;
      google.maps.event.trigger(googleMarkersModel[$index], 'click');
    }
    // self.removeOthers = function (clickedMarker) {
    //   ko.utils.arrayForEach(self.visibleMarkers(), function (marker) {
    //     if(marker.name !== clickedMarker.name) {
    //       marker.isVisible(false);
    //     } else {
    //       marker.isVisible(true);
    //     }
    //   });
    // };
}

// TODO: need to stablize this initMap function whose task currently is only to create and append the google map and google markers in their models!
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
      title: marker.name,
      isOverlayVisible: false
    });

    googleMarker.addListener('click', function (googleMarker, infoWindow) {
      markerClicked(googleMarker, infoWindow);
    }(googleMarker, infoWindow));

    googleMarkersModel.push(googleMarker);
  });

  function markerClicked(googleMarker, infoWindow) {
    var markerPos = {lat: googleMarker.position.lat(), lng: googleMarker.position.lng()};
    // weatherModel(googleMarker.position.lat(), googleMarker.position.lng(), googleMarker.title);

    toggleBounce(googleMarker);

    googleMap.setCenter(markerPos);
    populateInfoWindow(googleMap, googleMarker, infoWindow);
    setTimeout(getStreetView.bind(markerPos),100);
  }

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
    // googleMarkersModel.forEach(function(marker){
    //   if(marker.isOverlayVisible) {
    //     infoWindow.close();
    //     marker.isOverlayVisible = false;
    //   }
    // });
    infoWindow.setContent('<div id="pano"></div>');
    infoWindow.open(map, googleMarker);
    // googleMarker.isOverlayVisible = true;
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

var weatherViewModel = {
  location: ko.observable(''),
  temp: ko.observable(''),
  humidity: ko.observable(''),
  description: ko.observable(''),
  url: ko.observable('')
};


ko.applyBindings(new AppViewModel(), document.getElementById('mapView'));
ko.applyBindings(weatherViewModel, document.getElementById('weatherView'));
