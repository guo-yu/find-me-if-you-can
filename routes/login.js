var fs = require('fs');
var FacePlusPlus = require('faceplusplus');
var fppClient = new FacePlusPlus(require('../config/faceplusplus'));

module.exports = function(deps) {

  var log = deps.debug('login');
  var route = deps.express.Router();
  var userCtrler = deps.ctrlers.user;

  route.post('/', function(req, res, next) {
    userCtrler.model.findOneById('c5670ac35e4976adc30f9d4530f1a990')
      .exec(function(err, user){
        if (err)
          return next(err);
        
        if (!user)
          return next(new Error(404));
        
        req.session.user = user;
        
        res.json({
          status : 'ok'
        });
      });
  });

  return route;
};