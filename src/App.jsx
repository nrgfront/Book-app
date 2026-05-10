import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BookList from "./Pages/BookList";
import BooksDetails from "./Pages/BooksDetails";
import HomePage from "./Pages/HomePage";
import Favorites from "./Pages/Favorites";

export default function App() {
const [favorites,setFavorites]= useState(()=> {
  const save= localStorage.getItem("favorites");
  return save? JSON.parse(save): [];
})

useEffect(()=>{
localStorage.setItem("favorites", JSON.stringify(favorites));
},[favorites])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BookList favorites={favorites} setFavorites={setFavorites} />} />
          <Route path="/books/:bookId" element={<BooksDetails />} />
          <Route path="/favorites" element={<Favorites favorites={favorites} setFavorites={setFavorites}  />} />

          <Route path="*" element={<div className="message"><p><ion-icon name="sad"></ion-icon> Page not found</p></div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
