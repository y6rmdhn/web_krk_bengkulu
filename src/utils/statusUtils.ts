export const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING_OPERATOR":
      return "bg-yellow-100 text-yellow-800";
    case "APPROVED":
      return "bg-green-100 text-green-800";
    case "REJECTED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case "PENDING_OPERATOR":
      return "Menunggu Verifikasi Operator";
    case "APPROVED":
      return "Disetujui";
    case "REJECTED":
      return "Ditolak";
    default:
      return status;
  }
};

export const getStepStatusText = (status: string) => {
  switch (status) {
    case "completed":
      return "Selesai";
    case "rejected":
      return "Ditolak";
    case "in-progress":
      return "Sedang Diproses";
    case "pending":
      return "Menunggu";
    default:
      return "Proses";
  }
};
