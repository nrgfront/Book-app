import { Link, useSearchParams } from "react-router-dom";

// import { allBooks } from "../../data/books";
import { useEffect, useState } from "react";
import Style from "./BookList.module.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const BASE_URL = `http://localhost:9000`;

function BookList({ favorites, setFavorites }) {
  //===================
  //STATS
  //===================
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  //CURRENT PAGE
  const [page, setPage] = useState(1);
  // const page = Number(searchParams.get("page")) || 1;

  //ITEMS PER PAGE
  const limit = 3;

  //START ITEM
  const offset = (page - 1) * limit;

  //===================
  //SEARCH PARAMS
  //===================
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") ?? "";

  //===================
  //DEBOUNCE
  //===================
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const time = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 1000);
    return () => clearTimeout(time);
  }, [searchQuery]);

  //===================
  //FETCH BOOKS
  //===================
  useEffect(
    function () {
      async function fetchBooks() {
        try {
          setError(null);
          setIsLoading(true);
          // const res = await fetch(`${BASE_URL}/allBooks`);
          const query = debouncedQuery.trim() || "javascript";
          //API REQUEST
          const res = await fetch(
            `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`,
          );

          if (!res.ok) throw new Error(`Failed to fetch books`);
          const data = await res.json();
          //TOTAL PAGES
          const total = data.numFound;
          setTotalPages(Math.ceil(total / limit));

          //CONVERT DATA
          const books = (data.docs || []).map((book) => ({
            key: book.key,
            title: book.title,
            author: book.author_name?.[0],
            image: book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-s.jpg`
              : "https://picsum.photos/300/200",
          }));

          setBooks(books);
        } catch (err) {
          console.log(err);
          setError(err);
        } finally {
          setIsLoading(false);
        }
      }
      fetchBooks();
    },
    [debouncedQuery, offset],
  );
  //===================
  //PAGE BUTTONS ARRAY
  //===================
  const pagesbutton = Array.from(
    { length: Math.min(5, totalPages) },
    (_, i) => i + 1,
  );
  //===================
  //CONDITIONS
  //===================
  if (isLoading) return <p className="message"><ion-icon name="alarm"></ion-icon> data is loading...</p>;
  if (error) return <p className="message"><ion-icon name="sad"></ion-icon> {error.message}</p>;
  if (books.length === 0) return <p><ion-icon name="sad"></ion-icon> book not found</p>;

  //===================
  //JSX
  //===================

  return (
    <>
      <Navbar />
      <div className={Style.container}>
        {/* SEARCH */}
        <div className={Style.searchBox}>
          <label>
           <span className="verticalIcon"> <ion-icon name="search"></ion-icon></span>
            search:{" "}
          </label>
          <input
            className="input"
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value;

              if (value.trim() === "") setSearchParams({});
              else {
                setPage(1);
                setSearchParams({ search: value });
              }
            }}
          />
        </div>

        {/* CARDS */}
        <div className={Style.cardsContainer}>
          {books.map((book) => {
            const isFavorite = favorites.some((fev) => fev.key === book.key);

const id= book.key.replace("/works/","")
            return (
              <div key={book.key} className={Style.card}>
                <img
                  loading="Lazy"
                  className={Style.img}
                  src={book.image}
                  alt={book.title}
                  onError={(e) =>
                    (e.target.src = "https://picsum.photos/300/200")
                  }
                />

                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <div className={Style.actions}>
                  <div>
                    <button
                      className={`${Style.btnFavorite} ${isFavorite ? Style.activeFavorite : ""}`}
                      onClick={() => {
                        if (isFavorite) {
                          setFavorites((prev)=> 
                            prev.filter((fev) => fev.key !== book.key),
                          );
                        } else {
                          setFavorites((prev) => [...prev, book]);
                        }
                      }}
                    >
                      <ion-icon name="heart"></ion-icon>
                    </button>
                  </div>
                 {book.key && <Link className={Style.link} to={`/books/${id}`}>
                    <button className="cta-secondary">learn more...</button>
                  </Link>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* PAGINATION */}
      <div className={Style.pageContainer}>
        {/* PREV */}
        <button
          className={Style.btnPage}
          disabled={page === 1}
          onClick={
            () => setPage((p) => Math.max(p - 1, 1))

            // setSearchParams({ search: searchQuery, page: page - 1 })
          }
        >
          <span >
            <ion-icon name="arrow-back-outline"></ion-icon>
          </span>
          <span>prev</span>
        </button>

        {/* PAGE NUMBERS */}
        {pagesbutton.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`${Style.btnPage} ${p === page ? Style.active : ""}`}
          >
            {p}
          </button>
        ))}

        <button
          className={Style.btnPage}
          onClick={
            () => setPage((p) => Math.min(p + 1, totalPages))
            // setSearchParams({ search: searchQuery, page: page + 1 })
          }
        >
          <span>next</span>
          <span >
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </span>
        </button>
      </div>
      <Footer />
    </>
  );
}

// function BookList() {

// const [searchParams,setSearchParams]= useSearchParams();
// const sort= searchParams.get('sort');
// let displayBooks=[...allBooks]
// if (sort==='price'){
//   displayBooks.sort((a,b)=>{
//     const  priceA= Number(a.price);
//     const priceB= Number(b.price);
// return priceA-priceB;
//   })
// }
// if(sort==="az"){
//   displayBooks.sort((a,b)=> a.title.localCompare(b.title))
// }
// */

//   return (
//     <div>
//       <h3>kinds of all books you need</h3>
//       <button onClick={()=>setSearchParams({sort:'price'})}>sort</button>
//       <ul>
//         {displayBooks.map((book) => (
//           <li key={book.id}>
//             <Link to={`books/${book.id}`}>{book.title} - {book.price}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
//=======================================
// function BookList() {
//   return (
//     <div>
//       <ul>
//         {allBooks.map((book) => (
//           <li key={book.id}>
//             <Link to={`books/${book.id}`}>{book.title} </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

export default BookList;
