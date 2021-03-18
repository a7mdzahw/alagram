import start_db from "../../../config/db";
import run from "../../../middlewares/run";
import auth from "../../../middlewares/auth";
import { User } from "../../../models/User";
const { Post, validate } = require("../../../models/Post");

start_db();

export default async (req, res) => {
  try {
    await run(req, res, auth);
  } catch (ex) {
    console.log(ex.message);
  }
  switch (req.method) {
    case "GET": {
      const posts = await Post.find({ user: req.user._id })
        .populate("user", "name avatar", User)
        .populate({ path: "comments", populate: { path: "user", model: User } });
      res.status(200).json(posts);
      break;
    }

    default: {
      res.send("THIS METHOD ISNOT ALLOWED");
    }
  }
};
