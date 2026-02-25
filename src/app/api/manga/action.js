import { getTopManga, } from "./request";

export const fetchTopManga = async (setState) => {
  const res = await getTopManga();
  setState(res.data.data);
};

