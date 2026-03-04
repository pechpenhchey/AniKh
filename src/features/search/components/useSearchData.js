import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAnime, getManga } from "../../../app/api/anime/core/request";

const useSearchData = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const tab = searchParams.get("tab") || "anime";
  const page = parseInt(searchParams.get("page") || "1");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!query.trim()) {
      setData([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = tab === "anime"
          ? await getAnime(query, page)
          : await getManga(query, page);
        setData(res.data.data ?? []);
        setTotalPages(res.data.pagination?.last_visible_page ?? 1);
      } catch (err) {
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, tab, page]);

  const setTab = (t) => setSearchParams({ q: query, tab: t, page: 1 });
  const setPage = (p) => setSearchParams({ q: query, tab, page: p });

  return { query, tab, page, data, loading, error, totalPages, setTab, setPage };
};

export default useSearchData;