module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      username: String,
      description: String,
      history:String,
      published: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Submission = mongoose.model("submission", schema);
  return Submission;
};
