var pkg = require('../package');
var ctrlers = require('../ctrlers');
var home = require('./home');
var game = require('./game');
var upload = require('./upload');
var register = require('./register');

module.exports = routes;

function routes(app, express, debug) {

  app.locals.sys = pkg;

  // home route
  app.get('/', home);
  // sign up
  app.use('/register', register);
  // upload
  app.use('/upload', upload(app, express, debug, ctrlers));
  // the game
  app.use('/game', game(app, express, debug, ctrlers));
  // vertify yourself, todo
  // app.post('/vertify', vertify);

}
