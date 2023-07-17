import "./AboutMe.css";
import image from '../../images/aboutMe-image.jpg'

function AboutMe() {
  return (
    <section className="aboutMe" id="aboutMe">
      <h2 className="aboutMe__title">Студент</h2>

      <div className="aboutMe__container">
        <div className="aboutMe__info">
          <h3 className="aboutMe__info-title">Виталий</h3>
          <h4 className="aboutMe__info-subtitle">
            Фронтенд-разработчик, 30 лет
          </h4>
          <p className="aboutMe__info-text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <p className="aboutMe__info-footer">Github</p>
        </div>

        <img className="aboutMe__image" src={image} alt="Фото разработчика" />
      </div>
    </section>
  );
}

export default AboutMe;
