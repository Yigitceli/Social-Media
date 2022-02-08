import { createSlice } from "@reduxjs/toolkit";

const pinSlice = createSlice({
  name: "pin",
  initialState: {
    loading: true,
    data: [],
  },
  reducers: {
    reHydrate: (state, action) => {
      state.data.comments.push({
        postedBy: action.payload.postedBy,
        comment: action.payload.comment,
      });
    },
    hydrateData: (state, action) => {      
      state.data = action.payload;
     
    },
  },
  extraReducers: (builder) => {},
});

export const { reHydrate, hydrateData } = pinSlice.actions;
export default pinSlice.reducer;
