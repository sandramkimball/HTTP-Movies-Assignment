import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from './Movies/UpdateForm';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([])

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />

      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} updateMovies={setMovies} />;
        }}
      />

      <Route
        path='/api/movies/:id' render={props=> (
        <UpdateForm {...props} movies={movies} updateMovies={setMovies}/> 
        )} 
      />

    </>
  );
};

export default App;
