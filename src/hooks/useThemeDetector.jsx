import { useState, useEffect } from "react";

// This hook detects the "dark" class on the HTML element
// and provides the current theme mode for MUI
const useThemeDetector = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    // Create a mutation observer to watch for class changes on the HTML element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === "class" &&
          mutation.target === document.documentElement
        ) {
          const hasDarkClass = document.documentElement.classList.contains("dark");
          setIsDarkMode(hasDarkClass);
        }
      });
    });

    // Start observing
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Clean up
    return () => observer.disconnect();
  }, []);

  return isDarkMode ? "dark" : "light";
};

export default useThemeDetector;