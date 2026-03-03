import { getTopManga } from "./request";

export const fetchTopManga = async () => {
  const res = await getTopManga();
  return res.data.data;
};