var server = require('express-scaffold');
var pkg = require('./package');
var routes = require('./routes');

new server(pkg).routes(routes).run();