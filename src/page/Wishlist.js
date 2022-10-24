import React,{useEffect} from "react";
import BookList from "../components/BookList";
import { useSelector , useDispatch} from "react-redux";
import { deleteBookFromWishlist, initWishlist } from "../store/wishlistSlice";

const Wishlist = () => {
  const books = useSelector((state) => state.wishlist.wishlist);
  console.log("books", books)
  const isLoading = false;
  const dispatch  =  useDispatch();
  
  const handleDeleteBook = (book) => {
    console.log("book", book)
    dispatch(deleteBookFromWishlist(book.id))
  } 
  return (
    <div className="wishlist">
      <BookList books={books} isLoading={isLoading} onClickBook = {handleDeleteBook} />
    </div>
  );
};

export default Wishlist;
