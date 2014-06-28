var models = {};
models.user = require('./user');
models.photo = require('./photo');
models.group = require('./group');

// define modles
module.exports = function(db, Schema) {
  var schemas = {};
  Object.keys(models).forEach(function(model){
    schemas[model] = db.model(model, models[model](Schema));
  });
  return schemas;
}