import { useEffect, useRef } from "react";

type Handler = () => void;

export const useClickOutside = <T extends HTMLElement>(handler: Handler) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) handler();
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [handler]);

  return ref;
};
