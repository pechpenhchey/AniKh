import {
  getAnimeFullById,
  getAnimeCharactersStaff,
  getAnimeEpisodes,
  getAnimeVideos,
  getAnimeRecom,
} from "../core/request";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const fetchData = async (apiFunc, id, errorMsg, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await apiFunc(id);

      if (apiFunc === getAnimeVideos) {
        return res?.data?.data ?? { promo: [], episodes: [], music_videos: [] };
      }

      if (apiFunc === getAnimeFullById) {
        return res?.data?.data ?? null;
      }

      return Array.isArray(res?.data?.data) ? res.data.data : [];

    } catch (error) {
      const status = error.response?.status;
      if (status === 429 && i < retries - 1) {
        const wait = 2000 * (i + 1);
        console.warn(`${errorMsg} ${id} — 429, retrying in ${wait}ms...`);
        await delay(wait);
      } else {
        console.error(`${errorMsg} ${id}:`, status);
        break;
      }
    }
  }

  if (apiFunc === getAnimeVideos) return { promo: [], episodes: [], music_videos: [] };
  if (apiFunc === getAnimeFullById) return null;
  return [];
};

// Paginated Episodes 
export const fetchAnimeEpisodesPage = async (id, page = 1, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await getAnimeEpisodes(id, page);
      return {
        episodes: Array.isArray(res?.data?.data) ? res.data.data : [],
        hasNextPage: res?.data?.pagination?.has_next_page ?? false,
        lastPage: res?.data?.pagination?.last_visible_page ?? 1,
      };
    } catch (error) {
      const status = error.response?.status;
      if (status === 429 && i < retries - 1) {
        const wait = 2000 * (i + 1);
        console.warn(`Episodes page ${page} for ${id} — 429, retrying in ${wait}ms...`);
        await delay(wait);
      } else {
        console.error(`Episodes page ${page} for ${id}:`, status);
        break;
      }
    }
  }
  return { episodes: [], hasNextPage: false, lastPage: 1 };
};

export const fetchAnimeFullById = (id) =>
  fetchData(getAnimeFullById, id, "API Error (Anime Full)");

export const fetchAnimeCharactersStaff = (id) =>
  fetchData(getAnimeCharactersStaff, id, "API Error (Characters)");

export const fetchAnimeVideos = (id) =>
  fetchData(getAnimeVideos, id, "API Error (Videos)");

export const fetchAnimeRecom = (id) =>
  fetchData(getAnimeRecom, id, "API Error (Recommendations)");
