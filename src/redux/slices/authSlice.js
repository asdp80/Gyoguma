// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../api/axiosInstance";  // axiosInstance 유지
import {API} from "../../api/index";

export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (code, { rejectWithValue }) => {
    try {
      const response = await API.auth.handleOAuthCallback(code);

      if (response.data && response.data.isSuccess) {
        return response.data.result;
      } else {
        return rejectWithValue(response.data?.message || '알 수 없는 오류');
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance({
        method: 'post',
        url: '/login',
        data: credentials,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        }
      });

      if (response.data && response.data.isSuccess) {
        return response.data.result;
      } else {
        return rejectWithValue(response.data?.message || '알 수 없는 오류');
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// authSlice 나머지 부분...

export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await API.auth.signup(userData);
      return response.data.result;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
    error: null
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
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
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
        state.error = action.payload?.message || '로그인에 실패했습니다.';
      })
      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || '회원가입에 실패했습니다.';

      })
      // Google Login
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
        state.error = action.payload?.message || 'Google 로그인에 실패했습니다.';
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;