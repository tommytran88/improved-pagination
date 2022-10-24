import React from "react";

import BookItem from "./BookItem";
import Spinner from "./Spinner";
const BookList = ({books, isLoading, onClickBook}) => {
  
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <ul className="book-list">
          {books?.map((book) => {

            return <BookItem key={book.id} book={book} onClickBook={onClickBook}/>;
          })}
        </ul>
      )}
    </div>
  );
};

export default BookList;
