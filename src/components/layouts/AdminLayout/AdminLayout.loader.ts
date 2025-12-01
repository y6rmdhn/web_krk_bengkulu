import session from "@/utils/session";
import authServices from "@/services/api/auth.services";
import { redirect } from "react-router-dom";
import { queryClient } from "@/lib/queryClient";

export default async function adminLoader() {
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

    const isAllowed = userRoles.includes("admin");

    if (!isAllowed) {
      return redirect("/");
    }

    return dataProfile;
  } catch {
    session.clearSession();
    return redirect("/login");
  }
}
