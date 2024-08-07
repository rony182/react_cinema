import React from "react";
import { Card, Button } from "react-bootstrap";

const MovieCard = ({ movie, onSelect }) => {
  return (
    <Card className="mb-3">
      <Card.Body className="text-center">
        <Card.Title>{movie.name}</Card.Title>
        <Button className="mt-2" variant="primary" onClick={() => onSelect(movie)}>
          View Functions
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
