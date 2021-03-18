import axios from "axios";
import React from "react";
import { Form } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { addComment } from "../store/posts";

const initial_state = {
  text: "",
};

const CommentForm = ({ post_id }) => {
  const [data, setData] = React.useState(initial_state);
  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    setData({ ...data, [target.id]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const { data: post } = await axios.post(`api/comments?id=${post_id}`, data, {
        headers: {
          "auth-token": token,
        },
      });
      dispatch(addComment(post));
    } catch (ex) {
      console.log(ex.message);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label htmlFor="pic">Comment</label>
        <Form.TextArea rows={3} value={data.text} id="text" onChange={handleChange} />
      </Form.Field>
      <Form.Button type="submit" icon="add" />
    </Form>
  );
};

export default CommentForm;
