module.exports = function(req, res, next) {
  // if (req.session.user) return res.redirect('/game');
  return res.render('home');
}