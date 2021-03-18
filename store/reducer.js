import { combineReducers } from "redux";
import postsReducer from "./posts";
import userReducer from "./user";

const reducer = combineReducers({
  posts: postsReducer,
  user: userReducer,
});

export default reducer;
