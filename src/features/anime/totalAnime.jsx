import React, { useEffect } from "react";
import MediaSection from "../../shared/components/layout/CardSection";
import { useTotalAnimeStore } from "../../app/api/anime/total/slice";

const TotalAnime = ({ page = 1, onPageChange, topRef }) => {
  const { totalAnimeList, lastPage, fetchPage, loading, error } =
    useTotalAnimeStore();

  useEffect(() => {
    fetchPage(page).then(() => {
      if (page > 1 && topRef?.current) {
        window.scrollTo({ top: topRef.current.offsetTop - 80, behavior: "smooth" });
      }
    });
  }, [page]);

  const goToPage = (val) => {
    let p = Number(val);
    if (!p || p < 1) p = 1;
    if (p > lastPage) p = lastPage;
    if (p !== page) onPageChange?.(p);
  };

  return (
    <div className="py-3 mb-3">
      <MediaSection
        title={"All Anime - Page " + page}
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
          onClick={() => goToPage(page - 1)}
          disabled={page === 1 || loading}
        >
          Prev
        </button>

        <div className="d-flex align-items-center gap-2">
          <input
            type="number"
            className="anime-page-input"
            min={1}
            max={lastPage}
            value={page}
            onChange={(e) => goToPage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && goToPage(e.target.value)}
          />
          <span style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", whiteSpace: "nowrap" }}>
            of {lastPage}
          </span>
        </div>

        <button
          className="btn-anime-page"
          onClick={() => goToPage(page + 1)}
          disabled={page === lastPage || loading}
        >
          Next
        </button>
      </div>

      {error && <p className="text-center text-danger mt-3">{error}</p>}
    </div>
  );
};

export default TotalAnime;