function appViewModel() {
    var self = this;
    self.visibleMarkers = ko.observableArray(markersModel);
    // calling the weatherModel to display the weather information of first marker.
    weatherModel(markersModel[0].pos.lat, markersModel[0].pos.lng);

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
  temp: ko.observable(''),
  humidity: ko.observable(''),
  description: ko.observable('')
};


ko.applyBindings(new appViewModel(), document.getElementById('mapView'));
ko.applyBindings(weatherViewModel, document.getElementById('weatherView'));
