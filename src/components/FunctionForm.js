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
    Date: "",
    ScheduleHour: "",
    Price: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingFunction) {
      setFormValues({
        Date: editingFunction.date || "",
        ScheduleHour: editingFunction.scheduleHour || "",
        Price: editingFunction.price !== undefined ? editingFunction.price : "",
      });
    } else {
      resetForm();
    }
  }, [editingFunction]);

  const resetForm = () => {
    setFormValues({
      Date: "",
      ScheduleHour: "",
      Price: "",
    });
  };

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
    const selectedDate = new Date(formValues.Date);
    const maxDate = new Date();
    maxDate.setDate(currentDate.getDate() + 14);

    if (
      selectedDate < currentDate.setHours(0, 0, 0, 0) ||
      selectedDate > maxDate.setHours(23, 59, 59, 999)
    ) {
      setError("Date must be within today and two weeks from now.");
      return;
    }

    if (!formValues.ScheduleHour || formValues.ScheduleHour === "00:00:00") {
      setError("Please select a valid schedule hour.");
      return;
    }

    if (parseFloat(formValues.Price) <= 0) {
      setError("Price must be greater than zero.");
      return;
    }

    const functionData = {
      id: editingFunction ? editingFunction.id : null,
      Date: formValues.Date,
      ScheduleHour:
        formValues.ScheduleHour.length === 5
          ? `${formValues.ScheduleHour}:00`
          : formValues.ScheduleHour,
      Price: parseFloat(formValues.Price),
      MovieId: movie.id,
    };

    if (editingFunction) {
      if (editingFunction.id) {
        updateFunction(functionData);
      } else {
        console.error("Function ID is undefined");
      }
    } else {
      addFunction(functionData);
    }

    resetForm();
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
      <Row>
        <Col md={4}>
          <Form.Group controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="Date"
              value={formValues.Date}
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
              name="ScheduleHour"
              value={formValues.ScheduleHour}
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
              name="Price"
              value={formValues.Price}
              onChange={handleChange}
              required
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </Form.Group>
        </Col>
      </Row>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="form-submit-button gap-1">
        <Button variant="primary" type="submit" alt="Save">
          {editingFunction ? "Update Function" : "Add Function"}
        </Button>
        {editingFunction && (
          <Button
            alt="Cancel"
            variant="secondary"
            onClick={() => {
              resetForm();
              setEditingFunction(null);
            }}
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
