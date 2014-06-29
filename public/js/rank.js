var dom = $('#ranks');

function ranking(callback) {
  $.get('/ranking', function(rank){
    console.log(rank);
    callback(rank);
  });
}

ranking(function(rank){
  if (!rank || rank.status !== 'ok' || rank.users.length === 0) {
    // no ranks
    dom.append('还没有任何排名数据');
    return;
  };
  
  var html = '';
  $.each(rank.users, function(index, r){
    var pubdate = new Date(r.created.toString());
    console.log(pubdate);
    var str = [
      '<div class="single-rank clearfix">',
        '<img src="/uploads/' + r.avatar + '" alt="" class="rank-avatar" />',
        '<p class="nickname">',
          r.nickname,
          '<span class="pubdate">',
            pubdate.getFullYear() + '年' + (pubdate.getMonth() + 1) + '月' + pubdate.getDate() + '日',
          '</span>',
        '</p>',
        '<p class="credits">',
          r.credits,
        '</p>',
      '</div>'
    ].join('');
    html += str;
  });

  dom.html(html);

})