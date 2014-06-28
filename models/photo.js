module.exports = function(Schema) {
  return new Schema({
    _id : String, // person_id get from faceplusplus
    creator: {type: 'String', ref : 'User'},
    subject: {type: 'String', ref : 'User'},
    face_id : [{type: 'String'}],
    img_id : String,
    created: {
      type: Date,
      default: Date.now
    }
  });
};
