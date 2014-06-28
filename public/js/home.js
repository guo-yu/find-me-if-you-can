'use strict';

(function() {

  // doms
  var camera = document.querySelector("#camera");
  var screenshot = document.querySelector("#avatar");
  var uploadForm = document.forms.namedItem('uploadForm');

  var statusButton = $('#status-botton');
  var statusIcon = statusButton.find('i.fa');
  var statusText = statusButton.find('span.desc');
  var avatar = $('#avatar');

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
      return showScreenshot();
    } catch (err) {
      try {
        // Fallback if createObjectURL is not supported
        var fileReader = new FileReader();
        fileReader.onload = function(event) {
          // fill image src
          screenshot.src = event.target.result;
          return showScreenshot();
        };
        fileReader.readAsDataURL(file);
      } catch (e) {
        var error = document.querySelector("#error");
        if (error) error.innerHTML = "do not supported show screenshot";
      }
    }
  };

  function showScreenshot() {
    avatar.animate({
      'opacity': 1
    }, 600);
    return submitImage();
  }

  function submitImage() {
    var data = new FormData(uploadForm);
    var req = new XMLHttpRequest();
    var nanobar = new Nanobar();
    
    req.open('POST', '/register', true);

    req.addEventListener('error', function() {
      alert('上传失败了...稍后再试试吧');
    }, false);

    req.addEventListener('load', function(result) {
      var statusCode = result.target.status;
      if (statusCode !== 200) return alert('上传失败了...稍后再试试吧');
      try {
        var data = JSON.parse(this.responseText);
        if (data.status !== 'ok') {
          statusButton.addClass('upload-fail')
          statusText.text(data.message);
          statusIcon
            .removeClass('fa-camera')
            .removeClass('fa-spin')
            .addClass('fa-frown-o');
          statusIcon
            .removeClass('animated')
            .addClass('shake animated');
          return false;
        }
        // final success !
        nextStage(data.user);
      } catch (err) {
        console.error(err);
        alert('JSON parse error');
      }
    }, false);

    // the process monitor
    req.upload.addEventListener('progress', function(pe) {
      if (pe.lengthComputable) {
        var percentage = Math.round(pe.loaded / pe.total * 100);
        nanobar.go(percentage);
      }
    });

    // send data to server 
    req.send(data);

    // ui changes
    statusText.text('正在上传识别...');
    statusIcon.removeClass()
      .addClass('fa fa-spinner fa-spin');
  }

  // go to next stage
  function nextStage(user) {
    // ui changes
    statusButton.addClass('upload-success');
    statusText.text('识别成功，开始任务');
    statusIcon.removeClass()
      .addClass('fa fa-check');
    statusIcon.addClass('bounce animated');
    // fetch tasks
    fetchTask(function(task){
      console.log(task);
    });
  }

})();