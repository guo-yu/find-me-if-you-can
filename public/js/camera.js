'use strict';

(function() {
  var camera = document.querySelector("#camera");
  var screenshot = document.querySelector("#avatar");
  var uploadForm = document.getElementById('uploadForm');

  camera.onchange = function(event) {
    var files = event.target.files;
    if (!files) return false;
    if (files.length === 0) return false;
    var file = files[0];
    // console.log(file);
    try {
      // Get window.URL object
      var URL = window.URL || window.webkitURL;
      // Create ObjectURL
      var imgURL = URL.createObjectURL(file);
      // Set img src to ObjectURL
      screenshot.src = imgURL;
      // Revoke ObjectURL
      URL.revokeObjectURL(imgURL);
      screenshot.style.display = 'block';
      return upload();
    } catch (err) {
      try {
        // Fallback if createObjectURL is not supported
        var fileReader = new FileReader();
        fileReader.onload = function(event) {
          screenshot.src = event.target.result;
          screenshot.style.display = 'block';
          return upload();
        };
        fileReader.readAsDataURL(file);
      } catch (e) {
        var error = document.querySelector("#error");
        if (error) error.innerHTML = "do not supported show screenshot";
      }
    }
  };

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

  function upload() {
    if (!uploadForm.length) return false;
    getLocation(function(err, position){
      if (!err) {
        document.getElementByName('latitude').value = position.latitude;
        document.getElementByName('longitude').value = position.longitude;
      }
      setTimeout(function() {
        // uploadForm.submit();
      }, 3000);      
    });
  }

})();