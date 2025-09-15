import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false, // loading until data fetched
  error: null,
  searchData: [],
};

//✍🏻✍🏻✍🏻✍🏻 STEP - 1 ==>> CREATE USER { createAsyncThunk 👈🏻 } ✍🏻✍🏻✍🏻✍🏻

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

//✍🏻✍🏻✍🏻✍🏻 STEP - 2 ==>> READ USER  ✍🏻✍🏻✍🏻✍🏻

export const showUser = createAsyncThunk(
  "showUser",
  async (_, { rejectWithValue }) => {
    const response = await fetch(
      "https://68c2f601f9928dbf33f0526f.mockapi.io/crud"
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//✍🏻✍🏻✍🏻✍🏻 STEP - 3 ==>> DELETE USER  ✍🏻✍🏻✍🏻✍🏻

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://68c2f601f9928dbf33f0526f.mockapi.io/crud/${id}`,
        { method: "DELETE" }
      );

      const result = await response.json();
      // console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//✍🏻✍🏻✍🏻✍🏻 STEP - 4 ==>> UPDATE USER  ✍🏻✍🏻✍🏻✍🏻

export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://68c2f601f9928dbf33f0526f.mockapi.io/crud/${data.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 👉🏽👉🏻👉🏻 REDUCERS ANS EXTRA-REDUCERS  👈🏻👈🏻👈🏻

export const userDetail = createSlice({
  name: "userDetail",
  initialState,
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
  },
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
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(showUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;

        const { id } = action.payload; // The deleted user's ID returned from API action.payload contain all user data

        if (id) {
          state.users = state.users.filter((user) => user.id !== id);
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.action = false;
        state.error = action.payload;
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

export const { searchUser } = userDetail.actions;

/**

.filter((user) => user.id !== id)

filter is an array method that creates a new array containing only the elements that pass the given condition.

The arrow function (user) => user.id !== id checks each user in the array:

If user.id is not equal to the id we want to delete, it keeps that user.

If user.id matches the id, it removes that user from the array.

*/
