module.exports = function(deps) {
  
  var log = deps.debug('user');
  var route = deps.express.Router();
  var userCtrler = deps.ctrlers.user;

  // upload my avatar or pictures
  route.get('/', function(req, res, next) {
    userCtrler.find({})
      .sort('-credits')
      .exec(function(err, users){
        if (err)
          return next(err);
        
        res.json({
          status : 'ok',
          users : users
        });
      });
  });

  return route;
};
