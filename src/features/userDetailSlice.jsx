import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false, // loading until data fetched
  error: null,
};

//✍🏻✍🏻✍🏻✍🏻 STEP - 1 ==>> CREATE USER WITH { createAsyncThunk 👈🏻 } ✍🏻✍🏻✍🏻✍🏻

// we pass the ( data ) in asynThunk that data we dispatch from handleSubmit function of Create component
// and importantly createAsyncThunk returns a (PROMISE) and promise give three things ( 👉🏻 pending, reject and fullfilled 👈🏻 ) and we have to handle it ans we can handle it in extraReducers that decalred in 🫳🏻 userDetailSlice

export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://68c2f601f9928dbf33f0526f.mockapi.io/crud",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const result = response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 👉🏽👉🏻👉🏻 REDUCERS  👈🏻👈🏻👈🏻

export const userDetail = createSlice({
  name: "userDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        (state.loading = false), (state.users = action.payload);
      });
    // [createUser.pending]: (state) => {
    //   state.loading = true;
    // },
    // [createUser.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.users.push = action.payload;
    // },
    // [createUser.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.users = action.payload;
    // },
  },
});

export default userDetail.reducer;
