import "./Profile.css";
import { Link } from "react-router-dom";

function Profile({ onSignOut, currentUser, handleChangeProfileForm, updateUserInfo }) {

  function handelSubmitProfileForm(evt) {
    evt.preventDefault()
    updateUserInfo(currentUser)
  }

  return (
    <section className="profile">
      <form className="profile__container" id="profileForm" onSubmit={handelSubmitProfileForm}>
        <h2 className="profile__title">Привет, Виталий!</h2>
        <div className="profile__content profile__content_type_name">
          <p className="profile__text profile__text_type_name">Имя</p>
          <input
            type="text"
            name="name"
            value={currentUser.name}
            className="profile__input profile__input_type_name"
            onChange={handleChangeProfileForm}
          />
        </div>
        <div className="profile__content profile__content_type_email">
          <p className="profile__text profile__text_type_email">E-mail</p>
          <input
            type="email"
            name="email"
            onChange={handleChangeProfileForm}
            value={currentUser.email}
            className="profile__input profile__input_type_text"
          />
        </div>
      </form>

      <div className="profile__buttons">
        <button type="submit" form="profileForm" className="profile__button profile__button-edit">
          Редактировать
        </button>
        <Link
          to="/"
          type="button"
          className="profile__button profile__button-exit"
          onClick={onSignOut}
        >
          Выйти из аккаунта
        </Link>
      </div>
    </section>
  );
}

export default Profile;
