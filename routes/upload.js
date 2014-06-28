module.exports = function(app, express, debug) {
  
  var log = debug('upload');
  var route = express.Router();

  // upload my avatar or pictures
  route.post('/', function(req, res, next) {
    log(req.files);
    var avatar = req.files.avatar;
    var picture = req.files.picture;
    if (!avatar && !picture) return next(new Error(404));
    res.send('ok');
  });

  return route;
}