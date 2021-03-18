import React from "react";
import PostForm from "../components/PostForm";

const post = () => {
  return (
    <div className="ui container">
      <h2 className="ui header positive">Create Post</h2>
      <PostForm />
    </div>
  );
};

export default post;
