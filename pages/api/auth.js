import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../../models/User";
import start_db from "../../config/db";
import Joi from "joi";
import auth from "../../middlewares/auth";
import run from "../../middlewares/run";

start_db();

const validate = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4).max(255),
  });
  return schema.validate(user);
};

export default async (req, res) => {
  switch (req.method) {
    case "GET": {
      try {
        await run(req, res, auth);
      } catch (ex) {
        console.log(ex.message);
      }
      const current = await User.findById(req.user._id).select("-password");
      res.send(current);
    }
    case "POST": {
      const { error } = validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) return res.status(400).send("User Cerdentials Is False");

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return res.status(400).send("User Cerdentials Is False");

      const token = jwt.sign({ _id: user._id, name: user.name }, "3665");
      res.status(201).send(token);
    }
  }
};
