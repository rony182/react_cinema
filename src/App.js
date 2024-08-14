import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieList from "./components/MovieList";
import FunctionList from "./components/FunctionList";
import { fetchMovies } from "./Services/apiService";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const moviesResponse = await fetchMovies();
        setMovies(moviesResponse.data);
      } catch (error) {
        console.error("Error loading movies:", error);
      }
    };

    loadMovies();
  }, []);

  const getMovieById = (id) => {
    return movies.find((movie) => movie.id === parseInt(id));
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MovieList movies={movies} />} />
          <Route
            path="/movie/:id"
            element={<FunctionList getMovieById={getMovieById} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
