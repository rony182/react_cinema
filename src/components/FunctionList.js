import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table, Button, Alert, Modal } from "react-bootstrap";
import FunctionForm from "./FunctionForm";
import {
  fetchFunctions,
  addFunction,
  updateFunction,
  deleteFunction,
  fetchDirectorByMovieId,
} from "../Services/apiService";

const FunctionList = ({ getMovieById }) => {
  const [functions, setFunctions] = useState([]);
  const [director, setDirector] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [functionToDelete, setFunctionToDelete] = useState(null);
  const [editingFunction, setEditingFunction] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = getMovieById(id);

  useEffect(() => {
    const loadFunctionsAndDirector = async () => {
      try {
        setError("");
        const [functionsResponse, directorResponse] = await Promise.all([
          fetchFunctions(id),
          fetchDirectorByMovieId(id),
        ]);
        setFunctions(functionsResponse.data);
        setDirector(directorResponse.data);
      } catch (error) {
        setError("Error loading functions or director.");
      }
    };

    loadFunctionsAndDirector();
  }, [id]);

  const handleAddFunction = async (newFunction) => {
    try {
      const response = await addFunction(newFunction);
      setFunctions((prevFunctions) => [...prevFunctions, response.data]);
      setError("");
      setSuccess("Function added successfully.");
    } catch (error) {
      setError("Error adding function.");
    }
  };

  const handleUpdateFunction = async (updatedFunction) => {
    try {
      await updateFunction(updatedFunction.id, updatedFunction);

      const functionWithId = { ...updatedFunction };

      setFunctions((prevFunctions) =>
        prevFunctions.map((func) =>
          func.id === functionWithId.id ? functionWithId : func
        )
      );

      setEditingFunction(null);
      setError("");
      setSuccess("Function updated successfully.");
    } catch (error) {
      setError("Error updating function.");
    }
  };

  const handleDeleteFunction = async () => {
    try {
      await deleteFunction(functionToDelete.id);
      setFunctions((prevFunctions) =>
        prevFunctions.filter((func) => func.id !== functionToDelete.id)
      );
      setSuccess("Function deleted successfully.");
      setShowModal(false);
      setFunctionToDelete(null);
    } catch (error) {
      setError("Error deleting function.");
    }
  };

  return (
    <div className="container mt-3 mb-3 text-center">
      <Button
        variant="secondary"
        onClick={() => navigate("/")}
        className="mb-3"
      >
        Back to Movies
      </Button>
      <h2>{movie.title} Functions</h2>
      {director && <h4 className="text-muted">Directed by: {director.name}</h4>}
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
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {functions.map((func, index) => (
              <tr key={index}>
                <td>{func.date ? func.date : func.Date}</td>
                <td>
                  {func.scheduleHour ? func.scheduleHour : func.ScheduleHour}
                </td>
                <td>{func.price ? func.price : func.Price}</td>
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
                    onClick={() => {
                      setShowModal(true);
                      setFunctionToDelete(func);
                    }}
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
          <Button variant="danger" onClick={handleDeleteFunction}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FunctionList;
