import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useTrackingSearch = () => {
  const [nomor, setNomor] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (nomor.trim()) {
      navigate(`/operator/tracking/detail/${nomor}`);
    }
  };

  return {
    nomor,
    setNomor,
    handleSearch,
  };
};

export default useTrackingSearch;
