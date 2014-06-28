var pkg = require('../package');
var ctrlers = require('../ctrlers');
var home = require('./home');
var game = require('./game');
var upload = require('./upload');
var register = require('./register');

module.exports = routes;

function routes(app, express, debug, models, ctrlers) {

  app.locals.sys = pkg;

  var deps = {};
  deps.app = app;
  deps.debug = debug;
  deps.express = express;
  deps.ctrlers = ctrlers;
  deps.models = models;

  // home route
  app.get('/', home);
  // sign up
  app.use('/register', register(deps));
  // upload
  app.use('/upload', upload(deps));
  // the game
  app.use('/game', game(deps));
  // vertify yourself, todo
  // app.post('/vertify', vertify);

}
