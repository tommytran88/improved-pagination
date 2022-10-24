import React from 'react'
import BookList from '../components/BookList'
import Searchbox from '../components/Searchbox'
import { useSelector, useDispatch } from "react-redux";
import { saveBookToWishlist } from '../store/wishlistSlice';
import Pagination from '../components/Pagination';

const Home = () => {
  const books = useSelector((state) => state.search.books);
  const isLoading = useSelector((state) => state.search.isLoading);
  const dispatch  =  useDispatch();

  const handleSaveBook = (book) => {
    console.log("handleSaveBook", book)
    dispatch(saveBookToWishlist(book))
  }
  return (
    <div className="home">
      <Searchbox/>
      <Pagination>
        <BookList books={books} isLoading={isLoading} onClickBook={handleSaveBook}/>
      </Pagination>
      
    </div>
  )
}

export default Home