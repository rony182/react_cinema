import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import "./FormStyle.css";

const FunctionForm = ({
  movie,
  addFunction,
  updateFunction,
  editingFunction,
  setEditingFunction,
}) => {
  const [formValues, setFormValues] = useState({
    date: "",
    scheduleHour: "",
    price: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingFunction) {
      setFormValues({
        date: editingFunction.date,
        scheduleHour: editingFunction.scheduleHour,
        price: editingFunction.price,
      });
    } else {
      setFormValues({
        date: "",
        scheduleHour: "",
        price: "",
      });
    }
  }, [editingFunction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const selectedDate = new Date(formValues.date);
    const maxDate = new Date();
    maxDate.setDate(currentDate.getDate() + 14);

    if (
      selectedDate < currentDate.setHours(0, 0, 0, 0) ||
      selectedDate > maxDate.setHours(23, 59, 59, 999)
    ) {
      setError("Date must be within today and two weeks from now.");
      return;
    }

    const formattedDate = formValues.date;

    if (editingFunction) {
      updateFunction({
        ...formValues,
        date: formattedDate,
        director: movie.directorId,
      });
    } else {
      addFunction({
        ...formValues,
        date: formattedDate,
        director: movie.directorId,
      });
    }
    setFormValues({
      date: "",
      scheduleHour: "",
      price: "",
    });
    setEditingFunction(null);
    setError("");
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 14);
    return maxDate.toISOString().split("T")[0];
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        <Col md={4}>
          <Form.Group controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formValues.date}
              min={getCurrentDate()}
              max={getMaxDate()}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="formScheduleHour">
            <Form.Label>Schedule Hour</Form.Label>
            <Form.Control
              type="time"
              name="scheduleHour"
              value={formValues.scheduleHour}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formValues.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <div className="form-submit-button">
        <Button variant="primary" type="submit" alt="Save">
          {editingFunction ? "Update Function" : "Add Function"}
        </Button>
        {editingFunction && (
          <Button
            alt="Cancel"
            variant="secondary"
            onClick={() => setEditingFunction(null)}
            className="ml-2"
          >
            Cancel
          </Button>
        )}
      </div>
    </Form>
  );
};

export default FunctionForm;
