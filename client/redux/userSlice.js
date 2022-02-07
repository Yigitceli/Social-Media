import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const savePin = createAsyncThunk(
  "user/savePin",
  async (item, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/user/pin-save`,
        {
          item: item,
        },
        {
          headers: {
            Authorization:
              "Bearer " + thunkAPI.getState().user.data.accessToken,
          },
        }
      );
      return item;
    } catch (error) {
      console.log(error);
    }
  }
);

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
    save: (state, action) => {
      if (
        state.data.saved.some((item) => {
          item._id != action.payload._id;
        })
      ) {
        state.data.saved.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(savePin.fulfilled, (state, action) => {
      if (
        !state.data.saved.some((item) => {
          return item._id == action.payload._id;
        })
      ) {
        state.data.saved.push(action.payload);
      }
    });
  },
});

export const { signIn, logout, save } = userSlice.actions;
export default userSlice.reducer;
