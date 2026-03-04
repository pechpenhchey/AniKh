import React from "react";
import { Row, Col } from "react-bootstrap";
import Section from "./section";
import MediaCard from "../../../shared/components/layout/Card";

const extractRecommendations = (recs) => {
  if (!Array.isArray(recs)) return [];
  return recs.map((r) => ({
    mal_id: r.entry?.mal_id,
    title: r.entry?.title ?? "Unknown",
    image_url:
      r.entry?.images?.jpg?.large_image_url ||
      r.entry?.images?.jpg?.image_url ||
      null,
  }));
};

const AnimeRecommendations = ({ recommendations, loading }) => {
  const flat = extractRecommendations(recommendations);

  return (
    <Section
      title="Recommendations"
      loading={loading}
      empty={flat.length === 0}
    >
      <Row xs={2} sm={3} md={4} lg={6} className="g-2 g-sm-3">
        {flat.slice(0, 12).map((r) => (
          <Col key={r.mal_id}>
            <MediaCard
              item={r}
              imageKey="image_url"
              titleKey="title"
              detailPath="anime"
            />
          </Col>
        ))}
      </Row>
    </Section>
  );
};

export default AnimeRecommendations;