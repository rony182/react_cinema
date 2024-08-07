import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";
import MovieList from "./components/MovieList";
import FunctionList from "./components/FunctionList";
import directorsData from "./data/directors.json";
import moviesData from "./data/movies.json";

function App() {
  const [functions, setFunctions] = useState({});
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(moviesData);
  }, []);

  const addFunction = (movieId, newFunction) => {
    setFunctions((prevFunctions) => ({
      ...prevFunctions,
      [movieId]: [...(prevFunctions[movieId] || []), newFunction],
    }));
  };

  const updateFunction = (movieId, updatedFunction) => {
    setFunctions((prevFunctions) => ({
      ...prevFunctions,
      [movieId]: prevFunctions[movieId].map((func) =>
        func.date === updatedFunction.date &&
        func.scheduleHour === updatedFunction.scheduleHour
          ? updatedFunction
          : func
      ),
    }));
  };

  const deleteFunction = (movieId, funcToDelete) => {
    setFunctions((prevFunctions) => ({
      ...prevFunctions,
      [movieId]: prevFunctions[movieId].filter(
        (func) =>
          !(
            func.date === funcToDelete.date &&
            func.scheduleHour === funcToDelete.scheduleHour
          )
      ),
    }));
  };

  const handleBack = (navigate) => {
    navigate("/");
  };

  const getSelectedMovie = (id) => {
    return movies.find((movie) => movie.id === parseInt(id));
  };

  const RenderFunctionList = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const selectedMovie = getSelectedMovie(id);
    return selectedMovie ? (
      <FunctionList
        movie={selectedMovie}
        directors={directorsData}
        functions={functions[selectedMovie.id] || []}
        allFunctions={functions}
        onBack={() => handleBack(navigate)}
        addFunction={addFunction}
        updateFunction={updateFunction}
        deleteFunction={deleteFunction}
      />
    ) : (
      <Navigate to="/" />
    );
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MovieList movies={movies} />} />
          <Route path="/movie/:id" element={<RenderFunctionList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
