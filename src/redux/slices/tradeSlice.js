// src/redux/slices/tradeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const tradeSlice = createSlice({
  name: 'trade',
  initialState: {
    trades: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    // builder 콜백을 사용한 extraReducers
  }
});

export default tradeSlice.reducer;
