import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

// Global Request Queue
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
    if (queue.length > 0) await delay(400); // 400ms between each request
  }
  isProcessing = false;
};

const enqueue = (fn) =>
  new Promise((resolve, reject) => {
    queue.push({ fn, resolve, reject });
    processQueue();
  });

// API helpers
const get = (url, params) => enqueue(() => api.get(url, params));

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

// Search / paginated anime
export const getTotalAnime = async (page = 1) => {
  const res = await get("/anime", { params: { q: "", page } });
  return res.data;
};