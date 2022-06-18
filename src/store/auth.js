import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  username: "",
  userid: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.username = action.payload.username;
      state.userid = action.payload.userid;
    },
    logout(state) {
      state.username = "";
      state.userid = "";
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
