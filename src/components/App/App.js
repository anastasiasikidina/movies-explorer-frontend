import { useCallback, useEffect, useState } from "react";
import {
  Route,
  Switch,
  useRouteMatch,
  useHistory,
  // useLocation,
} from "react-router-dom";
import {
  EXIST_FOOTER_FOR_PAGE,
  SERVER_IMAGE_URL,
  SHORT_DURATION,
  YOU_SUCCESS_REGISTER,
  NEW_CURRENTUSER_DATA_SUCCESS,
} from "../../utils/constants";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies//Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('userData')) || null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isSuccessMessageShowing, setIsSuccessMessageShowing] = useState(false);
  const [isPreloaderShowing, setIsPreloaderShowing] = useState(false);
  const [downloadedMovies, setDownloadedMovies] = useState([]);
  const [isMoviesShort, setIsMoviesShort] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isResponseSuccessful, setIsResponseSuccessful] = useState();
  const [infoTooltipMessage, setInfoTooltipMessage] = useState("");
  const [email, setEmail] = useState("");

  const history = useHistory();
  //const location = useLocation();

  function handleCheckToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .checkToken(jwt)
        .then((res) => {
          mainApi.setToken(jwt);
          setEmail(res.data.email);
          //history.push("/");
          localStorage.setItem("userData", JSON.stringify(res.data));
          setCurrentUser(res.data);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          if (err.status === 401) {
            console.log("401 — Токен не передан или передан не в том формате");
          }
          console.log("401 — Переданный токен некорректен");
        });
    }
  }

  function handleRegister(email, password, name) {
    clearInfoTooltip();
    setIsPreloaderShowing(true);
    mainApi
      .register(email, password, name)
      .then((res) => {
        setIsInfoTooltipOpen(true);
        setIsResponseSuccessful(true);
        setInfoTooltipMessage(YOU_SUCCESS_REGISTER);
        handleLogin(email, password);
        history.push("/movies");
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("Некорректно заполнено одно из полей ");
        }
        setIsInfoTooltipOpen(true);
        setIsResponseSuccessful(false);
      })
      .finally(() => {
        setIsSuccessMessageShowing(true);
        setIsPreloaderShowing(false);
      })
  }

  function handleLogin(email, password) {
    setIsPreloaderShowing(true);
    mainApi
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        mainApi.setToken(res.token);
        setEmail(email);
        history.push("/movies");
        window.location.reload();
        setIsLoggedIn(true);
      })
      .then(() => {
        loadUserData();
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - не передано одно из полей");
        } else if (err.status === 401) {
          console.log("401 - пользователь с email не найден ");
        }
        return console.log("Error: 500");
      })
      .finally(() => {
        setIsPreloaderShowing(false);
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    localStorage.removeItem('userData');
    localStorage.removeItem("localMovies");
    localStorage.removeItem("lastQuery");
    localStorage.removeItem('lastFilms');
    localStorage.removeItem("isShortStatus");
    setIsLoggedIn(false);
    history.push("/");
  }

  function loadUserData() {
    mainApi
      .getCurrentUser()
      .then((data) => {
        localStorage.setItem('userData', JSON.stringify(data.data));
        setCurrentUser(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleUpdateUser({ name, email }) {
    clearInfoTooltip();
    setIsPreloaderShowing(true);
    mainApi
      .updateCurrentUser({ name, email })
      .then((data) => {
        localStorage.setItem('userData', JSON.stringify(data.data));
        setCurrentUser(data.data);
        setInfoTooltipMessage(NEW_CURRENTUSER_DATA_SUCCESS);
        setIsResponseSuccessful(true);
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setIsResponseSuccessful(false);
        console.log(err);
      })
      .finally(() => {
        setIsSuccessMessageShowing(true);
        setIsPreloaderShowing(false);
      });
  }

  const isMoviesDownloaded = useCallback(() => {
    const localMovies = localStorage.getItem("localMovies");
    if (localMovies) {
      setDownloadedMovies(JSON.parse(localMovies));
    } else {
      handleGetMovies();
    }
  }, []);

  function filterSavedMovies(movies) {
    const myId = currentUser._id;
    const myMovies = movies.filter((movie) => {
      const { owner = '' } = movie;
      return myId === owner;
    });
    return myMovies;
  }

  function handleGetMovies() {
    moviesApi
      .getMovies()
      .then((moviesList) => {
        const formattedMovies = moviesList.map((movie) => {
          return {
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: SERVER_IMAGE_URL + movie.image.url,
            trailer: movie.trailerLink,
            thumbnail: SERVER_IMAGE_URL + movie.image.formats.thumbnail.url,
            movieId: movie.id,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
          };
        });
        localStorage.setItem("localMovies", JSON.stringify(formattedMovies));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        const localMovies = localStorage.getItem("localMovies");
        setDownloadedMovies(JSON.parse(localMovies));
      });
  }

  function handleSearchByQuery(data, searchQuery) {
    const searchResult = data.filter((movie) => {
      return movie.nameRU
        .toLocaleLowerCase()
        .includes(searchQuery.toLocaleLowerCase());
    });
    if (!isMoviesShort) {
      return searchResult;
    } else {
      return filterShortMovies(searchResult);
    }
  }

  function filterShortMovies(movies) {
    return movies.filter((movie) => {
      return movie.duration <= SHORT_DURATION;
    });
  }

  function handleGetSavedMovies() {
    setIsPreloaderShowing(true);
    mainApi
      .getSavedMovies()
      .then((movies) => {
        setSavedMovies(
          movies.data
            .slice()
            .reverse()
            .filter((item) => item.owner === currentUser._id)
        );
      })
      mainApi
      .getSavedMovies()
      .then((data) => {
        return filterSavedMovies(data.data);
      })
      .then((myMovies) => {
        setSavedMovies(myMovies);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsPreloaderShowing(false);
      });
  }

  function handleSaveMovie(movie) {
    mainApi
      .setSavedMovie(movie)
      .then((savedMovie) => {
        setSavedMovies([savedMovie.data, ...savedMovies]);
      })
      mainApi
      .getSavedMovies()
      .then((data) => {
        return filterSavedMovies(data.data);
      })
      .then((myMovies) => {
        setSavedMovies(myMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteMovie(movie) {
    const savedMovie = savedMovies.find(
      (item) => item.movieId === movie.movieId
    );
    mainApi
      .deleteSavedMovie(savedMovie)
      .then(() => {
        const tempSavedMovies = savedMovies.filter(
          (item) => item._id !== savedMovie._id
        );
        setSavedMovies(tempSavedMovies);
      });
      mainApi
            .getSavedMovies()
            .then((data) => {
              return filterSavedMovies(data.data);
            })
            .then((myMovies) => {
              setSavedMovies(myMovies);
            })
      .catch((err) => {
        console.log(err);
      });
  }

  function checkIsMovieSaved(movie) {
    const isSaved = savedMovies.some((item) => item.movieId === movie.movieId);
    return isSaved;
  }

  function handleMarkedMovie(movie) {
    const isSaved = checkIsMovieSaved(movie);
    if (!isSaved) {
      handleSaveMovie(movie);
    } else {
      handleDeleteMovie(movie);
    }
  }

  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
  }

  function clearInfoTooltip() {
    setInfoTooltipMessage("");
    setIsResponseSuccessful();
  }

  useEffect(() => {
    if (currentUser) {
      setIsPreloaderShowing(true);
      mainApi
        .getSavedMovies()
        .then((data) => {
          setSavedMovies(filterSavedMovies(data.data));
          setIsPreloaderShowing(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    if (isLoggedIn) {
      handleGetSavedMovies();
     //filterSavedMovies();
      isMoviesDownloaded();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  useEffect(() => {
    handleCheckToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Header place="landing" email={email} isLoggedIn={isLoggedIn} />
            <Main />
          </Route>

          <Route path="/signup">
            <Register
              onSubmit={handleRegister}
              isPreloaderShowing={isPreloaderShowing}
            />
          </Route>
          <Route path="/signin">
            <Login
              onSubmit={handleLogin}
              isPreloaderShowing={isPreloaderShowing}
            />
          </Route>
          <ProtectedRoute
            path="/profile"
            redirectTo="/profile"
            isLoggedIn={isLoggedIn}
          >
            <Header place="profile" isLoggedIn={isLoggedIn} />
            <Profile
              onLogout={handleLogout}
              onUpdate={handleUpdateUser}
              isSuccessMessageShowing={isSuccessMessageShowing}
              setIsSuccessMessageShowing={setIsSuccessMessageShowing}
            />
          </ProtectedRoute>

          <ProtectedRoute 
            path="/movies"
            redirectTo='/movies'
            isLoggedIn={isLoggedIn}>
            <Header place="movies" isLoggedIn={isLoggedIn} />
            <Movies
              isPreloaderShowing={isPreloaderShowing}
              setIsPreloaderShowing={setIsPreloaderShowing}
              handleSearchByQuery={handleSearchByQuery}
              downloadedMovies={downloadedMovies}
              isMoviesShort={isMoviesShort}
              setIsMoviesShort={setIsMoviesShort}
              filterShortMovies={filterShortMovies}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
              handleMarkedMovie={handleMarkedMovie}
              savedMovies={savedMovies}
              checkIsMovieSaved={checkIsMovieSaved}
              
            />
          </ProtectedRoute>

          <ProtectedRoute 
            path="/saved-movies"
            redirectTo='/saved-movies' 
            isLoggedIn={isLoggedIn}>
            <Header place="saved-movies" isLoggedIn={isLoggedIn} />
            <SavedMovies
              isPreloaderShowing={isPreloaderShowing}
              setIsPreloaderShowing={setIsPreloaderShowing}
              handleSearchByQuery={handleSearchByQuery}
              downloadedMovies={downloadedMovies}
              isMoviesShort={isMoviesShort}
              setIsMoviesShort={setIsMoviesShort}
              filterShortMovies={filterShortMovies}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
              handleMarkedMovie={handleMarkedMovie}
              savedMovies={savedMovies}
              checkIsMovieSaved={checkIsMovieSaved}
              
            />
          </ProtectedRoute>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        {useRouteMatch(EXIST_FOOTER_FOR_PAGE) ? null : <Footer />}
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isSuccessful={isResponseSuccessful}
          onClose={closeInfoTooltip}
          message={infoTooltipMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
