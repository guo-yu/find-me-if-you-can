module.exports = function(models, Ctrler) {

  var User = new Ctrler(models.user);
  var user = models.user;

  User.read = function(id, callback) {

  };

  return User;
  
}