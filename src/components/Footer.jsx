import Style from "./Footer.module.css";
import Logo from "./Logo";
function Footer() {
  return (
    <div className={Style.footer}>
      <div className={Style.part1}>
        Follow us
        <span>
          <ion-icon name="logo-instagram"></ion-icon>
        </span>
        <span>
          <ion-icon name="logo-twitter"></ion-icon>
        </span>
        <span>
            <ion-icon name="logo-linkedin"></ion-icon>
        </span>
        <span>
            <ion-icon name="logo-facebook"></ion-icon>
        </span>
      </div>
      <div className={Style.part2}>
        <Logo />
        <p>Privacy and Terms</p>
        <p>About Bookstore</p>
        <p>Bookstore Products</p>
      </div>
    </div>
  );
}

export default Footer;
