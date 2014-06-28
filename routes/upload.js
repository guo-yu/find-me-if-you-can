module.exports = function(deps) {
  
  var log = deps.debug('upload');
  var route = deps.express.Router();

  // upload my avatar or pictures
  route.post('/', function(req, res, next) {
    var picture = req.files.picture;
    if (!picture) return next(new Error(404));
    
    var data = {
      img : {
        value:fs.readFileSync(picture.path), 
        meta:{filename:picture.originalname}
      }
    };
    client.postMulti('detection/detect', data, function(err, response, body){
      
    });
    
    res.send('ok');
  });

  return route;
};
