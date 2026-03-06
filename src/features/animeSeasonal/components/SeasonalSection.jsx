import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MediaCard from "../../../shared/components/layout/Card";
import "../styles/Seasonal.css";

const PER_PAGE = 25;

const cardProps = {
  detailPath: "anime",
  imageKey: "images.jpg.large_image_url",
  titleKey: "title_english",
  scoreKey: "score",
  statusKey: "status",
  episodeKey: "episodes",
};

const getCurrentSeason = () => {
  const month = new Date().getMonth();
  if (month < 3) return "Winter";
  if (month < 6) return "Spring";
  if (month < 9) return "Summer";
  return "Fall";
};

const SeasonalSection = ({ seasonalAnime, loading, error }) => {
  const [page, setPage] = useState(1);
  const skeletons = Array.from({ length: 10 });

  const totalPages = Math.ceil(seasonalAnime.length / PER_PAGE);
  const paginated = seasonalAnime.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="seasonal-page">
      <Container>

        {/* Header */}
        <div className="seasonal-header">
          <div>
            <h2 className="seasonal-title">
              🌸 {getCurrentSeason()} {new Date().getFullYear()}
            </h2>
            <span className="seasonal-subtitle">
              Currently airing this season
            </span>
          </div>
          {!loading && seasonalAnime.length > 0 && (
            <span className="seasonal-count">
              {seasonalAnime.length} titles
            </span>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="seasonal-empty">
            <p>Something went wrong. Please try again.</p>
          </div>
        )}

        {/* Results */}
        <Row className="g-3">
          {loading
            ? skeletons.map((_, i) => (
                <Col key={i} xs={6} sm={4} md={3} lg={2}>
                  <MediaCard loading />
                </Col>
              ))
            : paginated.map((item, index) => (
                <Col key={`${item?.mal_id}-${index}`} xs={6} sm={4} md={3} lg={2}>
                  <MediaCard item={item} {...cardProps} />
                </Col>
              ))}
        </Row>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="seasonal-pagination">
            <button
              className="seasonal-page-btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .reduce((acc, p, idx, arr) => {
                if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "..." ? (
                  <span key={`e-${i}`} className="seasonal-ellipsis">…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`seasonal-page-btn ${page === p ? "active" : ""}`}
                  >
                    {p}
                  </button>
                )
              )}

            <button
              className="seasonal-page-btn"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next →
            </button>
          </div>
        )}

      </Container>
    </div>
  );
};

export default SeasonalSection;