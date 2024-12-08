//productSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../api/axiosInstance";
import initialState from "./productInitialState"

// export const fetchProductsByCategory = createAsyncThunk(
//   'products/fetchByCategory',
//   async ({ categoryId, page = 1 }, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get(`/products/?page=${page}`);
//       if (response.data.isSuccess) {
//         return {
//           products: response.data.result.productList,
//           totalPages: response.data.result.totalPage,
//           totalElements: response.data.result.totalElements,
//           hasMore: !response.data.result.isLast
//         };
//       }
//       return rejectWithValue(response.data.message);
//     } catch (error) {
//       console.error('API Error:', error); // 에러 확인
//       return rejectWithValue(error.response?.data?.message || '상품 로드 실패');
//     }
//   }
// );

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async ({ categoryId }, { rejectWithValue }) => {
    try {
      // 우선 1페이지를 가져와서 전체 페이지 수를 확인
      const firstPageResponse = await axiosInstance.get('/products/?page=1');

      if (firstPageResponse.data.isSuccess) {
        const { totalPage } = firstPageResponse.data.result;
        let allProducts = [...firstPageResponse.data.result.productList];

        // 2페이지부터 마지막 페이지까지 순차적으로 가져오기
        for(let page = 2; page <= totalPage; page++) {
          const response = await axiosInstance.get(`/products/?page=${page}`);
          if (response.data.isSuccess) {
            allProducts = [...allProducts, ...response.data.result.productList];
          }
        }

        return {
          products: allProducts,
        };
      }
      return rejectWithValue(firstPageResponse.data.message);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || '상품 로드 실패');
    }
  }
);
export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      if (response.data.isSuccess) {
        return response.data.result;
      }
      return rejectWithValue(response.data.message);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || '상품 조회 실패');
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    ...initialState,
    currentProduct: null,
  },
  reducers: {
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
      state.page = 1;
      state.hasMore = true;
      if (!state.categoryProducts[action.payload]) {
        state.categoryProducts[action.payload] = [];
      }
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        const { products, hasMore, totalPages, totalElements } = action.payload;

        const filteredProducts = state.currentCategory === 'all'
          ? products
          : products.filter(product =>
            product?.categoryId?.toString() === state.currentCategory
          );

        if (state.page === 1) {
          state.categoryProducts[state.currentCategory] = filteredProducts;
        } else {
          state.categoryProducts[state.currentCategory] = [
            ...state.categoryProducts[state.currentCategory],
            ...filteredProducts
          ];
        }

        state.hasMore = hasMore;
        state.totalPages = totalPages;
        state.totalElements = totalElements;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '상품 로드 실패';
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '상품 조회 실패';
        state.currentProduct = null;
      });
  }
});

export const {
  setCurrentCategory,
  setPage,
  clearCurrentProduct
} = productSlice.actions;

export default productSlice.reducer;