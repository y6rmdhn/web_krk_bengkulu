import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/constants/dataTable.constant";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "./useDebounce";

const useDataTable = () => {
  const [currentLimit, setCurrentLimit] = useState(DEFAULT_LIMIT);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentSearch, setCurrentSearch] = useState("");
  const debounce = useDebounce();
  const currentPage = Number(searchParams.get("page")) || DEFAULT_PAGE;

  const handleChangePage = (page: number) => {
    setSearchParams({ page: String(page) });
  };

  const handleLimitChange = (limit: number) => {
    setCurrentLimit(limit);

    const params = new URLSearchParams(searchParams);
    params.set("limit", String(limit));
    params.set("page", "1");

    setSearchParams(params);
  };

  const handleSearchPage = (search: string) => {
    debounce(() => {
      setCurrentSearch(search);
      const params = new URLSearchParams(searchParams);

      params.set("page", "1");

      setSearchParams(params);
    }, 500);
  };

  useEffect(() => {
    if (!searchParams.get("page")) {
      searchParams.set("page", DEFAULT_PAGE.toString());
      setSearchParams(searchParams);
    }
  }, []);

  return {
    currentPage,
    handleChangePage,
    currentLimit,
    handleLimitChange,
    handleSearchPage,
    currentSearch,
  };
};

export default useDataTable;
