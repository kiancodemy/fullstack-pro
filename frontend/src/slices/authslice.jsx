import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userinfo: localStorage.getItem("userinfo")
    ? JSON.parse(localStorage.getItem("userinfo"))
    : null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setCredential: (state, action) => {
      state.userinfo = action.payload;
      JSON.stringify(localStorage.setItem("userinfo", action.payload));
    },
  },
});

export const { setCredential } = authSlice.actions;

export default authSlice.reducer;
