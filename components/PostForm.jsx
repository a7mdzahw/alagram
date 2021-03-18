import axios from "axios";
import React from "react";
import { Form } from "semantic-ui-react";

const initial_state = {
  pic: "",
  caption: "",
};

const PostForm = () => {
  const [data, setData] = React.useState(initial_state);
  const handleChange = ({ target }) => {
    setData({ ...data, [target.id]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const { data: post } = await axios.post("api/posts", data, {
        headers: {
          "auth-token": token,
        },
      });
      console.log(post);
    } catch (ex) {
      console.log(ex.message);
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
      <Form.Button type="submit" icon="add" content="Post" />
    </Form>
  );
};

export default PostForm;
