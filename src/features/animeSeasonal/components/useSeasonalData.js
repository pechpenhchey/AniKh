import { useEffect } from "react";
import { useSeasonalAnimeStore } from "../../../app/api/anime/season/slice";

const useSeasonalData = () => {
  const { data: seasonalAnime, loading, error, getSeasonalAnime } = useSeasonalAnimeStore();

  useEffect(() => {
    if (!seasonalAnime?.length) getSeasonalAnime();
  }, []);

  return { seasonalAnime, loading, error };
};

export default useSeasonalData;