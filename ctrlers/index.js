// define ctrlers
module.exports = function(models, Ctrler) {
  return {
    user: require('./user')(models, Ctrler),
    photo: require('./photo')(models, Ctrler)
  }
};
