function AppViewModel() {
    var self = this;
    self.visibleMarkers = ko.observableArray(markersModel);
    self.googleMarkers = ko.observableArray(googleMarkersModel);
    self.searchTerm = ko.observable('');

    /* calling the weatherModel to display the weather information of first
    * marker when the app is firstly initialized.
    */
    var firstMarker = self.visibleMarkers()[0];
    weatherModel(firstMarker.pos.lat, firstMarker.pos.lng, firstMarker.name);

    self.filterResults = ko.computed(function() {
      if(!self.searchTerm()) {
        return self.visibleMarkers();
      } else {
        return ko.utils.arrayFilter(self.visibleMarkers(), function(marker) {
          return ko.utils.stringStartsWith(marker.name.toLowerCase(), self.searchTerm().toLowerCase());
        });
      }
    });

    self.showMarkerInfo = function () {
      var $index = this;
      /* iterating over the array fore figuring out exactly which marker is clicked.
      * Important for scenario where filterResults array have one value and it
      * is other then the first value of visibleMarkers array.
      */
      ko.utils.arrayForEach(self.googleMarkers(), function (marker) {
        if(self.filterResults()[$index].id === marker.id) {
            google.maps.event.trigger(marker, 'click');
        }
      });
    };
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
