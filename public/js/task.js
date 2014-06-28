function fetchTask(callback) {
  $.get('/task', function(data) {
    console.log(data);
    if (data.status !== 'ok') {
      console.error(data.message);
      return false;
    }
    return callback(data);
  });
}