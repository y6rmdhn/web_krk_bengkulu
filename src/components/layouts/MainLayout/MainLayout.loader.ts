import { queryClient } from "@/lib/queryClient";
import authServices from "@/services/api/auth.services";
import session from "@/utils/session";
import { redirect } from "react-router-dom";

export default async function mainLoader() {
  const isAuthenticated = session.isAuthenticated();
  if (!isAuthenticated) {
    return redirect("/login");
  }

  try {
    const dataProfile = await queryClient.ensureQueryData({
      queryKey: ["Profile"],
      queryFn: async () => {
        const result = await authServices.getProfile();
        return result.data.data;
      },
    });

    const userRoles = dataProfile.roles.map((r: any) => r.name);

    const isAllowed =
      userRoles.includes("Pemohon") ||
      userRoles.includes("Kepala Dinas") ||
      userRoles.includes("Surveyor Lapangan") ||
      userRoles.includes("Admin") ||
      userRoles.includes("Operator");

    if (!isAllowed) {
      return redirect("/");
    }

    return dataProfile;
  } catch {
    session.clearSession();
    return redirect("/login");
  }
}
