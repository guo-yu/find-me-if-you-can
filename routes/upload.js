module.exports = function(app, express, debug) {
  
  var log = debug('upload');
  var route = express.Router();

  // upload my avatar or pictures
  route.get('/', function(req, res, next) {
    log(req.file)
    log(req.files)
    res.send('ok');
  });

  return route;
}