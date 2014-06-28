var pkg = require('./package');

module.exports = routes;

function routes(app, express) {

  app.locals.sys = pkg;

  // home route
  app.get('/', function(req, res, next) {
    if (req.session.user) return res.redirect('/game');
    return res.render('home');
  });

  // the game
  app.get('/game', function(req, res, next){
    if (!req.session.user) return res.redirect('/');
    // fetch a ramdom avatar and return 
    res.render('game', {
      target: ''
    });
  });

  // media upload
  app.post('/image', function(req, res, next){
    if (!req.files.media) return next(new Error('404'));
    var file = req.files.media;
    console.log(file);
    res.render('captured', {
      avatar: file.path
    });
    // media.create({
    //   name: file.name,
    //   type: file.mimetype,
    //   src: file.path,
    //   url: file.path.substr(file.path.lastIndexOf('/uploads')),
    //   user: res.locals.user._id,
    //   size: file.size
    // }, function(err, baby) {
    //   if (err) return next(err);
    //   res.json({
    //     stat: 'ok',
    //     file: baby
    //   });
    // });
  });

  // vertify yourself
  app.post('/vertify', function(req, res, next){
    var nickname = req.body.nickname;
    if (!nickname) nickname = 'someguy';
    var avatar = req.body.avatar;
    req.session.user = {
      nickname: nickname,
      avatar: avatar
    };
    res.redirect('/game');
  });

}
