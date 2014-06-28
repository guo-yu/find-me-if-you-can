module.exports = function(models, Ctrler) {

  var User = new Ctrler(models.user);
  User.checkId = function(id){
    return (id && id.match(/^[0-9a-fA-F]{32}$/));
  };
  var user = models.user;

  User.read = function(id, callback) {

  };

  return User;
  
}