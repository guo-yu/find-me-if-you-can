module.exports = function(Schema) {
  return new Schema({
    avatar: String,
    nickname: String,
    created: {
      type: Date,
      default: Date.now
    }
  });
};