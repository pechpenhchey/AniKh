import { getSeasonalAnime } from "../core/request";

export const fetchSeasonalAnime = async (set) => {
  set({ loading: true, error: null });
  try {
    const res = await getSeasonalAnime();
    set({ data: res.data.data, loading: false });
  } catch (err) {
    set({ error: err.message, loading: false });
  }
};