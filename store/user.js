import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { current: {}, isAuth: false, loading: true },

  reducers: {
    recieveUser: (user, action) => {
      user.current = action.payload;
      user.isAuth = true;
      user.loading = false;
    },
    logoutUser: (user, action) => {
      user.current = null;
      user.isAuth = false;
      user.loading = false;
    },
  },
});

export const { recieveUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
