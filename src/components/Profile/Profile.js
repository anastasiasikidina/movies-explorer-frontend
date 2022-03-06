import React from "react";
import useFormValidator from "../../hooks/formValidation";
import { regex } from "../../utils/constants";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({ onLogout, onUpdate, setIsSuccessMessageShowing }) {
  const useFormValidation = useFormValidator();
  const { values, errors, isFormValid, resetForm, handleChange } =
    useFormValidation;
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);

  function handleSubmitForm(evt) {
    evt.preventDefault();
    if (
      isFormValid ||
      currentUser.name === values.name ||
      currentUser.email === values.email
    ) {
      onUpdate({ name, email });
      resetForm();
    }
    return;
  }

  return (
    <section className="profile" noValidate onSubmit={handleSubmitForm}>
      <h2 className="profile__title">Привет, {currentUser.name}</h2>
      <div className="profile__input-container">
        <label className="profile__label" htmlFor="profileName">
          Имя
        </label>
        <input
          className="profile__input"
          id="profileName"
          type="text"
          placeholder="Анастасья"
          minLength="2"
          maxLength="30"
          disabled=""
          required
          onChange={(e) => {
            handleChange(e);
            setName(e.target.value);
          }}
        />
        <span className="profile__span-input-error">{errors.name}</span>
      </div>
      <div className="profile__input-container">
        <label className="profile__label" htmlFor="profileEmail">
          E-mail
        </label>
        <input
          className="profile__input"
          id="profileEmail"
          type="text"
          placeholder="pochta@yandex.ru"
          minLength="2"
          maxLength="30"
          required
          pattern={regex.email}
          value={email}
          onChange={(e) => {
            handleChange(e);
            setEmail(e.target.value);
          }}
        />
        <span className="profile__span-input-error">{errors.email}</span>
      </div>
      <button
        className={`profile__button ${
          (!isFormValid ||
            currentUser.name === values.name ||
            currentUser.email === values.email) &&
          "profile__button_disabled"
        }`}
        type="submit"
        disabled={
          !isFormValid ||
          currentUser.name === values.name ||
          currentUser.email === values.email
        }
      >
        {" "}
        Редактировать
      </button>
      <button
        className="profile__button profile__button_exit"
        type="button"
        onClick={onLogout}
      >
        Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;
