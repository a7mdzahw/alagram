import { User } from "../../models/User";
import start_db from "../../config/db";
import auth from "../../middlewares/auth";
import run from "../../middlewares/run";
import { Comment, validate } from "../../models/Comment";
import { Post } from "../../models/Post";

start_db();

export default async (req, res) => {
  try {
    await run(req, res, auth);
  } catch (ex) {
    console.log(ex.response.data);
  }
  switch (req.method) {
    case "POST": {
      const { error } = validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const post_id = req.query.id;
      let post = await Post.findById(post_id);
      if (!post) return res.status(404).send("NO SUCH POST OR DELETED");

      const comment = new Comment({
        user: req.user._id,
        text: req.body.text,
      });

      await comment.save();

      post.comments.push(comment);
      await post.save();

      post = await Post.findById(post._id).populate({
        path: "comments",
        populate: { path: "user", model: User },
      });

      res.status(201).send(post);
      break;
    }
    case "DELETE": {
      const comment = await Comment.findById(req.query.id);
      console.log(comment);
      if (!comment) return res.status(404).send("No Such Comment");

      if (comment.user.toString() != req.user._id) return res.status(403).send("UNAUTHORIZED");
      await comment.delete();

      const post = await Post.findById(req.query.post_id).populate({
        path: "comments",
        populate: { path: "user", model: User },
      });
      post.comments = post.comments.filter((comm) => comm._id.toString() !== comment._id);
      await post.save();

      res.status(204).send(post);
      break;
    }
    default: {
      res.status(403).send("Method isnot Allowed");
    }
  }
};
