var models = {};
models.user = require('./user');

// define modles
module.exports = function(db, Schema) {
  var schemas = {};
  Object.keys(models).forEach(function(model){
    schemas[model] = db.model(model, models[model](Schema));
  });
  return schemas;
}