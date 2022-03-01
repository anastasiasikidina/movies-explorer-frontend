import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Logo from "../../images/logo-header.svg";

function Login() {
  const loginPage = true;

  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    history.push("/movies");
  }
  return (
    <section className="register" onSubmit={handleSubmit}>
      <Link to={"/"}>
        <img src={Logo} alt="логотип" className="navigation__logo" />
      </Link>
      <h2 className="register__title">Рады видеть!</h2>
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
      <button className={`register__button ${loginPage ? "register__button_login" : ""}`} type="submit">
        Войти
      </button>
      <div className="register__wrapper">
        <p className="register__text">Ещё не зарегистрированы?</p>
        <Link to="/signup" className="register__link">
          Регистрация
        </Link>
      </div>
    </section>
  );
}

export default Login;
