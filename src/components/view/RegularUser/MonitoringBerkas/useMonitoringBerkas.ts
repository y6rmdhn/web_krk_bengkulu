import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useMonitoringBerkas = () => {
  const [noResi, setNoResi] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (noResi.trim()) {
      setIsSearching(true);

      setTimeout(() => {
        setIsSearching(false);
        navigate(`/monitoring/detail/${noResi}`);
      }, 1500);
    }
  };

  return {
    noResi,
    setNoResi,
    isSearching,
    handleSearch,
  };
};

export default useMonitoringBerkas;
