import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

export const getTopManga = async () => {
  try {
    return await api.get("/top/manga");
  } catch (error) {
    console.error("API Error:", error.response?.status);
    throw error;
  }
};
