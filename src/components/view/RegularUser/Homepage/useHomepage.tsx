import berkasServices from "@/services/api/berkas.services";
import { useQuery } from "@tanstack/react-query";

const useHomepage = () => {
  // --- 1. AMBIL DATA BERKAS ---
  const { data: masterBerkas, isLoading: isLoadingMaster } = useQuery({
    queryKey: ["master-berkas"],
    queryFn: berkasServices.getMasterData,
  });

  const { data: userBerkas, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user-berkas"],
    queryFn: berkasServices.getListBerkas,
  });

  // --- 2. HITUNG LOGIC KELENGKAPAN ---
  const requiredList = masterBerkas?.data.data || [];
  const uploadedList = userBerkas?.data.data || [];
  const totalRequired = requiredList.length;

  // Filter yang sudah kita perbaiki logic-nya
  const totalUploaded = requiredList.filter((reqItem: any) =>
    uploadedList.some((upItem: any) => upItem.master_berkas_id === reqItem.id)
  ).length;

  const isEligible = totalRequired > 0 && totalUploaded === totalRequired;
  const percentage =
    totalRequired > 0 ? Math.round((totalUploaded / totalRequired) * 100) : 0;
  const progressString = `${totalUploaded}/${totalRequired}`;

  return {
    isLoadingMaster,
    isLoadingUser,
    isEligible,
    percentage,
    progressString,
    totalRequired,
  };
};

export default useHomepage;
