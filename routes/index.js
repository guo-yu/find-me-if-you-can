var pkg = require('../package');
var ctrlers = require('../ctrlers');
var home = require('./home');
var game = require('./game');
var upload = require('./upload');
var register = require('./register');
var task = require('./task');
var group = require('./group');

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
  // API: register newbie, uploading avatars
  app.use('/register', register(deps));
  // API: upload pictures
  app.use('/upload', upload(deps));
  // API: fetch task
  app.use('/task', task(deps));
  // API: todo
  app.use('/group', group(deps));
  
}
