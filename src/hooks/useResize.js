import { useState, useEffect } from "react";

export const useResize = (delay = 250) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Évite l'erreur d'hydratation en ne lisant window qu'après le montage
    setWindowWidth(window.innerWidth);

    let timeoutId = null;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, delay);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [delay]);

  return windowWidth;
};
