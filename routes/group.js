var FacePlusPlus = require('faceplusplus');
var fppClient = new FacePlusPlus(require('../config/faceplusplus'));

module.exports = function(deps) {

  var log = deps.debug('group');
  var route = deps.express.Router();
  var groupCtrler = deps.ctrlers.group;
  
  route.get('/', function(req, res, next) {
    fppClient.get('group/create', {group_name : 'SegmentFault黑客马拉松'}, function(err, response, body){
      
    });
  });
  
  return route;
};