import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MediaCard from "./Card";
import "../../../styles/card.css";

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
      <div className="section-header">
        <h2 className="card-text-bg mb-0">{title}</h2>
        {onSeeMore && (
          <button className="section-see-more" onClick={onSeeMore}>
            See More →
          </button>
        )}
      </div>

      <Row>
        {loading
          ? skeletonArray.map((_, index) => (
              <Col key={index} xs={6} sm={4} md={3} lg={2} className="mb-4 media-col">
                <MediaCard loading {...cardProps} />
              </Col>
            ))
          : limitedItems.map((item, index) => (
              <Col key={`${item?.mal_id}-${index}`} xs={6} sm={4} md={3} lg={2} className="mb-4 media-col">
                <MediaCard item={item} toDetail={clickable} {...cardProps} />
              </Col>
            ))}
      </Row>
    </Container>
  );
};

export default MediaSection;