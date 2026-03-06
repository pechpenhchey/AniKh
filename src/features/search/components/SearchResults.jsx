import React, { useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MediaCard from "../../../shared/components/layout/Card";
import {
  searchAnimeCardProps, searchMangaCardProps, SEARCH_TABS,
  ANIME_TYPES, ANIME_STATUS, ANIME_SORT, SORT_ORDER
} from "./searchConfig";
import "../styles/search.css";

const getPages = (current, total) => {
  const pages = new Set();
  pages.add(1);
  if (current > 1 && current < total) {
    if (current - 1 > 1) pages.add(current - 1);
    pages.add(current);
    if (current + 1 < total) pages.add(current + 1);
  }
  pages.add(total);
  return [...pages];
};

const FilterSelect = ({ label, value, options, onChange }) => (
  <div className="search-filter-group">
    <label className="search-filter-label">{label}</label>
    <select
      className="search-filter-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  </div>
);

const SearchResults = ({
  query, tab, page, type, status, orderBy, sort,
  data, loading, error, totalPages,
  setTab, setPage, setType, setStatus, setOrderBy, setSort,
}) => {
  const cardProps = tab === "anime" ? searchAnimeCardProps : searchMangaCardProps;
  const skeletons = Array.from({ length: 10 });
  const topRef = useRef(null);

  useEffect(() => {
    if (topRef.current) {
      window.scrollTo({ top: topRef.current.offsetTop - 80, behavior: "smooth" });
    }
  }, [page]);

  const goToPage = (val) => {
    let p = Number(val);
    if (!p || p < 1) p = 1;
    if (p > totalPages) p = totalPages;
    setPage(p);
  };

  return (
    <div className="search-page" ref={topRef}>
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

        {/* Filters — anime only */}
        {tab === "anime" && (
          <div className="search-filters">
            <FilterSelect label="Type"    value={type}    options={ANIME_TYPES}  onChange={setType} />
            <FilterSelect label="Status"  value={status}  options={ANIME_STATUS} onChange={setStatus} />
            <FilterSelect label="Sort by" value={orderBy} options={ANIME_SORT}   onChange={setOrderBy} />
            <FilterSelect label="Order"   value={sort}    options={SORT_ORDER}   onChange={setSort} />
          </div>
        )}

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
          <div className="pagination-wrap">
            <button
              className="page-btn"
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
            >
              ← Prev
            </button>

            {getPages(page, totalPages).map((p) =>
              p === page ? (
                <input
                  key="current"
                  type="number"
                  className="page-input"
                  defaultValue={page}
                  min={1}
                  max={totalPages}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      goToPage(e.target.value);
                      e.target.blur();
                    }
                  }}
                  onBlur={(e) => goToPage(e.target.value)}
                />
              ) : (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className="page-btn"
                >
                  {p}
                </button>
              )
            )}

            <button
              className="page-btn"
              onClick={() => goToPage(page + 1)}
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