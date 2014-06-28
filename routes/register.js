var fs = require('fs');
var FacePlusPlus = require('faceplusplus');
var fppClient = new FacePlusPlus(require('../config/faceplusplus'));

module.exports = function(deps) {
  
  var log = deps.debug('register');
  var route = deps.express.Router();
  var userCtrler = deps.ctrlers.user;
  
  // upload my avatar or pictures
  route.post('/', function(req, res, next) {

    log(req.body);
    log(req.files.avatar);
    log(fppClient);

    fppClient.post('person/create', {person_name : '用户名'}, function(err, response, body){
      if (err) return next(err);
      if (body.error) return next(body.error);

      log(body);
      
      userCtrler.create({
          _id: body.person_id,
          name : '随机用户名'
        }, function(err, user){
        if (err) return next(err);

        log(user);
        
        var avatarFile = req.files.avatar;
        
        var data = {
          img : {
            value:fs.readFileSync(avatarFile.path), 
            meta:{filename:avatarFile.originalname}
          }
        };
        fppClient.postMulti('detection/detect', data, function(err, response, body){
          
          user.face_id = body.face[0].face_id;
          user.save();
          
          fppClient.postMulti('person/add_face', { person_id : user._id, face_id : body.face[0].face_id}, function(err, response, body){
            // ignore err
            if (err) return;
            
          });
          
        });
        
        res.send('ok');
      });
    });
  });

  return route;
};
