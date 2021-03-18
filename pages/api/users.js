import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User, validate } from "../../models/User";
import start_db from "../../config/db";

start_db();

export default async (req, res) => {
  switch (req.method) {
    case "POST": {
      const { error } = validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const { name, email, password, avatar } = req.body;
      let user = await User.findOne({ email });
      if (user) return res.status(400).send("User With The Same Email Exists");

      const hashedPassword = await bcrypt.hash(password, 10);

      user = new User({
        name,
        email,
        password: hashedPassword,
        avatar,
      });
      await user.save();
      const token = jwt.sign({ _id: user._id, name: user.name }, "3665");
      res.status(201).send(token);
      break;
    }
  }
};
