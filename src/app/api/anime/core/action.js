import { getTopAnime, } from "./request";

export const fetchTopAnime = async (setState) => {
  const res = await getTopAnime();
  setState(res.data.data);
};

