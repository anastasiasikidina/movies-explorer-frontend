import React from "react";
import { useRouteMatch } from "react-router-dom";

function Footer() {
  const isMain = useRouteMatch({ path: "/" });
  const isMovies = useRouteMatch({ path: "/movies" });
  const isSavedMovies = useRouteMatch({ path: "/saved-movies" });
  const footerEnabled = isMain || isMovies || isSavedMovies;
  return (
    <section className={`footer ${footerEnabled ? "footer_enabled" : ""}`}>
      <h3 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__container">
        <p className="footer__text">© 2022</p>
        <ul className="footer__nav-bar">
          <li className="footer__nav-item">
            <a
              className="footer__link"
              href="https://practicum.yandex.ru"
              target="_blank"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__nav-item">
            <a
              className="footer__link"
              href="https://github.com/anastasiasikidina"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
          <li className="footer__nav-item">
            <a
              className="footer__link"
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Footer;
