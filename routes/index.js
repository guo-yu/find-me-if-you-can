var pkg = require('../package');
var home = require('./home');
var game = require('./game');
var vertify = require('./vertify');

module.exports = routes;

function routes(app, express, debug) {

  app.locals.sys = pkg;

  // home route
  app.get('/', home);
  // the game
  app.get('/game', game);
  // vertify yourself
  app.post('/vertify', vertify);

}