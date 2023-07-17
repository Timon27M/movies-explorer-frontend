import "./Promo.css";
import promoLogo from '../../images/Promo-logo.svg'

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__text">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <img className="promo__logo" src={promoLogo} alt="Логотоип" />
    </section>
  );
}

export default Promo;
