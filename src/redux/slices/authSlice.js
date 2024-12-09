// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../api';

// Google 로그인 처리
export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (code, { rejectWithValue }) => {
    try {
      const response = await API.auth.handleOAuthCallback(code);
      if (response.data?.isSuccess) {
        return response.data.result;
      } else {
        return rejectWithValue(response.data?.message || '알 수 없는 오류');
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// 일반 로그인 처리
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API.auth.login(credentials); // login API 호출
      if (response.data?.isSuccess) {
        return response.data.result;
      } else {
        return rejectWithValue(response.data?.message || '알 수 없는 오류');
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Google 로그인 처리
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Google 로그인에 실패했습니다.';
      })

      // 일반 로그인 처리
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '로그인에 실패했습니다.';
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
