$(document).ready(function() {
  // when task fetched done
  fetchTask(function(task) {
    initCamera('/upload', function(result) {
      // when uploaded
      var statusButton = $('#status-botton');
      var statusIcon = statusButton.find('i.fa');
      var statusText = statusButton.find('span.desc');
      console.log(result);
      statusButton.addClass('upload-success');
      statusText.text('恭喜哦！你找对人啦');
      statusIcon.removeClass()
        .addClass('fa fa-check');
      statusIcon.addClass('bounce animated');
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