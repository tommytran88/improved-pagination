import React from 'react'
import useDebounce from '../hook/useDebounce';


//useReducer, useState
const BookItem = ({book, onClickBook}) => {
  /* const [debouncedHandleClick, cancelClick] = useDebounce((book)=>{
    onClickBook(book);
  }, 4000, []) */
  const {title="N/A", authors=["N/A"], publisher="N/A", description="N/A", imageLinks:{thumbnail="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"}={thumbnail:"https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"}} = book.volumeInfo;
  const authorsString = authors?.join(", ");
  return (
    <div className='book-item' onClick={()=>onClickBook(book)}>
      <div className='thumbnail'>
        <img src={thumbnail} alt={title}/>
      </div>
      <div className="text-info">
        <ul>
          <li><b>title: </b>{title}</li>
          {<li><b>authors: </b>{authorsString}</li>}
          <li><b>publisher: </b>{publisher}</li>
          <li><b>description: </b>{description}</li>

        </ul>
      </div>
    </div>
  )
}

export default BookItem