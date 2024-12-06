// src/redux/slices/reviewSlice.js
import { createSlice } from '@reduxjs/toolkit';

const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    reviews: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    // builder 콜백을 사용한 extraReducers
  }
});

export default reviewSlice.reducer;