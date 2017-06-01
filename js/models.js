var markersModel = [
  {
    id: 1,
    name: 'Mountain View, US',
    pos: {lat: 37.388267, lng: -122.083330}
  },
  {
    id: 2,
    name: 'Sydney, Australlia',
    pos: {lat: -33.893547, lng: 151.200677}
  },
  {
    id: 3,
    name: 'New York, US',
    pos: {lat: 40.675511, lng: -73.955104}
  },
  {
    id: 4,
    name: 'Dubai, UAE',
    pos: {lat: 25.116212, lng: 55.136111}
  },
  {
    id: 5,
    name: 'Shanghai, China',
    pos: {lat: 31.205595, lng: 121.464463}
  },
  {
    id: 6,
    name: 'Beijing, China',
    pos: {lat: 39.895006, lng: 116.383914}
  },
  {
    id: 7,
    name: 'Hong Kong, China',
    pos: {lat: 39.894419, lng: 116.384741}
  },
  {
    id: 8,
    name: 'Moscow, Russia',
    pos: {lat: 55.752270, lng: 37.583409}
  },
  {
    id: 9,
    name: 'Tianjin, China',
    pos: {lat: 39.352491, lng: 117.347543}
  },
  {
    id: 10,
    name: 'Guangzhou, China',
    pos: {lat: 23.206339, lng: 113.244507}
  },
  {
    id: 11,
    name: 'Mumbai, India',
    pos: {lat: 19.065867, lng: 72.859159}
  },
  {
    id: 12,
    name: 'Islamabad, Pakistan',
    pos: {lat: 33.731483, lng: 73.087832}
  },
  {
    id: 13,
    name: 'Lahore, Pakistan',
    pos: {lat: 31.592513, lng: 74.309570}
  }
];

// google map models whose data is dynamically added through initMap function.
var googleMarkersModel = [];
var googleMap = {};
var infoWindow = {};

function weatherModel(latitude, longitude, location) {
  $.ajax({
    url: 'https://api.apixu.com/v1/forecast.json',
    type: 'get',
    crossDomain: true,
    data: {key: 'ee37d13861e240fab5095937171905', q: latitude, longitude},
    dataType: 'json',
    success: function (response) {
      try {
          weatherViewModel.location(location);
          weatherViewModel.temp(response.current.temp_c + ' \u2103');
          weatherViewModel.humidity(response.current.humidity);
          weatherViewModel.description(response.current.condition.text);
          weatherViewModel.url(response.current.condition.icon);
      } catch(err) {
          alert('json structure changed for this api!');
      }
    },
    error: function (err) {
        alert('loading weather data failed! refresh the page to resolve it! if the problem persists then report it at rehanumardogar[at]gmail.com');
        console.log(err);
    }
  });
}
