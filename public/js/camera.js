var camera = document.querySelector("#camera");
var screenshot = document.querySelector("#avatar");

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
  } catch (err) {
    try {
      // Fallback if createObjectURL is not supported
      var fileReader = new FileReader();
      fileReader.onload = function(event) {
        screenshot.src = event.target.result;
        screenshot.style.display = 'block';
      };
      fileReader.readAsDataURL(file);
    } catch (e) {
      var error = document.querySelector("#error");
      if (error) error.innerHTML = "do not supported show screenshot";
    }
  }
}