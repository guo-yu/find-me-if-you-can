module.exports = function(app, express, debug) {
  
  var log = debug('game');
  var route = express.Router();
  
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