var fs = require('fs');
var FacePlusPlus = require('faceplusplus');
var fppClient = new FacePlusPlus(require('../config/faceplusplus.json'));

module.exports = function(models, Ctrler) {

  var Photo = new Ctrler(models.photo);

  Photo.read = function(id, callback) {
    
  };
  
  return Photo;
}

