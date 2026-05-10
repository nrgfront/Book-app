
import Style from "./HomePage.module.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Link } from "react-router-dom"

function HomePage() {
    
    return (
        <>
        <main>
            <Navbar/>
            <header className={Style.container}>
<div className={Style.left}>
<h1>Hello, welcomes here to learn something new everyday!!!</h1>
<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae a harum quis id at, perferendis, illo qui soluta culpa explicabo beatae iste vero unde eum assumenda, sed error amet architecto?</p>
<input type="email" placeholder="email..." />
<Link to={"/books"}>
<button className="cta-primary">get started</button>
</Link>
</div>
<div className={Style.right}><img src="/books.jpg"/></div>

            </header>
        </main>
           <Footer/>
           </>

    )
}

export default HomePage
