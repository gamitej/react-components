import { useEffect, useState } from "react";

export const useStorageHook = <T>(
  name: string,
  initialData: T,
  storageType: "session" | "local"
) => {
  const storage = storageType === "local" ? localStorage : sessionStorage;

  const [storeData, setStoreData] = useState<T>(() => {
    const stored = storage.getItem(name);
    return stored ? JSON.parse(stored) : initialData;
  });

  useEffect(() => {
    storage.setItem(name, JSON.stringify(storeData));
  }, [name, storage, storeData]);

  return [storeData, setStoreData] as const;
};
