var pkg = require('../package');
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
  app.use('/upload', upload(app, express, debug));
  // the game
  app.use('/game', game(app, express, debug));
  // vertify yourself, todo
  // app.post('/vertify', vertify);

}