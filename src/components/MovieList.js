import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import moviesData from "../data/movies.json";

const MovieList = ({ onSelectMovie }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(moviesData);
  }, []);

  return (
    <div className="container mt-3">
      <div className="row">
        {movies.map((movie) => (
          <div className="col-md-4" key={movie.id}>
            <MovieCard movie={movie} onSelect={onSelectMovie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
