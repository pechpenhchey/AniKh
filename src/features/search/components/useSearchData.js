import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAnime, getManga } from "../../../app/api/anime/core/request";

const useSearchData = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query    = searchParams.get("q") || "";
  const tab      = searchParams.get("tab") || "anime";
  const page     = parseInt(searchParams.get("page") || "1");
  const type     = searchParams.get("type") || "";
  const status   = searchParams.get("status") || "";
  const orderBy  = searchParams.get("order_by") || "score";
  const sort     = searchParams.get("sort") || "desc";

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
        const params = { q: query, page };
        if (type)    params.type     = type;
        if (status)  params.status   = status;
        if (orderBy) params.order_by = orderBy;
        if (sort)    params.sort     = sort;

        const res = tab === "anime"
          ? await getAnime(params)
          : await getManga({ q: query, page });

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
  }, [query, tab, page, type, status, orderBy, sort]);

  const updateParams = (updates) => {
    const current = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...current, ...updates, page: 1 });
  };

  const setTab     = (t) => updateParams({ tab: t });
  const setPage    = (p) => setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: p });
  const setType    = (t) => updateParams({ type: t });
  const setStatus  = (s) => updateParams({ status: s });
  const setOrderBy = (o) => updateParams({ order_by: o });
  const setSort    = (s) => updateParams({ sort: s });

  return {
    query, tab, page, type, status, orderBy, sort,
    data, loading, error, totalPages,
    setTab, setPage, setType, setStatus, setOrderBy, setSort,
  };
};

export default useSearchData;