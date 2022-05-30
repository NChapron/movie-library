import React, { useRef } from "react";
import useHttp from "../hooks/use-http";

import classes from "./AddMovie.module.css";

function AddMovie(props) {
  const { isLoading, error, sendRequest: sendMovieRequest } = useHttp();
  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateRef = useRef("");

  function submitHandler(event) {
    event.preventDefault();

    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };

    addMovieHandler(movie);
  }

  const createMovie = (movie, movieData) => {
    console.log("onAdd movie", movieData);
    const generatedId = movieData.name;
    const createdMovie = {
      id: generatedId,
      ...movie,
    };
    console.log(createdMovie);
    props.onAddMovie(createdMovie);
  };

  const addMovieHandler = async (movie) => {
    const response = await sendMovieRequest(
      {
        url: "https://react-http-1330c-default-rtdb.europe-west1.firebasedatabase.app/movies.json",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: movie,
      },
      createMovie.bind(null, movie)
    );
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={titleRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="opening-text">Opening Text</label>
        <textarea rows="5" id="opening-text" ref={openingTextRef}></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor="date">Release Date</label>
        <input type="text" id="date" ref={releaseDateRef} />
      </div>
      <button>Add Movie</button>
    </form>
  );
}

export default AddMovie;
