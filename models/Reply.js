const mongoose = require("mongoose");
const joi = require("joi");

const replySchema = new mongoose.Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, required: true },
  text: { type: String, required: true },
  likes: { type: [{ _id: { type: mongoose.SchemaTypes.ObjectId }, name: { type: String } }] },
});

const Reply = mongoose.models["Reply"] || mongoose.model("Reply", replySchema);

const validate = (reply) => {
  const schema = joi.object({
    user: joi.string(),
    text: joi.string().required().min(4).max(300),
  });
  return schema.validate(reply);
};

module.exports = {
  replySchema,
  Reply,
  validate,
};
