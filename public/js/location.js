'use strict';

function getLocation(callback) {
  if (!navigator) return;
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

  function successCallback(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log(latitude)
    console.log(longitude);
    return callback(null, position.coords);
  }

  function errorCallback(err) {
    console.error(err);
    return callback(err);
  }
}

// getLocation(function(err, position) {
//   if (!err && position) {
//     document.getElementsByName('latitude')[0].value = position.latitude;
//     document.getElementsByName('longitude')[0].value = position.longitude;
//   }
// });