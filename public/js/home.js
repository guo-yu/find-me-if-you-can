'use strict';  

$(document).ready(function(){
  
  var statusButton = $('#status-botton');
  var statusIcon = statusButton.find('i.fa');
  var statusText = statusButton.find('span.desc');

  initCamera('/register', function(err, result){
    // ui changes
    statusButton.addClass('upload-success');
    statusText.text('识别成功，正在获取任务...');
    statusIcon.removeClass()
      .addClass('fa fa-check');
    statusIcon.addClass('bounce animated');
    // fetch tasks
    fetchTask();
  });
});