import React from "react";
import PromoImage from "../../images/logo-promo.svg";

function Promo() {
 return (
    <section className="promo">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <img className="promo__img" alt="фоновый логотип" src={PromoImage} />
    </section>
 );
}

export default Promo;
