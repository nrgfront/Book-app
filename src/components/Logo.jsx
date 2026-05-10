import { Link } from "react-router-dom";
import Style from "./Logo.module.css"

function Logo() {
  return (
    <Link to="/">
      <h2>
        <span className={Style.icon}> <ion-icon name="book"></ion-icon></span><span className={Style.logo}>bookStore</span>
      </h2>
    </Link>
  );
}

export default Logo;
