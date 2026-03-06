import React, { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Banner from "../banner";
import TotalAnime from "../totalAnime";

const Anime = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const totalAnimeRef = useRef(null);

  const page = parseInt(searchParams.get("page") || "1");

  const handlePageChange = (p) => {
    setSearchParams({ page: p });
  };

  return (
    <div>
      <Banner />
      <div className="py-3" ref={totalAnimeRef}>
        <TotalAnime page={page} onPageChange={handlePageChange} topRef={totalAnimeRef} />
      </div>
    </div>
  );
};

export default Anime;