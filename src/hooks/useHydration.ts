import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    // Kalau store sudah terhydrate sejak awal
    if (useAuthStore.persist.hasHydrated()) {
      setIsHydrated(true);
    }

    return unsub;
  }, []);

  return isHydrated;
}
