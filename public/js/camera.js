'use strict';

(function() {
  var camera = document.querySelector("#camera");
  var screenshot = document.querySelector("#avatar");
  var uploadForm = document.forms.namedItem('uploadForm');

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
      return uploadForm.submit();
    } catch (err) {
      try {
        // Fallback if createObjectURL is not supported
        var fileReader = new FileReader();
        fileReader.onload = function(event) {
          screenshot.src = event.target.result;
          screenshot.style.display = 'block';
          return uploadForm.submit();
        };
        fileReader.readAsDataURL(file);
      } catch (e) {
        var error = document.querySelector("#error");
        if (error) error.innerHTML = "do not supported show screenshot";
      }
    }
  };

  uploadForm.addEventListener('submit', function(ev){
    var data = new FormData(uploadForm);
    var req = new XMLHttpRequest();
    req.open('POST', 'register', true);
    req.onLoad = function(event) {
      console.log(req.status);
      if (req.status === 200) {
        alert('上传成功!');
      } else {
        alert('上传失败');
      }
    }

    req.send(data);
    ev.preventDefault();
  }, false);

  getLocation(function(err, position) {
    if (!err && position) {
      document.getElementsByName('latitude').value = position.latitude;
      document.getElementsByName('longitude').value = position.longitude;
    }
  });

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

})();