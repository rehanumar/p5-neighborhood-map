ko.bindingHandlers.map = {
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
