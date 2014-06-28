function fetchTask(callback) {
  $.get('/task', function(data) {
    if (data.status !== 'ok') {
      console.error(data.message);
      return false;
    }
    console.log(data);
    var target = data.photos && data.photos.length > 0 ? 
                 data.photos[0] :
                 data.user.avatar;
    $('#single-task').append([
      '<img class="single-task-thumb" src="',
      '/uploads/' + target,
      '" alt="" />'
    ].join(''));
    if (callback && typeof(callback) === 'function') {
      return callback(data);
    }
    return;
  });
}