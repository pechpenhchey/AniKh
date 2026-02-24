import axios from "axios";

const API_BASE = "https://api.jikan.moe/v4";

export const getTopAnime = () => axios.get(`${API_BASE}/top/anime`);
