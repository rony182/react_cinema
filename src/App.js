import React, { useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import FunctionList from "./components/FunctionList";
import directorsData from "./data/directors.json";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [functions, setFunctions] = useState({});

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

  return (
    <div className="App">
      {!selectedMovie && <MovieList onSelectMovie={setSelectedMovie} />}
      {selectedMovie && (
        <FunctionList
          movie={selectedMovie}
          directors={directorsData}
          functions={functions[selectedMovie.id] || []}
          allFunctions={functions}
          onBack={() => setSelectedMovie(null)}
          addFunction={addFunction}
          updateFunction={updateFunction}
          deleteFunction={deleteFunction}
        />
      )}
    </div>
  );
}

export default App;
