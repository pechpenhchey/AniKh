import { getTotalAnime } from "../core/request";

export const fetchTotalAnime = async (page = 1) => {
  try {
    const res = await getTotalAnime(page);
    return {
      data: res.data,
      total: res.pagination?.items?.total ?? 0,
      currentPage: res.pagination?.current_page ?? page,
      lastPage: res.pagination?.last_visible_page ?? 1,
    };
  } catch (error) {
    console.error(`Failed to fetch Total Anime Page ${page}`, error);
    throw error;
  }
};