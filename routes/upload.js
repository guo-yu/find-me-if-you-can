var fs = require('fs');
var FacePlusPlus = require('faceplusplus');
var fppClient = new FacePlusPlus(require('../config/faceplusplus'));

module.exports = function(deps) {
  
  var log = deps.debug('upload');
  var route = deps.express.Router();
  var photoCtrler = deps.ctrlers.photo;

  // upload my avatar or pictures
  route.post('/', function(req, res, next) {
    var picture = req.files.picture;
    if (!picture)
      return next(new Error(403));
    
    var data = {
      group_id : {
        value : '0bf546544b9dee83bb5706550ada4f59'
      },
      img : {
        value:fs.readFileSync(picture.path), 
        meta:{filename:picture.originalname}
      }
    };
    
    fppClient.postMulti('recognition/identify', data, function(err, response, body){
      if (err)
        return next(err);
      
      if (body.error)
        return next(new Error(body.error));
      
      if (!body.face || !body.face[0]){
        return res.json({
          status : 'error',
          message : '没有检测到照片中的人脸'
        });
      }
      
      console.log(body);
      var myselfInPhoto = false;
      var subjectInPhoto = false;
      
      body.face.forEach(function(faceInfo){
        if (faceInfo.candidate[0].person_id === req.session.user._id){
          myselfInPhoto = true;
          return;
        }
        if (faceInfo.candidate[0].person_id === req.body.subject_id){
          subjectInPhoto = true;
          return;
        }
      });
      
      if (!myselfInPhoto)
        return res.json({
          status : 'error',
          message : '照片里没有你自己'
        });
      
      if (!subjectInPhoto)
        return res.json({
          status : 'error',
          message : '照片里没有目标对象'
        });
      
      photoCtrler.create({
        name : picture.name,
        img_id : body.img_id,
        creator : req.session.user._id,
        subject : req.body.subject_id,
        longitude : req.body.longitude,
        latitude : req.body.latitude
      }, function(err, photo){
        if (err)
          return next(err);
        
        res.json({
          status : 'ok',
          photo : photo
        });
      });
    });
  });

  return route;
};
