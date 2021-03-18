// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import start_db from "../../../config/db";
import run from "../../../middlewares/run";
import auth from "../../../middlewares/auth";
import { User } from "../../../models/User";
const { Post, validate } = require("../../../models/Post");

start_db();

export default async (req, res) => {
  switch (req.method) {
    case "GET": {
      const posts = await Post.find({})
        .populate("user", "name avatar", User)
        .populate({
          path: "comments",
          populate: { path: "user", select: "-password", model: User },
        });

      res.status(200).send(posts);
      break;
    }
    case "POST": {
      try {
        await run(req, res, auth);
      } catch (ex) {
        console.log(ex.message);
      }
      const { error } = validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const post = new Post({
        user: req.user._id,
        ...req.body,
      }).populate("user", User);
      await post.save();

      res.status(201).send(post);
      break;
    }
    case "DELETE": {
      try {
        await run(req, res, auth);
      } catch (ex) {
        console.log(ex.message);
      }
      const post = await Post.findById(req.query.id);
      if (!post) return res.status(404).send("NO SUCH POST TO DELETE");

      const havePermission = post.user.toString() == req.user._id;
      if (!havePermission) return res.status(403).send("NOT AUTHORIZED");

      await post.delete();
      res.status(204).send("DElETED");
      break;
    }
    default: {
      res.send("THIS METHOD ISNOT ALLOWED");
    }
  }
};
