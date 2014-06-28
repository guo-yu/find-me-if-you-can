var FacePlusPlus = require('faceplusplus');
var fppClient = new FacePlusPlus(require('../config/faceplusplus'));

module.exports = function(deps) {

  var log = deps.debug('group');
  var route = deps.express.Router();
  var groupCtrler = deps.ctrlers.group;
  
  route.post('/create', function(req, res, next) {
    fppClient.get('group/create', {group_name : req.body.name}, function(err, response, body){
      
    });
  });
  
  return route;
};