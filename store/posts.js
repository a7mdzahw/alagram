import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: { list: [], loading: true, current_user_list: [] },
  reducers: {
    recievePosts: (posts, action) => {
      posts.list = action.payload;
      posts.loading = false;
    },
    recieveUserPosts: (posts, action) => {
      posts.current_user_list = action.payload;
      posts.loading = false;
    },
    addPost: (posts, action) => {
      posts.list.unshift(action.payload);
    },
    addComment: (posts, action) => {
      const index = posts.list.findIndex((p) => p._id == action.payload._id);
      posts.list[index].comments = action.payload.comments;
    },
    likePost: (posts, action) => {
      const index = posts.list.findIndex((p) => p._id == action.payload._id);
      posts.list[index].likes = action.payload.likes;
    },
    deletePost: (posts, action) => {
      const index = posts.list.findIndex((p) => p._id == action.payload);
      posts.list.splice(index, 1);
    },
  },
});

export const {
  recievePosts,
  recieveUserPosts,
  likePost,
  deletePost,
  addComment,
  addPost,
} = postsSlice.actions;
export default postsSlice.reducer;
