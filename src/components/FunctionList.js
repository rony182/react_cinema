import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Alert, Modal } from "react-bootstrap";
import FunctionForm from "./FunctionForm";

const FunctionList = ({
  movie,
  directors,
  functions,
  addFunction,
  updateFunction,
  deleteFunction,
  allFunctions,
}) => {
  const [editingFunction, setEditingFunction] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [functionToDelete, setFunctionToDelete] = useState(null);
  const navigate = useNavigate();

  const handleAddFunction = (newFunction) => {
    const formattedDate = newFunction.date;

    const directorDayFunctionsCount = functions.filter(
      (func) =>
        func.director === newFunction.director && func.date === formattedDate
    ).length;

    const internationalDayFunctionsCount = Object.values(allFunctions)
      .flat()
      .filter(
        (func) => func.date === formattedDate && func.type === "international"
      ).length;

    if (directorDayFunctionsCount >= 10) {
      setError(
        "Cannot add more than 10 functions for this director on the same day."
      );
      return;
    }

    if (movie.type === "international" && internationalDayFunctionsCount >= 8) {
      setError(
        "Cannot add more than 8 international functions on the same day."
      );
      return;
    }

    addFunction(movie.id, newFunction);
    setError("");
  };

  const handleUpdateFunction = (updatedFunction) => {
    updateFunction(movie.id, updatedFunction);
    setEditingFunction(null);
  };

  const handleDeleteFunction = (funcToDelete) => {
    setShowModal(true);
    setFunctionToDelete(funcToDelete);
  };

  const confirmDeleteFunction = () => {
    deleteFunction(movie.id, functionToDelete);
    setSuccess("Function deleted successfully.");
    setShowModal(false);
    setFunctionToDelete(null);
  };

  const getDirectorName = (id) => {
    const director = directors.find((director) => director.id === id);
    return director ? director.name : "Unknown";
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="container mt-3 mb-3 text-center">
      <Button variant="secondary" onClick={handleBack} className="mb-3">
        Back to Movies
      </Button>
      <h2>{movie.name} Functions</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      {functions.length === 0 ? (
        <Alert variant="info">No functions listed for this movie.</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Schedule Hour</th>
              <th>Director</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {functions.map((func, index) => (
              <tr key={index}>
                <td>{func.date}</td>
                <td>{func.scheduleHour}</td>
                <td>{getDirectorName(func.director)}</td>
                <td>{func.price}</td>
                <td className="d-flex gap-1 justify-content-center">
                  <Button
                    variant="warning"
                    className="mr-2"
                    onClick={() => setEditingFunction(func)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteFunction(func)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <FunctionForm
        movie={movie}
        addFunction={handleAddFunction}
        updateFunction={handleUpdateFunction}
        editingFunction={editingFunction}
        setEditingFunction={setEditingFunction}
      />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this function?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteFunction}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FunctionList;
