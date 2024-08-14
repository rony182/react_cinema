import React from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";

const MovieList = ({ movies }) => {
  const navigate = useNavigate();

  const handleSelectMovie = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="container mt-3">
      <div className="row">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div className="col-md-4" key={movie.id}>
              <MovieCard
                movie={movie}
                onSelect={() => handleSelectMovie(movie.id)}
              />
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center">No movies available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieList;
