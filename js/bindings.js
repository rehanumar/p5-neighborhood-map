ko.bindingHandlers.map = {
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
      var filteredMarkers = ko.utils.unwrapObservable(valueAccessor());
      var filterGoogleMarkers = [];

      ko.utils.arrayFilter(viewModel.googleMarkers(), function(googleMarker){
          ko.utils.arrayForEach(filteredMarkers, function(filterMarker){
            if(filterMarker.id === googleMarker.id) {
              filterGoogleMarkers.push(googleMarker);
            }
          });
          /* setting all googleMarkers to null initially, Then iterating over
          * the filterGoogleMarkers to set them back to map.
          */
          googleMarker.setMap(null);
      });

      filterGoogleMarkers.forEach(function (googleMarker) {
        googleMarker.setMap(googleMap);
      });
    }
};
