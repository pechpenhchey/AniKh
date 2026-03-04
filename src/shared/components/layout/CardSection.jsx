import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MediaCard from "./Card";

const MediaSection = ({
  title,
  items = [],
  loading = false,
  limit = 5,
  onSeeMore,
  cardProps = {},
  clickable = true,
}) => {
  const limitedItems = items.slice(0, limit);

  const skeletonArray = Array.from({ length: limit });

  return (
    <Container className="my-5">
      {/* Section Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="card-text-bg mb-0">{title}</h2>
        {onSeeMore && (
          <Button variant="outline-dark" onClick={onSeeMore}>
            See More →
          </Button>
        )}
      </div>

      <Row>
        {loading
          ? skeletonArray.map((_, index) => (
              <Col
                key={index}
                xs={6}
                sm={4}
                md={3}
                lg={2}
                className="mb-4 media-col"
              >
                <MediaCard loading {...cardProps} />
              </Col>
            ))
          : limitedItems.map((item, index) => (
              <Col
                key={`${item?.mal_id}-${index}`}
                xs={6}
                sm={4}
                md={3}
                lg={2}
                className="mb-4 media-col"
              >
                <MediaCard item={item} toDetail={clickable} {...cardProps} />
              </Col>
            ))}
      </Row>
    </Container>
  );
};

export default MediaSection;