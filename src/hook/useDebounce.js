
import {useRef, useCallback} from "react"


const useDebounce = (callback, timeout, deps) => {
  const timeoutInstance = useRef();

  const cancelAction = () => {
    timeoutInstance.current && clearTimeout(timeoutInstance.current)
  }

  const memoizedDebouncedCallback = useCallback((arg)=>{
    timeoutInstance.current && clearTimeout(timeoutInstance.current);
    timeoutInstance.current = setTimeout(()=>{
      callback(arg)
    },timeout)
  },[timeoutInstance.current, ...deps])

  return [memoizedDebouncedCallback,cancelAction];
}

export default useDebounce;