import React, { useState } from "react";
import Head from "next/head";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Container, Modal } from "semantic-ui-react";

import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { recievePosts } from "../store/posts";

export default function Feed() {
  const [open, setOpen] = useState(false);
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const get_posts = async () => {
    const { data: posts } = await axios.get("/api/posts");
    console.log(posts);
    dispatch(recievePosts(posts));
  };

  React.useEffect(() => {
    get_posts();
  }, []);
  return (
    <>
      <Head>
        <title>ZASOCIAL</title>
      </Head>
      <button className="ui icon button fluid mt-3" onClick={() => setOpen(true)}>
        <i className="cloud icon"></i> NEW POST
      </button>
      <Container style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {posts.loading && <h1>LOADING...</h1>}
        <Modal open={open} centered onClose={() => setOpen(false)}>
          <Modal.Header>NEW POST</Modal.Header>
          <Modal.Content>
            <PostForm />
          </Modal.Content>
        </Modal>

        {posts.list.map((post) => (
          <Grid.Column width="16" key={post._id} className="mt-3" stretched>
            <PostCard post={post} />
          </Grid.Column>
        ))}
      </Container>
    </>
  );
}
