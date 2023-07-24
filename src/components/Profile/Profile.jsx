import "./Profile.css";
import { Link } from "react-router-dom"

function Profile() {
  return (
    <section className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <div className="profile__content profile__content_type_name">
          <p className="profile__text profile__text_type_name">Имя</p>
          <input
            type="text"
            value="Виталий"
            className="profile__input profile__input_type_name"
          />
        </div>
        <div className="profile__content profile__content_type_email">
          <p className="profile__text profile__text_type_email">E-mail</p>
          <input
            type="email"
            value="pochta@yandex.ru"
            className="profile__input profile__input_type_text"
          />
        </div>
      </div>

      <div className="profile__buttons">
        <button type="button" className="profile__button profile__button-edit">
          Редактировать
        </button>
        <Link to="/" type="button" className="profile__button profile__button-exit">
          Выйти из аккаунта
        </Link>
      </div>
    </section>
  );
}

export default Profile;
