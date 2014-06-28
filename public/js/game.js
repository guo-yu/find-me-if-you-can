$(document).ready(function() {
  // when task fetched done
  fetchTask(function(task) {
    initCamera(function(result) {
      // when uploaded
      console.log(result);
    }, {
      // get location when uploading images
      onUploading: function() {
        getLocation(function(err, position) {
          if (!err && position) {
            document.getElementsByName('latitude')[0].value = position.latitude;
            document.getElementsByName('longitude')[0].value = position.longitude;
          }
        });    
      }
    }); 
  });
});