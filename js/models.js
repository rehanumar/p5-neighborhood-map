var markersModel = [
  {
  name: 'Mountain View, US',
  pos: {lat: 37.388267, lng: -122.083330},
  isVisible: ko.observable(true)
  },
  {
  name: 'Sydney, Australlia',
  pos: {lat: -33.893547, lng: 151.200677},
  isVisible: ko.observable(true)
  },
  {
  name: 'New York, US',
  pos: {lat: 40.675511, lng: -73.955104},
  isVisible: ko.observable(true)
  },
  {
    name: 'Dubai, UAE',
    pos: {lat: 25.116212, lng: 55.136111},
    isVisible: ko.observable(true)
  },
  {
    name: 'Shanghai, China',
    pos: {lat: 31.205595, lng: 121.464463},
    isVisible: ko.observable(true)
  },
  {
    name: 'Beijing, China',
    pos: {lat: 39.895006, lng: 116.383914},
    isVisible: ko.observable(true)
  },
  {
    name: 'Hong Kong, China',
    pos: {lat: 39.894419, lng: 116.384741},
    isVisible: ko.observable(true)
  },
  {
    name: 'Moscow, Russia',
    pos: {lat: 55.752270, lng: 37.583409},
    isVisible: ko.observable(true)
  },
  {
    name: 'Tianjin, China',
    pos: {lat: 39.352491, lng: 117.347543},
    isVisible: ko.observable(true)
  },
  {
    name: 'Guangzhou, China',
    pos: {lat: 23.206339, lng: 113.244507},
    isVisible: ko.observable(true)
  },
  {
    name: 'Mumbai, India',
    pos: {lat: 19.065867, lng: 72.859159},
    isVisible: ko.observable(true)
  },
  {
    name: 'Islamabad, Pakistan',
    pos: {lat: 33.731483, lng: 73.087832},
    isVisible: ko.observable(true)
  },
  {
    name: 'Lahore, Pakistan',
    pos: {lat: 31.592513, lng: 74.309570},
    isVisible: ko.observable(true)
  }
];

var googleMarkersModel = [];

function weatherModel(latitude, longitude) {
  $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather",
    type:'get',
    crossDomain: true,
    data: { lat: latitude, lon: longitude, APPID:"278fff1002fef1f3de7085c4a4bb4e14"},
    dataType : "json",
    success: function (response) {
      try {
          weatherViewModel.temp(response.main.temp);
          weatherViewModel.humidity(response.main.humidity);
          weatherViewModel.description(response.weather[0].description);
      } catch(err) {
          console.log('json structure changed for this api!');
      }
    },
    error: function (err) {
        console.log(err);
    }
  })
}
