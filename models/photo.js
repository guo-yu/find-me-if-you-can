module.exports = function(Schema) {
  return new Schema({
    _id : String, // person_id get from faceplusplus
    creator: {type: 'User', ref : 'User'},
    face_id : [{type: 'Face', ref: 'Face'}],
    img_id : String,
    created: {
      type: Date,
      default: Date.now
    }
  });
};
