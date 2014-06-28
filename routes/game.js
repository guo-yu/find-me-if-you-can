module.exports = function(req, res, next) {
  if (!req.session.user) return res.redirect('/');
  // fetch a ramdom avatar and return 
  res.render('game', {
    target: ''
  });
}