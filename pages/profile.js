import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { recieveUserPosts } from "../store/posts";
import { Message } from "semantic-ui-react";

const profile = ({ user }) => {
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "3rem",
        }}
      >
        <img
          src={user.current.avatar}
          alt="user_pic"
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <div style={{ marginLeft: "2em" }}>
          <h2>{user.current.name}</h2>
          <p style={{ color: "grey" }}>{user.current.email}</p>
        </div>
      </div>
      <h3>My PICS</h3>
      {myPosts.length ? (
        myPosts.map((post) => <img alt={post.caption} src={post.pic} width={200} key={post._id} />)
      ) : (
        <Message error> NO PICS TO SHOW</Message>
      )}
    </div>
  );
};

export default profile;
