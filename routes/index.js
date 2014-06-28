var pkg = require('../package');
var ctrlers = require('../ctrlers');
var home = require('./home');
var game = require('./game');
var upload = require('./upload');
var register = require('./register');
var task = require('./task');
var group = require('./group');
var login = require('./login');

module.exports = routes;

function routes(app, express, middlewares, models, ctrlers, debug) {

  app.locals.sys = pkg;

  var deps = {};
  deps.app = app;
  deps.debug = debug;
  deps.express = express;
  deps.ctrlers = ctrlers;
  deps.models = models;

  app.use('*', middlewares.passport.sign());

  // home route
  app.get('/', home);
  // API: register newbie, uploading avatars
  app.use('/register', register(deps));
  app.use('/login', login(deps));
  app.get('/signout', middlewares.passport.signout);
  // API: upload pictures
  app.use('/upload', upload(deps));
  // API: fetch task
  app.use('/task', task(deps));
  // API: todo
  app.use('/group', group(deps));
  
}
