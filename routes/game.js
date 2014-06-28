module.exports = function(deps) {
  
  var log = deps.debug('game');
  var route = deps.express.Router();
  
  route.get('/', function(req, res, next) {
    log(req.session.user);
    if (!req.session.user) return res.redirect('/');
    // fetch a ramdom avatar and return 
    res.render('game', {
      target: ''
    });
  });

  return route;

}