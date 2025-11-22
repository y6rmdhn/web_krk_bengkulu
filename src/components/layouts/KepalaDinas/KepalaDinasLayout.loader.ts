import session from "@/utils/session";
import { redirect } from "react-router-dom";

export default function kepalaDinasLoader() {
  const isAuthenticated = session.isAuthenticated();

  if (!isAuthenticated) {
    return redirect("/");
  }

  return null;
}
