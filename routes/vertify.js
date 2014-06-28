module.exports = function(req, res, next) {
  var nickname = req.body.nickname;
  if (!nickname) nickname = 'someguy';
  var avatar = req.body.avatar;
  req.session.user = {
    nickname: nickname,
    avatar: avatar
  };
  res.redirect('/game');
}