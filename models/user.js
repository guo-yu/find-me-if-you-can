module.exports = function(Schema) {
  return new Schema({
    _id : String, // person_id get from faceplusplus
    avatar: String,
    nickname: String,
    credits : { type:Number, default: 0 }, 
    created: {
      type: Date,
      default: Date.now
    }
  });
};
