import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false, // loading until data fetched
  error: null,
};

export const userDetail = createSlice({
  name: "userDetail",
  initialState,
  reducers: {},
});

export default userDetail.reducer;
