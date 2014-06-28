module.exports = function(Schema) {
  return new Schema({
    _id : String, // group_id get from faceplusplus
    name : String,
    created: {
      type: Date,
      default: Date.now
    }
  });
};
