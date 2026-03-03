import { getTopAnime } from "./request";

// Fetch Top Anime
export const fetchTopAnime = async () => {
  try {
    const res = await getTopAnime();
    return res.data.data;
  } catch (error) {
    console.error("API Error (Top Anime):", error.response?.status);
    throw error;
  }
};