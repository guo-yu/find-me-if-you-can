function fetchTask(callback) {
  $.get('/task', function(data) {
    if (data.status !== 'ok') {
      console.error(data.message);
      return false;
    }
    console.log(data);
    var target = data.user.avatar;
    $('#single-task').prepend([
      '<img class="single-task-thumb" id="avatar" src="',
      '/uploads/' + target,
      '" alt="" />'
    ].join(''));
    if (callback && typeof(callback) === 'function') {
      return callback(data);
    }
    return;
  });
}