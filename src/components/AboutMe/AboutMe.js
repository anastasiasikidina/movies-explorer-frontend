import React from "react";
import Title from "../Title/Title";
import MyPhoto from "../../images/photo-me.jpg";

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <Title title="Студент" />
      <div className="about-me__section">
        <div className="about-me__container">
          <h2 className="about-me__title">Анастасья</h2>
          <p className="about-me__subtitle">Фронтенд-разработчик, 25 лет</p>
          <p className="about-me__text">
            Я всю жизнь прожила в Краснодаре, закончила КубГУ и получила два образования: дипломата и филолога иностранных языков.
            В один момент моя жизнь круто изменилась и теперь я получаю знания в области IT (хотя никогда этим раньше не занималась),
            переехала в другую страну и увлеклась серфингом (хотя и не умею плавать).
            Девиз по жизни: "просто делай и всё получится!"
          </p>
          <div className="about-me__social-links">
            <a
              className="about-me__social"
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
            <a
              className="about-me__social"
              href="https://github.com/anastasiasikidina"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
        </div>
        <img className="about-me__photo" src={MyPhoto} alt="Моя фотография" />
      </div>
    </section>
  );
}

export default AboutMe;
