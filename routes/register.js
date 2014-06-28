var fs = require('fs');
var FacePlusPlus = require('faceplusplus');
var fppClient = new FacePlusPlus(require('../config/faceplusplus'));

module.exports = function(deps) {

  var log = deps.debug('register');
  var route = deps.express.Router();
  var userCtrler = deps.ctrlers.user;

  // upload my avatar or pictures
  route.post('/', function(req, res, next) {
    var avatarFile = req.files.avatar;
    if (!avatarFile)
      return next(new Error(400));
    
    var data = {
        img: {
          value: fs.readFileSync(avatarFile.path),
          meta: {
            filename: avatarFile.originalname
          }
        }
      };

    fppClient.postMulti('detection/detect', data, function(err, response, body) {
      if (err)
        return next(err);
      if (!body.face || !body.face[0]){
        return res.json({
          status: 'error',
          message : '没有检测到照片中的人脸'
        });
      }
      
      fppClient.post('recognition/identify',
          {group_id : '0bf546544b9dee83bb5706550ada4f59', key_face_id : body.face[0].face_id},
          function(err, response, body){
            if (err) return next(err);
            if (body.error) return next(new Error(body.error));
            
            if (body.face[0] && body.face[0].candidate && body.face[0].candidate[0] && body.face[0].candidate[0].confidence > 50){
              var person_id = body.face[0].candidate[0].person_id;
              fppClient.post('person/add_face', {
                person_id: person_id,
                face_id: body.face[0].face_id
              }, function (err, response, body){
                if (err) return next(err);
              });
              
              userCtrler.model.findById(person_id)
                .exec(function(err, user){
                  if (err) return next(err);
                  req.session.user = user;
                  
                  res.json({
                    status: 'ok',
                    user: user
                  });
                });
            }
            else{
              fppClient.post('person/create', {}, createUser);
            }
          });
    });
    function createUser(err, response, body) {
      if (err) return next(err);
      if (body.error) return next(new Error(body.error));

      userCtrler.create({
        _id : body.person_id,
        nickname : '随机用户名',
        avatar : avatarFile.name
      }, function(err, user) {
        if (err) return next(err);
        
        fppClient.post('group/add_person', {
          group_id : '0bf546544b9dee83bb5706550ada4f59',
          person_id : body.person_id
        }, function (err, response, body){
          if (err) return next(err);
        });
        
        req.session.user = user;

        //user.face_id = body.face[0].face_id;
        //user.save();
        
        fppClient.post('person/add_face', {
          person_id: user._id,
          face_id: body.face[0].face_id
        }, function (err, response, body) {
          // ignore err
          if (err) return;
          
          fppClient.post('train/verify', {
            person_id : user._id
          }, function (err, response, body){});
          
          fppClient.post('train/identify', {
            group_id : '0bf546544b9dee83bb5706550ada4f59',
          }, function(err, response, body){});
        });
        
        res.json({
          status: 'ok',
          user: user
        });
      });
    } //  end of createUser()
  });

  return route;
};