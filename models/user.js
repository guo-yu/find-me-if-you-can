module.exports = function(Schema) {
  return new Schema({
    _id : String, // person_id get from faceplusplus
    avatar: String,
    nickname: String,
    created: {
      type: Date,
      default: Date.now
    }
  });
};
