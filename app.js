var server = require('express-scaffold');
var pkg = require('./package');
var models = require('./models');
var ctrlers = require('./ctrlers');
var routes = require('./routes');

new server(pkg)
    .models(models)
    .ctrlers(ctrlers)
    .routes(routes)
    .run();