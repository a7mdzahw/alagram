const mongoose = require("mongoose");
const joi = require("joi");

const { replySchema } = require("./Reply");

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "User" },
  text: { type: String, required: true },
  replies: { type: [replySchema] },
  likes: { type: [{ _id: { type: mongoose.SchemaTypes.ObjectId }, name: { type: String } }] },
});

const Comment = mongoose.models["Comment"] || mongoose.model("Comment", commentSchema);

const validate = (comment) => {
  const schema = joi.object({
    user: joi.string(),
    text: joi.string().required().min(4).max(300),
    replies: joi.array(),
    likes: joi.array(),
  });
  return schema.validate(comment);
};

module.exports = {
  commentSchema,
  Comment,
  validate,
};
