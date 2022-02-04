import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
  },
  reducers: {
    signIn: (state, action) => {
      state.data = action.payload;
    },
    logout: (state, action) => {
      state.data = null;
    },
  },
});

export const { signIn, logout } = userSlice.actions;
export default userSlice.reducer;
