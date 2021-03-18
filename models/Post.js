const mongoose = require("mongoose");
const joi = require("joi");
const { commentSchema } = require("./Comment");

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  pic: { type: String, required: true },
  caption: { type: String },
  likes: { type: [{ _id: { type: mongoose.SchemaTypes.ObjectId }, name: { type: String } }] },
  comments: { type: [commentSchema] },
});

const Post = mongoose.models["Post"] || mongoose.model("Post", postSchema);

const validate = (post) => {
  const schema = joi.object({
    user: joi.string(),
    pic: joi.string().required(),
    caption: joi.string().max(255),
    likes: joi.array(),
    comments: joi.array(),
  });
  return schema.validate(post);
};

module.exports = {
  Post,
  validate,
};
