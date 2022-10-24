import { useRef, useCallback } from "react";

const useThrottle = (callback, timeout) => {

  const isTimeout = useRef(true);
  const timeoutInstance = useRef();

  const cancelAction = () => {
    timeoutInstance.current && clearTimeout(timeoutInstance.current);
  };

  const throttledRequest = (arg) => {
    if (isTimeout.current === false) return; //we're waiting on the existing timer
    callback(arg);
    isTimeout.current = false; // we are about to start a new timer
    setTimeout(() => {
      isTimeout.current = true;
    }, timeout);
  };

  return [throttledRequest, cancelAction];
};

export default useThrottle;
