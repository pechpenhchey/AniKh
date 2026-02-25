import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MediaCard from "./Card";

const MediaSection = ({
  title,
  items = [],
  loading = false,
  limit = 6,
  onSeeMore,
  cardProps = {}, // <-- new prop for mapping keys
}) => {
  const limitedItems = items.slice(0, limit);

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="card-text-bg mb-0">{title}</h2>
        <Button variant="outline-dark" onClick={onSeeMore}>
          See More →
        </Button>
      </div>

      <Row>
        {loading
          ? Array.from({ length: limit }).map((_, index) => (
              <Col key={index} lg={2} md={4} sm={6} xs={6} className="mb-4">
                <MediaCard loading {...cardProps} />
              </Col>
            ))
          : limitedItems.map((item) => (
              <Col key={item.mal_id} lg={2} md={4} sm={6} xs={6} className="mb-4">
                <MediaCard item={item} {...cardProps} />
              </Col>
            ))}
      </Row>
    </Container>
  );
};

export default MediaSection;