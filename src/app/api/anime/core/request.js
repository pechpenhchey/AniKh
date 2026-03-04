import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

// ── Queue ──────────────────────────────────────────────
const queue = [];
let isProcessing = false;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const processQueue = async () => {
  if (isProcessing) return;
  isProcessing = true;
  while (queue.length > 0) {
    const { fn, resolve, reject } = queue.shift();
    try {
      resolve(await fn());
    } catch (err) {
      reject(err);
    }
    if (queue.length > 0) await delay(1200); // safe for Jikan 3 req/sec
  }
  isProcessing = false;
};

const enqueue = (fn) =>
  new Promise((resolve, reject) => {
    queue.push({ fn, resolve, reject });
    processQueue();
  });

const get = (url, params) => enqueue(() => api.get(url, params));

// ── Anime ──────────────────────────────────────────────
// Top Anime
export const getTopAnime = () => get("/top/anime");

// Full Anime Info
export const getAnimeFullById = (id) => get(`/anime/${id}/full`);

// Characters
export const getAnimeCharactersStaff = (id) => get(`/anime/${id}/characters`);

// Episodes — supports pagination
export const getAnimeEpisodes = (id, page = 1) =>
  get(`/anime/${id}/episodes`, { params: { page } });

// Videos / Trailers
export const getAnimeVideos = (id) => get(`/anime/${id}/videos`);

// Recommendations
export const getAnimeRecom = (id) => get(`/anime/${id}/recommendations`);

// Anime list — used for both browse (empty query) and search
export const getAnime = (query = "", page = 1) =>
  get("/anime", { params: { q: query, page } });

// Seasonal Anime
export const getSeasonalAnime = () => get("/seasons/now");

// Schedule
export const getSchedule = (day) =>
  get("/schedules", { params: { filter: day } });

// Manga list — used for both browse and search
export const getManga = (query = "", page = 1) =>
  get("/manga", { params: { q: query, page } });