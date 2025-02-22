import { useEffect, useState } from "react";

export const useStorageHook = <T>(
  name: string,
  data: T,
  storageType: "session" | "local"
) => {
  const [storeData, setStoreData] = useState<T>(() => data);

  useEffect(() => {
    sessionStorage.setItem(name, JSON.stringify(storeData));
  }, [name]);
};
