import React from "react";
import useSeasonalData from "../components/useSeasonalData";
import SeasonalSection from "../components/SeasonalSection";

const Seasonal = () => {
  const { seasonalAnime, loading, error } = useSeasonalData();
  return <SeasonalSection seasonalAnime={seasonalAnime} loading={loading} error={error} />;
};

export default Seasonal;