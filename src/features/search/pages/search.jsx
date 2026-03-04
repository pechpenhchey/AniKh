import React from "react";
import SearchResults from "../components/SearchResults";
import useSearchData from "../components/useSearchData";

const Search = () => {
  const searchData = useSearchData();
  return <SearchResults {...searchData} />;
};

export default Search;