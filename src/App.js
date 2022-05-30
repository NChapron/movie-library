import React, { useState, useEffect } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";
import useHttp from "./hooks/use-http";

function App() {
  const [movies, setMovies] = useState([]);

  const { isLoading, error, sendRequest: fetchMovies } = useHttp();

  useEffect(() => {
    const transformMovies = (moviesObj) => {
      const loadedMovies = [];

      for (const key in moviesObj) {
        loadedMovies.push({
          id: key,
          title: moviesObj[key].title,
          openingText: moviesObj[key].openingText,
          releaseDate: moviesObj[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
      console.log(loadedMovies);
    };

    fetchMovies(
      {
        url: "https://react-http-1330c-default-rtdb.europe-west1.firebasedatabase.app/movies.json",
      },
      transformMovies
    );
  }, [fetchMovies]);

  const onAddMovieHandler = (movie) => {
    setMovies((prevMovies) => prevMovies.concat(movie));
  };

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={onAddMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
