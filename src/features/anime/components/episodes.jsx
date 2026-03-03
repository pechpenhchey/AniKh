import React from "react";
import Section from "./section";

const AnimeEpisodes = ({
  id,
  episodes,
  loading,
  episodeHasNextPage,
  loadingMoreEpisodes,
  loadMoreEpisodes,
}) => {
  const list = Array.isArray(episodes) ? episodes : [];

  return (
    <Section
      title={`Episodes (${list.length})`}
      loading={loading}
      empty={list.length === 0}
    >

      <div className="ep-list">
        {list.map((ep) => {
          const title = ep.title ?? ep.title_romanji ?? "—";
          const aired = ep.aired
            ? new Date(ep.aired).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : null;

          return (
            <div key={ep.mal_id} className="ep-row">
              <div className="ep-num">{ep.mal_id}</div>
              <div className="ep-body">
                <div className="ep-title">{title}</div>
                <div className="ep-meta">
                  {aired && <span className="ep-aired">{aired}</span>}
                  {ep.filler && <span className="ep-tag ep-tag-filler">Filler</span>}
                  {ep.recap && <span className="ep-tag ep-tag-recap">Recap</span>}
                </div>
              </div>
              {ep.score ? (
                <div className="ep-score">⭐ {ep.score}</div>
              ) : null}
            </div>
          );
        })}
      </div>

      {episodeHasNextPage && (
        <div className="text-center mt-4">
          <button
            className="load-more-btn"
            onClick={() => loadMoreEpisodes(id)}
            disabled={loadingMoreEpisodes}
          >
            {loadingMoreEpisodes ? "Loading..." : "Load More Episodes"}
          </button>
        </div>
      )}
    </Section>
  );
};

export default AnimeEpisodes;
