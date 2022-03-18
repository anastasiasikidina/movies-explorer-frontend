import React from "react";
import Navigation from "../Navigation/Navigation";

function Header({ place, isLoggedIn }) {
  return (
    <header className={`header header__place_${place}`}>
      <Navigation place={place} isLoggedIn={isLoggedIn} />
    </header>
  );
}

export default Header;
