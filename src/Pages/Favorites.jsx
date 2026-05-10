import { Link } from "react-router-dom";
import Style from "./Favorites.module.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Favorites({ favorites, setFavorites }) {
  return (
    <>
      <Navbar />

      <div className={Style.cardsContainer}>
        {favorites.map((book) => {
        const id= book.key.replace("/works/","")
        return(
          <div key={book.key} className={Style.card}>
            <img
              loading="Lazy"
              className={Style.img}
              src={book.image}
              alt={book.title}
              onError={(e) => (e.target.src = "https://picsum.photos/300/200")}
            />

            <h3>{book.title}</h3>
            <p>{book.author}</p>

            <div className={Style.actions}>
              <div>
                <button
                  className={Style.btnFavorite}
                  onClick={() =>
                    setFavorites((prev) =>
                      prev.filter((item) => item.key !== book.key),
                    )
                  }
                >
                  <ion-icon name="close"></ion-icon>
                </button>
              </div>
              <Link className={Style.link} to={`/books/${id}`}>
                <button className={Style.btnFavorite}>learn more...</button>
              </Link>
            </div>
          </div>
        )})}
      </div>
      <Footer />
    </>
  );
}

export default Favorites;
