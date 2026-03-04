import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MediaCard from "../../../shared/components/layout/Card";
import { searchAnimeCardProps, searchMangaCardProps, SEARCH_TABS } from "./searchConfig";
import "../styles/search.css";

const SearchResults = ({ query, tab, page, data, loading, error, totalPages, setTab, setPage }) => {
  const cardProps = tab === "anime" ? searchAnimeCardProps : searchMangaCardProps;
  const skeletons = Array.from({ length: 10 });

  return (
    <div className="search-page">
      <Container>

        {/* Header */}
        <div className="search-header">
          <div>
            <h2 className="search-title">
              {query ? <>Results for <span>"{query}"</span></> : "Search"}
            </h2>
            {!loading && data.length > 0 && (
              <p className="search-count">Page {page} of {totalPages}</p>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="search-tabs">
          {SEARCH_TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`search-tab ${tab === t ? "active" : ""}`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="search-empty">
            <p>Something went wrong. Please try again.</p>
          </div>
        )}

        {/* No query */}
        {!query && (
          <div className="search-empty">
            <p>Type something to search for anime or manga.</p>
          </div>
        )}

        {/* Empty results */}
        {!loading && !error && query && data.length === 0 && (
          <div className="search-empty">
            <p>No results found for <span>"{query}"</span></p>
          </div>
        )}

        {/* Results */}
        {(loading || data.length > 0) && (
          <Row className="g-3">
            {loading
              ? skeletons.map((_, i) => (
                  <Col key={i} xs={6} sm={4} md={3} lg={2}>
                    <MediaCard loading />
                  </Col>
                ))
              : data.map((item, index) => (
                  <Col key={`${item?.mal_id}-${index}`} xs={6} sm={4} md={3} lg={2}>
                    <MediaCard item={item} {...cardProps} />
                  </Col>
                ))}
          </Row>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="search-pagination">
            <button
              className="search-page-btn"
              onClick={() => setPage(Math.max(1, page - 1))}
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
                  <span key={`e-${i}`} className="search-ellipsis">…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`search-page-btn ${page === p ? "active" : ""}`}
                  >
                    {p}
                  </button>
                )
              )}

            <button
              className="search-page-btn"
              onClick={() => setPage(Math.min(totalPages, page + 1))}
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

export default SearchResults;