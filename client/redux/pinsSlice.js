import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deletePin = createAsyncThunk(
  "pins/deletePin",
  async (pin, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/pin/${pin._id}`,
        {
          headers: {
            Authorization:
              "Bearer " + thunkAPI.getState().user.data.accessToken,
          },
        }
      );
      return response.data.payload;
    } catch (error) {}
  }
);

export const createPin = createAsyncThunk(
  "pins/createPin",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/pin`,
        {
          pinUrl: data.imageUrl,
          title: data.title,
          description: data.description,
          destination: data.destination,
          category: data.category,
        },
        {
          headers: {
            Authorization:
              "Bearer " + thunkAPI.getState().user.data.accessToken,
          },
        }
      );

      return response.data.payload;
    } catch (error) {
      console.log(error);
    }
  }
);

export const makeComment = createAsyncThunk(
  "pins/makeComment",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/pin/${data.pinId}/comment`,
        {
          comment: data.comment,
        },
        {
          headers: {
            Authorization:
              "Bearer " + thunkAPI.getState().user.data.accessToken,
          },
        }
      );

      return response.data.payload;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchPins = createAsyncThunk(
  "pins/fetchPins",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/pin?category=${data.slug}`,        
        {
          headers: {
            Authorization:
              "Bearer " + thunkAPI.getState().user.data.accessToken,
          },
        }
      );

      return response.data.payload;
    } catch (error) {
      console.log(error);
    }
  }
);

const pinsSlice = createSlice({
  name: "pins",
  initialState: {
    data: [],
  },
  reducers: {
    hydrateData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPin.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
    builder.addCase(deletePin.fulfilled, (state, action) => {
      state.data = state.data.filter((item) => {
        return item._id != action.payload._id;
      });
    });
    builder.addCase(fetchPins.fulfilled, (state, action) => {
      state.data = action.payload
    });
  },
});

export const { hydrateData } = pinsSlice.actions;
export default pinsSlice.reducer;
