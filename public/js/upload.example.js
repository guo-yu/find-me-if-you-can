// grab from tuchong.com
if (support.multiple && typeof FormData !== 'undefined' && xhr.upload !== undefined && !isBrokenBrowser()){
  var queueEl = $('.uploadifyQueue');
  queueEl.delegate('.uploadifyQueueItem .cancel', 'click', function(){
    $(this).closest('.uploadifyQueueItem').remove();
  });
  el.change(function(){
    var params = {
      'user_id':visitor.id
    };
    
    function uploadOneFile(el){
      var file = el.data('file'),
        fd = new FormData();
      
      for(var key in params)
        fd.append(key, params[key]);
          fd.append( 'photoupload', file );
          
          function uploadNext(){
            if (el.next()[0])
          uploadOneFile(el.next());
        }

          var xhr = new XMLHttpRequest(),
            events = {
              'error' : function(pe){alert('连接不到服务器，请检查你的网络连接')},
              'load'  : function(pe){
              var s = pe.target.status;
              if (s >= 200 && s < 300 || s == 304){
                uploadController.onUploadSuccess(this.responseText);
                
                uploadNext();
                el.remove();
              }
              else{
                var dict = {
                  413:'文件尺寸过大',
                  500:'服务器内部错误，请通知管理员',
                  502:'服务器网关错误，请通知管理员'
                };
                alert(dict[s] || pe.target.statusText);
              }
            }
            //'abort','loadstart','loadend','progress','timeout'
            };
      
      for (var event in events)
        xhr.addEventListener(event, events[event], false);
          
      xhr.upload.addEventListener('progress', function(pe){
        if(pe.lengthComputable){
          var percentage = Math.round(pe.loaded / pe.total * 100);
          el.find('.data').html(percentage + '%');
          el.find('.uploadifyProgressBar').css('width', percentage + '%');
        }
      });
      
      el.find('.cancel').click(function(){
        xhr.abort();
        uploadNext();
        el.remove();
        return false;
      });
      
      xhr.open('POST', '/api/upload/image/', true);
      xhr.setRequestHeader("Cache-Control", "no-cache");
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      //设置了这句话之后表单中的其他信息无法正常提交
      //http://stackoverflow.com/questions/18590630/xmlhttprequest-multipart-form-data-invalid-boundary-in-multipart
      //xhr.setRequestHeader("Content-Type", 'multipart/form-data');
      xhr.send(fd);
      
      el.addClass('uploading');
    }
    
    $.each(this.files, function(){
      if (this.type && $.inArray(this.type, ['image/jpeg']) === -1){  //  IE11无法获取this.type值，暂时忽略掉
        alert(this.name + '的格式是' + this.type + '，只支持上传JPG格式图片');
        return;
      }
      if (this.size > 20 * 1024 * 1024){
        alert(this.name + '的大小是' + formatUnit(this.size) + '，最大支持上传20MB图片');
        return;
      }
      var context = {
        fileName:this.name,
        fileSize:formatUnit(this.size)
      };
      $(templates['image-uploading-item'](context)).appendTo(queueEl).data('file', this);
    });
    
    if (queueEl.find('.uploadifyQueueItem')[0] && !queueEl.find('.uploading')[0]){
      uploadOneFile($(queueEl.find('.uploadifyQueueItem')[0]));
      uploadController.onUploadStart();
    }
    uploadController.checkMultiPhotos();
    
    this.value = '';
  });
}
