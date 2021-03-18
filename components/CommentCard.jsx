import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Comment, Form, Icon, Modal } from "semantic-ui-react";

import ReplyItem from "./ReplyItem";
import { addComment } from "../store/posts";
import toast from "react-hot-toast";

const CommentCard = ({ comment, post_id }) => {
  const [open, setOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [reply, setReply] = React.useState("");
  const dispatch = useDispatch();
  const { isAuth, current } = useSelector((state) => state.user);

  const handleReply = () => {
    setOpen(false);
    console.log(reply);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const token = localStorage.getItem("token");
      const { data: post } = await axios.delete(
        `api/comments?id=${comment._id}&post_id=${post_id}`,
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      dispatch(addComment(post));
    } catch (ex) {
      toast.error((ex.response && ex.response.data) || ex.message);
      setDeleting(false);
    }
  };
  return (
    <Comment>
      <Comment.Avatar as="a" src={comment.user.avatar} />
      <Comment.Content>
        <Comment.Author>{comment.user.name}</Comment.Author>
        <Comment.Text>{comment.text}</Comment.Text>

        <Comment.Actions className="mt-3">
          {isAuth && (
            <Comment.Action>
              <Button onClick={() => setOpen(true)} icon="reply" size="mini" />
            </Comment.Action>
          )}
          {isAuth && current._id == comment.user._id && (
            <Comment.Action>
              <Button
                onClick={handleDelete}
                icon="delete"
                size="mini"
                color="red"
                loading={deleting}
              />
            </Comment.Action>
          )}
        </Comment.Actions>
      </Comment.Content>
      <Comment.Group>
        {comment.replies.map((reply) => (
          <ReplyItem key={reply._id} reply={reply} />
        ))}
      </Comment.Group>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Modal.Header>{comment.text}</Modal.Header>
        <Modal.Content>
          <Form reply>
            <Form.TextArea onChange={(e) => setReply(e.target.value)} />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button content="send reply" icon="reply" onClick={handleReply} />
        </Modal.Actions>
      </Modal>
    </Comment>
  );
};

export default CommentCard;
