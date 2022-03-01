import React from "react";
import "./App.css";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";

function App() {
  const existFooterForPage = [
    "/signin",
    "/signup",
    "/profile",
  ];
  
  return (
    <div className="page">
      <Switch>
        <Route exact path={"/"}>
          <Header place="landing" />
          <Main />
        </Route>
        <Route path={"/movies"}>
          <Header place="movies" />
          <Movies />
        </Route>
        <Route path={"/saved-movies"}>
          <Header place="saved-movies" />
          <SavedMovies />
        </Route>
        <Route path={"/profile"}>
          <Header place="profile" />
          <Profile />
        </Route>
        <Route path={"/signup"}>
          <Register />
        </Route>
        <Route path={"/signin"}>
          <Login />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      {useRouteMatch(existFooterForPage) ? null : (   
          <Footer />
      )}
    </div>
  );
}

export default App;
