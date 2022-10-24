import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useDebounce from "../hook/useDebounce";
import useThrottle from "../hook/useThrottle";
import { searchbookByKeyword } from "../store/searchSlice";

/* 

  debouncing: timer action, process: input char, make the request after a 2000ms, if there is another input happened within this 2000ms, it's going to reset the timer and wait another 2000ms
  throttling: action timer, process: input char, make the request immediately, 
              then start a timer of 2000ms, within this 2000ms, user wouldn't be able to type anything,
              after the 2000ms timer, user can type another char

  if user type something, invoke debouncedRequest fun, remove the existing timer if there is one, start a new timer with 2000ms delay, 
*/

/* let a = 1;
a = 2;

let timeoutInstance;

const debouncedRequest = (callback) => {
  timeoutInstance && clearTimeout(timeoutInstance);
  timeoutInstance = setTimeout(()=>{
    callback()
  },2000)
}

let isTimeout2  = true

//event loop
const debouncedRequest2 = async (callback) => {
  
  if(isTimeout2 === false) return //check if there is any existing timer
  timeoutInstance&& clearTimeout(timeoutInstance);
  await new Promise((resolve, rejected) => {
    isTimeout2= false //about to start a new timer
    timeoutInstance = setTimeout(()=>{
      isTimeout2 = true //reset the isTimeout2 when the timer is completed
      resolve()
    },2000)
  });
  if(isTimeout2 === false) return 
  callback()// if there is no existing timer, invoke the callback
}


let isTimeout = true;

const throttledRequest = (callback) => {
  if(isTimeout === false) return; //we're waiting on the existing timer
  callback();
  isTimeout = false// we are about to start a new timer
  setTimeout(()=>{
    isTimeout = true
  },2000)
}
 */

const Searchbox = () => {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const [debouncedRequest, cancelRequest] = useDebounce(
    (keyword) => dispatch(searchbookByKeyword(keyword)),
    2000,
    [keyword]
  );

  const [throttledSubmit, cancelSubmit] = useThrottle((keyword) => {
    dispatch(searchbookByKeyword(keyword));
    cancelRequest();
  }, 3000);

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = () => {
    if (keyword.trim() === "") return;
    throttledSubmit(keyword);
    //dispatch(searchbookByKeyword(keyword))
  };

  const handleKeyUp = () => {
    if (keyword.trim() === "") return;
    debouncedRequest(keyword);
  };

  return (
    <div>
      <input value={keyword} onChange={handleChange} onKeyUp={handleKeyUp} />
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
};

export default Searchbox;
