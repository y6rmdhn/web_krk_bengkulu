import session from "@/utils/session";
import { redirect } from "react-router-dom";

export default function adminLoader() {
  const isAuthenticated = session.isAuthenticated();

  if (!isAuthenticated) {
    return redirect("/");
  }

  return null;
}
