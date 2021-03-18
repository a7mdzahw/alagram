const mongoose = require("mongoose");
const joi = require("joi");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
});

const User = mongoose.models["User"] || mongoose.model("User", userSchema);

const validate = (user) => {
  const schema = joi.object({
    name: joi.string().required().min(3).max(255),
    email: joi.string().email().required().min(3).max(255),
    password: joi.string().required().min(4).max(255),
    avatar: joi.string().max(255),
  });
  return schema.validate(user);
};

module.exports = {
  User,
  validate,
};
