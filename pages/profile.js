import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { recieveUserPosts } from "../store/posts";

const profile = () => {
  const dispatch = useDispatch();
  const { current_user_list: myPosts } = useSelector((state) => state.posts);
  const get_posts = async () => {
    const token = localStorage.getItem("token");
    const { data: posts } = await axios.get("/api/posts/me", {
      headers: {
        "auth-token": token,
      },
    });
    console.log(posts);
    dispatch(recieveUserPosts(posts));
  };

  React.useEffect(() => {
    get_posts();
  }, []);
  return (
    <div className="ui container mt-3">
      {myPosts.map((post) => (
        <img alt={post.caption} src={post.pic} width={200} />
      ))}
    </div>
  );
};

export default profile;
