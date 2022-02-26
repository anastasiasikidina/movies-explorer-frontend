/*import React from "react";
import Logo from "../../images/logo-header.svg";

function AuthForm(
  title,
  children,
  buttonText,
  text,
  linkText,
  onSubmit,
  loginPage,
  linkPath
) {
  return (
    <div className="auth-form">
      <a href="/" className="auth-form__logo-link">
        <img src={Logo} alt="логотип" className="auth-form__logo-image" />
      </a>
      <form className="auth-form__form" noValidate onSubmit={onSubmit}>
        <div className="auth-form__wrapper">
          <h2 className="auth-form__title">{title}</h2>
          {children}
        </div>
        <div className="auth-form__wrapper">
          <button
            className={`auth-form__button ${
              loginPage ? "auth-form__button_login" : ""
            }`}
            type="submit"
          >
            {buttonText}
          </button>
          <p className="auth-form__text">
            {`${text} `}
            <a className="auth-form__link" href={linkPath}>
              {linkText}
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;*/
