'use strict';

(function() {
  var camera = document.querySelector("#camera");
  var screenshot = document.querySelector("#avatar");
  var uploadForm = document.forms.namedItem('uploadForm');
  var nanobar = new Nanobar({
    bg: '#444'
  });

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
      return submitForm();
    } catch (err) {
      try {
        // Fallback if createObjectURL is not supported
        var fileReader = new FileReader();
        fileReader.onload = function(event) {
          screenshot.src = event.target.result;
          screenshot.style.display = 'block';
          return submitForm();
        };
        fileReader.readAsDataURL(file);
      } catch (e) {
        var error = document.querySelector("#error");
        if (error) error.innerHTML = "do not supported show screenshot";
      }
    }
  };

  getLocation(function(err, position) {
    if (!err && position) {
      document.getElementsByName('latitude')[0].value = position.latitude;
      document.getElementsByName('longitude')[0].value = position.longitude;
    }
  });

  function submitForm() {
    var data = new FormData(uploadForm);
    var req = new XMLHttpRequest();
    
    req.open('POST', '/register', true);
    req.addEventListener('error', function() {
      alert('上传失败了...稍后再试试吧');
    }, false);
    
    req.addEventListener('load', function(result) {
      var statusCode = result.target.status;
      if (statusCode !== 200) return alert('上传失败了...稍后再试试吧');
      try {
        var data = JSON.parse(this.responseText);
        if (data.status !== 'ok') return alert(data.message);
        // final success !
        
      } catch (err) {
        console.error(err);
        alert('JSON parse error');
      }
    }, false);

    req.send(data);
    // the process monitor
    req.upload.addEventListener('progress', function(pe){
      if(pe.lengthComputable){
        var percentage = Math.round(pe.loaded / pe.total * 100);
        nanobar.go(percentage);
      }
    });
  }

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