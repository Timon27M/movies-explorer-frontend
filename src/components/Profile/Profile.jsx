import "./Profile.css";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import useFormWithValidation from "../../utils/FormValidation";
import { CurrentUserContext } from '../../utils/CurrentUserContext';

function Profile({ onSignOut, updateUserInfo, setProfileResponseInfo, profileResponseInfo }) {

  const currentUser = useContext(CurrentUserContext);

  const [isValidFirstData, setIsValidFirstData] = useState(false);
  
  const { values, handleChange, isValid, setValues, setIsValid, resetForm} =
  useFormWithValidation(currentUser);
  
  useEffect(() => {
    setValues(currentUser);
  }, [currentUser])

  function handleSignOut(evt) {
    evt.preventDefault();
    onSignOut()
  }

  useEffect(() => {
    if (values.name === currentUser.name && values.email === currentUser.email) {
      setIsValidFirstData(false);
    } else {
      setIsValidFirstData(true);
    }
  }, [values, currentUser])

  // function handleChangeProfile(event) {
  //   handleChange(event);
  // }

  function handelSubmitProfileForm(evt) {
    evt.preventDefault()
    updateUserInfo({ name: values.name, email: values.email });
    setIsValid(false);
  }

  return (
    <section className="profile">
      <form className="profile__container" id="profileForm" onSubmit={handelSubmitProfileForm} noValidate>
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <div className="profile__content profile__content_type_name">
          <p className="profile__text profile__text_type_name">Имя</p>
          <input
            type="text"
            name="name"
            value={values.name}
            className="profile__input profile__input_type_name"
            onChange={handleChange}
          />
        </div>
        <div className="profile__content profile__content_type_email">
          <p className="profile__text profile__text_type_email">E-mail</p>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email}
            className="profile__input profile__input_type_text"
          />
        </div>
        <span className={`profile__response-info ${profileResponseInfo.classNameMessage}`}>{profileResponseInfo.textMessage}</span>
      </form>

      <div className="profile__buttons">
        <button type="submit" form="profileForm" disabled={!isValid || !isValidFirstData} className={`profile__button profile__button-edit ${(isValid && isValidFirstData) && 'profile__button-edit_active'}`}>
          Редактировать
        </button>
        <Link
          to="/"
          type="button"
          className="profile__button profile__button-exit"
          onClick={handleSignOut}
        >
          Выйти из аккаунта
        </Link>
      </div>
    </section>
  );
}

export default Profile;
