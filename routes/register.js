var FacePlusPlus = require('faceplusplus');
var fppClient = new FacePlusPlus(require('../config/faceplusplus.json'));

module.exports = function(app, express, debug, ctrlers) {
  
  var log = debug('register');
  var route = express.Router();
  
  // upload my avatar or pictures
  route.post('/', function(req, res, next) {
    fppClient.post('person/create', {person_name : '用户名'}, function(err, response, body){
      if (err){
        next(err);
      }
      
      ctrlers.user.create({
          _id: body.person_id,
          name : '随机用户名'
        }, function(err, user){
        if (err){
          next(err);
        }
        
        var imageFile = req.files.image;
        
        var data = {
          img : {
            value:fs.readFileSync(imageFile.path), 
            meta:{filename:imageFile.originalname}
          }
        };
        client.postMulti('detection/detect', data, function(err, response, body){
          
          user.face_id = body.face[0].face_id;
          user.save();
        });
        
        res.send('ok');
      });
    });
  });

  return route;
};
