/*import React from "react";
import AuthForm from "../AuthForm/AuthForm";

function Register() {
 
  return (
    <AuthForm
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      text="Уже зарегистрированы?"
      linkPath="/signin"
      linkText="Войти"
    >
      <label className="auth-form__label" >
        Имя
      </label>
      <input
        className="auth-form__input"
        name="username"
        type="text"
        id="username"
        minLength="2"
        maxLength="30"
        placeholder="введите имя"
      />
      <label className="auth-form__label" >
        E-mail
      </label>
      <input
        className="auth-form__input"
        name="email"
        type="email"
        id="email"
        placeholder="email@yandex.ru"
        required
      />
      <label className="auth-form__label" htmlFor="password">
        Пароль
      </label>
      <input
        className="auth-form__input"
        name="password"
        type="password"
        id="password"
        minLength="5"
        maxLength="22"
        placeholder="введите пароль"
        required
      />
      <span className="auth-form__span-input-error">
      </span>
    </AuthForm>
  );
}

export default Register;
*/
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/logo-header.svg";

function Register() {
  function handleSubmit(e) {
    e.preventDefault();
    
  }
  return (
    <section className="register" onSubmit={handleSubmit}>
      <Link to={"/"}>
        <img src={Logo} alt="логотип" className="navigation__logo" />
      </Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <div className="register__input-container">
        <label className="register__label">Имя</label>
        <input
          className="register__input"
          id="userName"
          type="text"
          placeholder="введите имя"
          minLength="2"
          maxLength="30"
          required
        />
      </div>
      <div className="register__input-container">
        <label className="register__label">E-mail</label>
        <input
          className="register__input"
          id="userEmail"
          type="email"
          placeholder="pochta@yandex.ru"
          minLength="2"
          maxLength="30"
          required
        />
        <label className="register__label">Пароль</label>
        <input
          className="register__input"
          id="password"
          type="password"
          placeholder="введите пароль"
          minLength="2"
          maxLength="22"
          required
        />
        <span className="register__span-input-error"></span>
      </div>
      <button className="register__button" type="submit">
        Зарегистрироваться
      </button>
      <div className="register__wrapper">
        <p className="register__text">Уже зарегистрированы?</p>
        <Link to="/signin" className="register__link">
          Войти
        </Link>
      </div>
    </section>
  );
}

export default Register;
