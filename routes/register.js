var fs = require('fs');
var FacePlusPlus = require('faceplusplus');
var fppClient = new FacePlusPlus(require('../config/faceplusplus'));

module.exports = function(deps) {

  var log = deps.debug('register');
  var route = deps.express.Router();
  var userCtrler = deps.ctrlers.user;

  // upload my avatar or pictures
  route.post('/', function(req, res, next) {

    fppClient.post('person/create', {}, function(err, response, body) {
      if (err) return next(err);
      if (body.error) return next(new Error(body.error));

      var avatarFile = req.files.avatar;
      if (!avatarFile)
        return next(new Error(400));
      
      userCtrler.create({
        _id : body.person_id,
        nickname : '随机用户名',
        avatar : avatarFile.name
      }, function(err, user) {
        if (err) return next(err);
        
        req.session.user = user;

        var data = {
          img: {
            value: fs.readFileSync(avatarFile.path),
            meta: {
              filename: avatarFile.originalname
            }
          }
        };

        fppClient.postMulti('detection/detect', data, function(err, response, body) {
          
          if (!body.face || !body.face[0]){
            return res.json({
              status: 'error',
              message : '没有检测到照片中的人脸'
            });
          }
          
          user.face_id = body.face[0].face_id;
          user.save();
          
          fppClient.post('person/add_face', {
            person_id: user._id,
            face_id: body.face[0].face_id
          }, callback1);
          
          function callback1(err, response, body) {
            // ignore err
            if (err) return;
            
            fppClient.post('group/add_person', {
              group_id : '0bf546544b9dee83bb5706550ada4f59',
              person_id : user._id
            }, callback2);
            
            fppClient.post('train/verify', {
              person_id : user._id
            }, function (err, response, body){});
          }
          
          function callback2(err, response, body) {
            // ignore err
            if (err) return;
            
            fppClient.post('train/identify', {
              group_id : '0bf546544b9dee83bb5706550ada4f59',
            }, function(err, response, body){});
          }
          
          res.json({
            status: 'ok',
            user: user
          });
        });
      });
    });
  });

  return route;
};