import React from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";

const MovieList = ({ movies }) => {
  const navigate = useNavigate();

  const handleSelectMovie = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="container mt-3">
      <div className="row">
        {movies.map((movie) => (
          <div className="col-md-4" key={movie.id}>
            <MovieCard movie={movie} onSelect={() => handleSelectMovie(movie)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
