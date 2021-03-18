import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { Form } from "semantic-ui-react";
import { addPost } from "../store/posts";

const initial_state = {
  pic: "",
  caption: "",
};

const PostForm = ({ onClose }) => {
  const [data, setData] = React.useState(initial_state);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const dispatch = useDispatch();
  const handleChange = ({ target }) => {
    setData({ ...data, [target.id]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    try {
      const { data: post } = await axios.post("api/posts", data, {
        headers: {
          "auth-token": token,
        },
      });
      dispatch(addPost(post));
      onClose();
      toast.success("Post Published");
    } catch (ex) {
      toast.error((ex.response && ex.response.data) || ex.message);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label htmlFor="pic">Pic</label>
        <Form.Input type="text" id="pic" value={data.pic} onChange={handleChange} />
      </Form.Field>
      <Form.Field>
        <label htmlFor="pic">Caption</label>
        <Form.TextArea rows={3} value={data.caption} id="caption" onChange={handleChange} />
      </Form.Field>
      <Form.Button type="submit" icon="add" content="Post" loading={isSubmitting} />
    </Form>
  );
};

export default PostForm;
