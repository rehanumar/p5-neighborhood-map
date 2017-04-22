ko.bindingHandlers.map = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
      var mapObj = ko.utils.unwrapObservable(valueAccessor());
      var mapOptions = { center: {lat:35.455357, lng:23.476961},
                        zoom: 2};

      mapObj.googleMap = new google.maps.Map(element, mapOptions);

        ko.utils.arrayForEach(mapObj, function(marker) {
          var googleMarker = new google.maps.Marker({
            map: mapObj.googleMap,
            position: marker.pos,
            title: marker.name,
            isOverlayVisible: false
          });
          googleMarker.infoWindow = new google.maps.InfoWindow();
          googleMarkersModel.push(googleMarker);
          googleMarker.addListener('click', function (googleMarker) {
            return function () {
              var markerPos = {lat: googleMarker.position.lat(), lng: googleMarker.position.lng()};
              weatherModel(googleMarker.position.lat(), googleMarker.position.lng());
              populateInfoWindow(mapObj.googleMap, googleMarker);
              setTimeout(getStreetView.bind(markerPos),100);
            }
          }(googleMarker));
        });

      function populateInfoWindow(map, googleMarker) {
        googleMarkersModel.forEach(function(marker){
          if(marker.isOverlayVisible) {
            marker.infoWindow.close();
            marker.isOverlayVisible = false;
          }
        });
        googleMarker.infoWindow.setContent('<div id="pano"></div>');
        googleMarker.infoWindow.open(map, googleMarker);
        googleMarker.isOverlayVisible = true;
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
            document.getElementById('pano').innerText = 'street view is not available for this location!'
          }
        }
      }

    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
      var mapObj = ko.unwrap(valueAccessor());
      ko.utils.arrayForEach(googleMarkersModel, function(marker, index) {
       marker.setVisible(mapObj[index].isVisible());
       if(!mapObj[index].isVisible()) {
         marker.infoWindow.close();
         marker.isOverlayVisible = false;
       }
      });
    }
};
