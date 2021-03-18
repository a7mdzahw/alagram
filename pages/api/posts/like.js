import start_db from "../../../config/db";
import run from "../../../middlewares/run";
import auth from "../../../middlewares/auth";
const { Post } = require("../../../models/Post");

start_db();

export default async (req, res) => {
  try {
    await run(req, res, auth);
  } catch (ex) {
    console.log(ex.message);
  }
  switch (req.method) {
    case "GET": {
      const post = await Post.findById(req.query.id);
      if (!post) return res.status(400).send("NO SUCH POST TO LIKE");

      const isLiked = post.likes.findIndex((like) => like._id == req.user._id);
      if (isLiked != -1) {
        post.likes.splice(isLiked, 1);
      } else {
        post.likes.unshift({
          _id: req.user._id,
          name: req.user.name,
        });
      }

      await post.save();
      res.status(200).json(post);
      break;
    }

    default: {
      res.send("THIS METHOD ISNOT ALLOWED");
    }
  }
};
