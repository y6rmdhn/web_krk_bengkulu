import berkasServices from "@/services/api/berkas.services";
import { useQuery } from "@tanstack/react-query";

const useHomepage = () => {
  const { data: masterBerkas, isLoading: isLoadingMaster } = useQuery({
    queryKey: ["master-berkas"],
    queryFn: berkasServices.getMasterData,
  });

  const { data: userBerkas, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user-berkas"],
    queryFn: berkasServices.getListBerkas,
  });

  const allMasterList = masterBerkas?.data.data || [];
  const uploadedList = userBerkas?.data.data || [];

  const MANDATORY_KODES = ["KTP-Pemohon", "Npwp", "Nib", "Sertifikat-Tanah"];

  const requiredList = allMasterList.filter((item: any) =>
    MANDATORY_KODES.includes(item.kode),
  );

  const mandatoryDocsStatus = requiredList.map((reqItem: any) => ({
    id: reqItem.id,
    kode: reqItem.kode,
    nama: reqItem.nama,
    isUploaded: uploadedList.some(
      (upItem: any) => upItem.master_berkas_id === reqItem.id,
    ),
  }));

  const totalRequired = requiredList.length;
  const totalUploaded = mandatoryDocsStatus.filter(
    (doc: any) => doc.isUploaded,
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
    mandatoryDocsStatus,
  };
};

export default useHomepage;
