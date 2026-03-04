import React, { useEffect, useRef, useState } from "react";
import MediaSection from "../../shared/components/layout/CardSection";
import { useTotalAnimeStore } from "../../app/api/anime/total/slice";

const TotalAnime = () => {
  const { totalAnimeList, currentPage, lastPage, fetchPage, loading, error } =
    useTotalAnimeStore();

  const [inputPage, setInputPage] = useState(currentPage);
  const topRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    fetchPage(currentPage);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setInputPage(currentPage);
    if (topRef.current) {
      window.scrollTo({ top: topRef.current.offsetTop - 80, behavior: "smooth" });
    }
  }, [currentPage]);

  const goToPage = (page) => {
    let val = Number(page);
    if (!val || val < 1) val = 1;
    if (val > lastPage) val = lastPage;
    if (val !== currentPage) fetchPage(val);
  };

  return (
    <div className="py-3">
      <div ref={topRef} />

      <MediaSection
        title={"All Anime - Page " + currentPage}
        items={totalAnimeList}
        loading={loading}
        limit={30}
        cardProps={{
          detailPath: "anime",
          imageKey: "images.jpg.large_image_url",
          titleKey: "title_english",
          scoreKey: "score",
          statusKey: "status",
          episodeKey: "episodes",
        }}
      />

      <div className="d-flex justify-content-center gap-3 mt-4 align-items-center">
        <button
          className="btn-anime-page"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1 || loading}
        >
          Prev
        </button>

        <div className="d-flex align-items-center gap-2">
          <input
            type="number"
            className="anime-page-input"
            min={1}
            max={lastPage}
            value={inputPage}
            onChange={(e) => setInputPage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && goToPage(inputPage)}
            onBlur={() => goToPage(inputPage)}
          />
          <span style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", whiteSpace: "nowrap" }}>
            of {lastPage}
          </span>
        </div>

        <button
          className="btn-anime-page"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === lastPage || loading}
        >
          Next
        </button>
      </div>

      {error && <p className="text-center text-danger mt-3">{error}</p>}
    </div>
  );
};

export default TotalAnime;