function AppViewModel() {
    var self = this;
    self.visibleMarkers = ko.observableArray(markersModel);
    // calling the weatherModel to display the weather information of first marker.
    var firstMarker = self.visibleMarkers()[0];
    // weatherModel(firstMarker.pos.lat, firstMarker.pos.lng, firstMarker.name);

    self.filterResults = function (formElement) {
      ko.utils.arrayForEach(self.visibleMarkers(), function (marker) {
        if(marker.name.toLowerCase().indexOf(formElement.searchTerm.value.toLowerCase()) === -1) {
          marker.isVisible(false);
        } else {
          marker.isVisible(true);
        }
      });
    };

    self.removeOthers = function (clickedMarker) {
      ko.utils.arrayForEach(self.visibleMarkers(), function (marker) {
        if(marker.name !== clickedMarker.name) {
          marker.isVisible(false);
        } else {
          marker.isVisible(true);
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
