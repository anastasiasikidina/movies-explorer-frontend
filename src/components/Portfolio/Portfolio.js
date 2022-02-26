import React from "react";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <div className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/anastasiasikidina/how-to-learn"
          >
            Статичный сайт
          </a>
          <p className="portfolio__list-element">↗</p>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
            href="https://agriks.ru/"
          >
            Адаптивный сайт
          </a>
          <p className="portfolio__list-element">↗</p>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/anastasiasikidina/express-mesto"
          >
            Одностраничное приложение
          </a>
          <p className="portfolio__list-element">↗</p>
        </li>
      </div>
    </section>
  );
}

export default Portfolio;
