import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ isMoviesShort, setIsMoviesShort, handleSearchByQuery, downloadedMovies,
  savedMovies, filterShortMovies, checkIsMovieSaved, handleSaveMovie, handleDeleteMovie, handleMarkedMovie,
  isPreloaderShowing, setIsPreloaderShowing }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [findedMovies, setFindedMovies] = useState([]);
  let location = useLocation();

  useEffect(() => {
    handleMoviesSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    setFindedMovies(savedMovies);
  }, [savedMovies]);

  function handleMoviesSearch() {
    if (searchQuery) {
      setFindedMovies(handleSearchByQuery(savedMovies, searchQuery));
      setTimeout(() => setIsPreloaderShowing(false), 1500);
    }
  }

  return (
    <main>
      <SearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isMoviesShort={isMoviesShort}
        setIsMoviesShort={setIsMoviesShort}
        setIsPreloaderShowing={setIsPreloaderShowing}
      />
      <MoviesCardList
        searchQuery={searchQuery}
        isMoviesShort={isMoviesShort}
        filterShortMovies={filterShortMovies}
        findedMovies={findedMovies}
        setFindedMovies={setFindedMovies}
        handleSearchByQuery={handleSearchByQuery}
        downloadedMovies={downloadedMovies}
        savedMovies={savedMovies}
        checkIsMovieSaved={checkIsMovieSaved}
        handleSaveMovie={handleSaveMovie}
        handleDeleteMovie={handleDeleteMovie}
        handleMarkedMovie={handleMarkedMovie}
        isPreloaderShowing={isPreloaderShowing}
        locationPathname={location.pathname}
      />
    </main>
  )
}
// eslint-disable-next-line no-restricted-globals
//window.setTimeout(()=>{location.reload(1)},30000)
export default SavedMovies;
