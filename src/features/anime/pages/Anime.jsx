import React, { useEffect, useState } from "react";
import Banner from "../banner";
import TotalAnime from "../totalAnime";

const Anime = () => {

  return (
    <div>
      <Banner />

      <div className="py-3">
        <TotalAnime />

      </div>
    </div>
  );
};

export default Anime;