module.exports = function(deps) {
  var log = deps.debug('register');
  var ctrlers = deps.ctrlers;
  var route = deps.express.Router();

  // upload my avatar or pictures
  route.get('/', function(req, res, next) {
    if (!req.session.user)
      return next(401);
    
    ctrlers.photo.model.find({ persons : req.session.user._id})
      .exec(callback1);
    
    function callback1(err, photos){
      var alreadyTokenPersons = [];
      photos.forEach(function(photo){
        alreadyTokenPersons.push(photo.subject);
      });
      
      //req.session.user.gender;
      ctrlers.user.model.find({_id : {$nin : alreadyTokenPersons}}, callback2);
    }
    
    var response = { status : 'ok'};
    function callback2(err, users){
      response.user = users[Math.floor(Math.random() * users.length)];
      
      ctrlers.photo.model.find({subject : response.user._id})
        .exec(callback3);
    }
    
    function callback3(err, photos){
      response.photos = photos;
      
      res.json(response);
    }
  });

  return route;
};
