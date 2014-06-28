module.exports = function(app, express, debug, ctrlers) {
  
  var log = debug('upload');
  var route = express.Router();

  // upload my avatar or pictures
  route.post('/', function(req, res, next) {
    var imageFile = req.files.image;
    
    var data = {
      img : {
        value:fs.readFileSync(imageFile.path), 
        meta:{filename:imageFile.originalname}
      }
    };
    client.postMulti('detection/detect', data, function(err, response, body){
      
    });

    
    res.send('ok');
  });

  return route;
};
