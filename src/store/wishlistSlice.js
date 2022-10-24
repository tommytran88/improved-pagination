import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const saveBookToWishlist = createAsyncThunk(
  "wishlist/saveBookToWishlist",
  async (book, thunkAPI) => {
   
    const curWishlist = thunkAPI.getState().wishlist.wishlist;
     console.log("thunk", curWishlist)
    if (curWishlist.find((item) => item.id === book.id)) {
      return thunkAPI.rejectWithValue("duplicate record!");
    }
    
    const nextWishlist = [book, ...curWishlist];
   

    localStorage.setItem("wishlist", JSON.stringify(nextWishlist));
    return nextWishlist;
  }
);

export const deleteBookFromWishlist = createAsyncThunk(
  "wishlist/deleteBookFromWishlist",
  async (id, thunkAPI) => {
    const curBookList = thunkAPI.getState().wishlist.wishlist;
    const nextBookList = curBookList.filter((book) => book.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(nextBookList));
    return nextBookList;
  }
);

export const initWishlist = createAsyncThunk(
  "wishlist/initWishlist",
  async (_, thunkAPI) => {
    const wishlistFromLS = localStorage.getItem("wishlist");
    if(!wishlistFromLS){
      localStorage.setItem("wishlist","[]")
    }
    return JSON.parse(localStorage.getItem("wishlist"));
  }
);

const initialState = {
  wishlist: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  extraReducers: {
    [saveBookToWishlist.fulfilled]: (state, action) => {
      state.wishlist = action.payload;
    },
    [saveBookToWishlist.rejected]: (state, action) => {
      alert(action.payload || "save wishlist data failed!");
    },

    [deleteBookFromWishlist.fulfilled]: (state, action) => {
      state.wishlist = action.payload;
    },
    [deleteBookFromWishlist.rejected]: (state, action) => {
      alert("delete wishlist data failed!");
    },
    [initWishlist.fulfilled]: (state, action) => {
      state.wishlist = action.payload;
    },
    [initWishlist.rejected]: (state, action) => {
      alert("initialize wishlist data failed!");
    },
  },
});

export default wishlistSlice.reducer;
