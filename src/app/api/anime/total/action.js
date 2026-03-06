import { getAnime } from "../core/request";

export const fetchTotalAnime = async (page = 1) => {
  try {
    const res = await getAnime({ q: "", page });
    return {
      data: res.data.data,
      total: res.data.pagination?.items?.total ?? 0,
      currentPage: res.data.pagination?.current_page ?? page,
      lastPage: res.data.pagination?.last_visible_page ?? 1,
    };
  } catch (error) {
    console.error(`Failed to fetch Total Anime Page ${page}`, error);
    throw error;
  }
};