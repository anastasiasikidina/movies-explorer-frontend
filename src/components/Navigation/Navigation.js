import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Logo from "../../images/logo-header.svg";
import Menu from "../Menu/Menu";

function Navigation({ place }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleMobileMenuOpen = () => setIsMobileMenuOpen(true);
  const onMobileMenuClose = () => setIsMobileMenuOpen(false);

  return (
    <nav className="navigation">
      <Link to={"/"}>
        <img src={Logo} alt="логотип" className="navigation__logo" />
      </Link>

      <ul className={`navigation__films ${
          place === "landing" ? "navigation__films_hidden" : ""
        }`}>
        <li className="navigation__films-element">
          <Link to="/movies" className={`navigation__link ${
              place === "movies" ? "navigation__link_active" : ""
            }`}>
            Фильмы
          </Link>
        </li>
        <li className="navigation__films-element">
          <Link to="/saved-movies" className={`navigation__link ${place === "saved-movies" ? "navigation__link_active" : ""}`}>
            Сохранённые фильмы
          </Link>
        </li>
      </ul>
      <Link
        to="/profile"
        className={`navigation__profile-edit navigation__profile-edit_place_header ${place === "landing"
        ? "navigation__profile-edit_hidden"
        : ""}`}
      >
        <span className="navigation__profile-text">Аккаунт</span>
        <div className="navigation__profile-icon-wrapper">
          <div className="navigation__profile-icon" />
        </div>
      </Link>

      <div className={`navigation__login ${
          place !== "landing" ? "navigation__login_hidden" : ""
        }`}>
        <Link to="/signup" className="navigation__login-element">
          Регистрация
        </Link>
        <Link to="/signin" className="navigation__login-element">
          <button className="navigation__button">Войти</button>
        </Link>
      </div>

      <button
        className={`navigation__burger-button ${
          isMobileMenuOpen || place === "landing"
            ? "navigation__burger-button_hidden"
            : ""
        }`}
        type="button"
        onClick={handleMobileMenuOpen}
      ></button>
      <Menu
        isOpened={isMobileMenuOpen}
        onMobileMenuClose={onMobileMenuClose}
        place={place}
      />
    </nav>
  );
}

export default Navigation;
