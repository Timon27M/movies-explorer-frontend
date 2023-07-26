import "./Footer.css";

function Footer() {
  return (
    <section className="footer">
      <h3 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>

      <div className="footer__container">
        <p className="footer__year">&copy; 2023</p>
        <div className="footer__links">
          <a className="footer__link-yp" href="#">
            Яндекс.Практикум
          </a>
          <a className="footer__link-gh" href="#">
            Github
          </a>
        </div>
      </div>
    </section>
  );
}

export default Footer;
