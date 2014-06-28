// define ctrlers
module.exports = function(models, Ctrler) {
  return {
    user: require('./user')(models, Ctrler)
  }
}