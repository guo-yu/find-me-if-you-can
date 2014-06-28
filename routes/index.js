var pkg = require('../package');
var ctrlers = require('../ctrlers');
var home = require('./home');
var game = require('./game');
var upload = require('./upload');
var vertify = require('./vertify');

module.exports = routes;

function routes(app, express, debug) {

  app.locals.sys = pkg;

  // home route
  app.get('/', home);
  // upload
  app.use('/upload', upload(app, express, debug, ctrlers));
  // the game
  app.use('/game', game(app, express, debug, ctrlers));
  // vertify yourself, todo
  // app.post('/vertify', vertify);

}
