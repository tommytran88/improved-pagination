import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePageByPageNum } from "../store/searchSlice";

/* 

  server-side pagination: server split the data, multiple request, improve the browser performance
  client-side pagination: client get all the data, client split data, one request

  autocomplete:
  debouncing: 
  throttling: 

*/

const Pagination = ({ children }) => {
  const curPage = useSelector((state) => state.search.curPage);
  const totalItems = useSelector((state) => state.search.totalItems);
  const maxResults = useSelector((state) => state.search.maxResults);
  const totalPages = Math.ceil(totalItems / maxResults);
  const pageArray = Array.from({ length: totalPages }, (_, i) => i);

  const dispatch = useDispatch();
  const handleClickPrev = () => {
    dispatch(changePageByPageNum(curPage - 1));
  };

  const handleClickNext = () => {
    dispatch(changePageByPageNum(curPage + 1));
  };

  const handleClickPageNum = (num) => {
    dispatch(changePageByPageNum(num));
  };

  return (
    <div className="pagination">
      <div>{children}</div>
      {totalItems === 0 ? null : (
        <div className="btn__container">
          <button onClick={handleClickPrev} disabled={curPage === 0}>
            {"<"}
          </button>
          <button onClick={() => handleClickPageNum(0)}>{1}</button>
          {!(curPage < 4) && <span>...</span>}
          {curPage < 4
            ? pageArray
                .filter((num) => num !== 0 && num <= 4)
                .map((num) => {
                  return (
                    <button key={num} onClick={() => handleClickPageNum(num)}>
                      {num + 1}
                    </button>
                  );
                })
            : curPage > totalPages - 1 - 4
            ? pageArray
                .filter(
                  (num) => num !== totalPages - 1 && num >= totalPages - 1 - 4
                )
                .map((num) => {
                  return (
                    <button key={num} onClick={() => handleClickPageNum(num)}>
                      {num + 1}
                    </button>
                  );
                })
            : pageArray
                .filter((num) => curPage - 1 <= num && curPage + 1 >= num)
                .map((num) => {
                  return (
                    <button key={num} onClick={() => handleClickPageNum(num)}>
                      {num + 1}
                    </button>
                  );
                })}
          {!(curPage > totalPages - 1 - 4) && <span>...</span>}
          <button onClick={() => handleClickPageNum(totalPages - 1)}>
            {totalPages}
          </button>
          <button
            onClick={handleClickNext}
            disabled={curPage === totalPages - 1}
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
