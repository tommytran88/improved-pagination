import "./App.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Wishlist from "./page/Wishlist";
import Home from "./page/Home";
import Header from "./components/Header";
import { initWishlist } from "./store/wishlistSlice";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initWishlist());
  }, []);
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
