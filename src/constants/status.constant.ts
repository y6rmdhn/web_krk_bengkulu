const getStatusConfig = (status: string) => {
  switch (status) {
    case "PENDING_OPERATOR":
      return {
        color:
          "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200",
        label: "Pending Operator",
      };
    case "PENDING_SURVEYOR":
      return {
        color:
          "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200",
        label: "Pending Jabatan Fungsional",
      };
    case "PENDING_KADIS":
      return {
        color:
          "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200",
        label: "Pending Kepala Dinas",
      };
    case "APPROVED":
      return {
        color:
          "bg-green-100 text-green-700 border-green-200 hover:bg-green-200",
        label: "Approved",
      };
    case "REJECTED":
      return {
        color: "bg-red-100 text-red-700 border-red-200 hover:bg-red-200",
        label: "Rejected",
      };
    default:
      return {
        color: "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200",
        label: status || "-",
      };
  }
};

export { getStatusConfig };
