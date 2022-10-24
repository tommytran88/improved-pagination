import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/* 
  totalItems: 200
  curPage: 0
  totalPages: totalItems / maxResults
  startIndex: 0 20(39) curPage * maxResults
  maxResult: 20
*/

const initialState = {
  books: [],
  keyword: "",
  isLoading: false,
  curPage: 0,
  maxResults: 10,
  totalItems: 0,
};

const searchAPI = (keyword, startIndex, maxResults) =>
  axios(
    `https://www.googleapis.com/books/v1/volumes?q=${keyword}&startIndex=${startIndex}&maxResults=${maxResults}`
  );

export const searchbookByKeyword = createAsyncThunk(
  "search/searchbookByKeyword",
  async (arg, thunkAPI) => {
    const maxResults = thunkAPI.getState().search.maxResults;
    const res = await searchAPI(arg, 0, maxResults); //pagination
    return res.data;
  }
);

export const changePageByPageNum = createAsyncThunk(
  "search/changePageByPageNum",
  async (switchedPage, thunkAPI) => {
    const maxResults = thunkAPI.getState().search.maxResults;
    const startIndex = switchedPage * maxResults;
    console.log("startIndex", startIndex);
    const keyword = thunkAPI.getState().search.keyword;
    const res = await searchAPI(keyword, startIndex, maxResults); //pagination
    return res.data;
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: {
    [searchbookByKeyword.pending]: (state) => {
      state.curPage = 0;
      state.isLoading = true;
    },
    [searchbookByKeyword.fulfilled]: (state, action) => {
      const data = action.payload;
      state.isLoading = false;
      state.totalItems = data.totalItems > 200 ? 200 : data.totalItems;
      state.keyword = action.meta.arg;
      state.books = data.items;
    },
    [searchbookByKeyword.rejected]: (state) => {
      state.isLoading = false;
      alert("server error");
    },
    [changePageByPageNum.pending]: (state, action) => {
      state.isLoading = true;
    },
    [changePageByPageNum.fulfilled]: (state, action) => {
      const data = action.payload;
      state.isLoading = false;
      state.curPage = action.meta.arg;
      state.books = data.items;
    },
    [changePageByPageNum.rejected]: (state, action) => {
      state.isLoading = false;
      alert("server error");
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateKeyword } = searchSlice.actions;

export default searchSlice.reducer;
