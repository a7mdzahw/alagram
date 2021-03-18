import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Feed, Card, Comment, Icon, Button, Modal } from "semantic-ui-react";

import { likePost, deletePost } from "../store/posts";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

const MYFeed = ({ post }) => {
  const [openComments, setOpenComments] = React.useState(false);
  const [likeModal, setLikeModal] = React.useState(false);
  const { isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`api/posts/like?id=${post._id}`, {
        headers: {
          "auth-token": token,
        },
      });
      dispatch(likePost(data));
    } catch (ex) {
      console.log(ex.message);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`api/posts?id=${post._id}`, {
        headers: {
          "auth-token": token,
        },
      });
      dispatch(deletePost(post._id));
    } catch (ex) {
      console.log(ex.message);
    }
  };
  return (
    <Feed>
      <Feed.Event>
        <Feed.Label image={post.user.avatar} />
        <Feed.Content>
          <Feed.Date>{post.user.name}</Feed.Date>
          <Feed.Summary>{post.caption}</Feed.Summary>
          <Feed.Extra>
            <a>
              <img src={post.pic} width={400} />
            </a>
          </Feed.Extra>
          <Card.Content extra>
            <div style={{ width: "400px", display: "flex", justifyContent: "space-between" }}>
              <div>
                <Icon name="like" onClick={handleLike} />
                <span onClick={() => setLikeModal(true)}>{post.likes.length}</span>
              </div>
              <div>
                <Icon name="delete" className="ui fluid ml-auto" onClick={handleDelete} />
              </div>
            </div>
          </Card.Content>
          <Card.Meta style={{ width: 400 }}>
            <p className="ui header small">Comments</p>
            <Button
              content={openComments ? "hide" : "show comments"}
              icon="comment"
              onClick={() => setOpenComments((ps) => !ps)}
            />
            {openComments && (
              <Comment.Group minimal>
                {post.comments.map((comment) => (
                  <CommentCard key={comment._id} comment={comment} post_id={post._id} />
                ))}
                {isAuth && <CommentForm post_id={post._id} />}
              </Comment.Group>
            )}
          </Card.Meta>
        </Feed.Content>
      </Feed.Event>
      <Modal open={likeModal} onClose={() => setLikeModal(false)} style={{ width: "200px" }}>
        <Modal.Header>
          LIKES <Icon name="like" />
        </Modal.Header>
        <Modal.Content>
          {post.likes.map((like) => (
            <Feed key={like._id}>
              <Feed.Content>{like.name}</Feed.Content>
            </Feed>
          ))}
        </Modal.Content>
      </Modal>
    </Feed>
  );
};

export default MYFeed;
