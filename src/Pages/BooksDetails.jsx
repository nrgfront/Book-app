import { useEffect, useState } from "react";
// import { allBooks } from "../../data/books";
import { useParams,useNavigate } from "react-router-dom";
import Style from "./BookDetails.module.css";
import Footer from "../components/Footer";


const BASE_URL = `http://localhost:9000`;
const BOOKS_API = `https://openlibrary.org`;

function BooksDetails() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate= useNavigate();

  useEffect(
    function () {
      async function fetchBookDetail() {
        try {
          setError(null);
          setIsLoading(true);
          const res = await fetch(`https://openlibrary.org/works/${bookId}.json`);
          if (!res.ok) throw new Error(`Failed to fetch books`);
          const data = await res.json();
          const coverId = data.covers?.[0];
          const image = coverId
            ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
            : "https://picsum.photos/300/200";

          const authorKey= data.authors?.[0]?.author?.key;
          let authorName="Unknown";
          if(authorKey){
            const authorRes= await fetch(`https://openlibrary.org${authorKey}.json`);
            const authorData= await authorRes.json();
            console.log(authorData)
            authorName= authorData.name
          }

          setBook({
            title: data.title,
            author: authorName,
            description: data.description?.value || data.description,
            image,
            subtitle: data.subtitle
          });
        } catch (err) {
          console.log(err);
          setError(err);
        } finally {
          setIsLoading(false);
        }
      }
      fetchBookDetail();
    },
    [bookId],
  );

  if (isLoading) return <p className="message"><ion-icon name="alarm"></ion-icon> data is loading...</p>;
  if (error) return <p className="message"><ion-icon name="sad"></ion-icon> failed to fetch data!</p>;
  if (!book) return null;

  return (
    <>
    <button className={Style.backBtn} onClick={() =>navigate(-1)}>
  <ion-icon name="arrow-back"></ion-icon> Back
</button>
      <div className={Style.container}>
        <div className={Style.leftBox}>
          <img className={Style.img} src={book.image} alt={book.name} />
        </div>
        <div className={Style.rightBox}>
          <div className={Style.header}>
<h2>{book.title}</h2>
          <p className={Style.subtitle}>{book.subtitle}</p>
          </div>
          

          
          <div className={Style.author}><span className={Style.icon}><ion-icon name="person"></ion-icon>
            </span>
           <span > author: {book.author}</span></div>

         
          <p className={Style.description}> <ion-icon name="book"></ion-icon> summary:  {book.description} </p>
          
        </div>
      </div>
         
      <Footer />
    </>
  );
}

export default BooksDetails;

// function BooksDetails() {
//   const { bookId } = useParams();
//   const book = allBooks.find((b) => b.id === Number(bookId));

//   if (!book) return <p>book not found</p>;

//   return (
//     <div>
//       <h2>{book.title}</h2>
//     </div>
//   );
// }

// const BASE_URL= "http://localhost:9000"

// function BookDetail(){
//     const {bookId}= useParams();
//     const [book,setBook]= useState(null)
//     const [isLoading,setIsLoading]=useState(false);

//     useEffect(function(){
//         async function fetchBook() {
//           try { setIsLoading(true)
//             const res= await fetch(`${BASE_URL}/${bookId}`)
//             const data=await res.json();
//             setBook(data);
//            } catch(err){console.log(err)} finally{ setIsLoading(false)

//             }
//         }
//         fetchBook();

//     },[bookId])

// if(!book) return <p>book not found</p>
// if(isLoading) return <p>data is loading</p>

//     return <div>
// {book.title}
//     </div>
// }
