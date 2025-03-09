"use client";

import { useEffect, useState, useRef, createRef } from "react";

/**
 * Custom hook for tab navigation with smooth scrolling
 * @param {string[]} sectionIds - Array of section IDs to navigate between
 * @param {Object} options - Configuration options
 * @param {number} options.navbarHeight - Height of the navbar in pixels (default: 120)
 * @param {number} options.tabHeight - Height of the tab navigation in pixels (default: 64)
 * @returns {Object} Navigation controls and refs
 */
const useTabNavigation = (sectionIds, options = {}) => {
  // Default options with fallbacks
  const { navbarHeight = 120, tabHeight = 64 } = options;

  // State to track the active tab
  const [activeTab, setActiveTab] = useState(sectionIds[0]);

  // Create refs for each section
  const sectionRefs = useRef({});

  // Initialize refs for each section
  useEffect(() => {
    sectionIds.forEach((id) => {
      if (!sectionRefs.current[id]) {
        sectionRefs.current[id] = createRef();
      }
    });
  }, [sectionIds]);

  // Handle scroll to update active tab
  useEffect(() => {
    const handleScroll = () => {
      const totalOffset = navbarHeight + tabHeight;

      let currentSection = sectionIds[0];

      // Find which section is currently in view using refs
      for (const sectionId of sectionIds) {
        const element = sectionRefs.current[sectionId]?.current;
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= totalOffset) {
            currentSection = sectionId;
          }
        }
      }

      setActiveTab(currentSection);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, navbarHeight, tabHeight]);

  /**
   * Scrolls to the specified section
   * @param {string} sectionId - ID of the section to scroll to
   */
  const scrollToSection = (sectionId) => {
    // Update active tab state
    setActiveTab(sectionId);

    // Get the element using ref
    const element = sectionRefs.current[sectionId]?.current;

    if (element) {
      // Calculate the position to scroll to
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.scrollY - navbarHeight - tabHeight;

      // Perform smooth scrolling
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Return the hook API
  return {
    activeTab, // Current active tab ID
    scrollToSection, // Function to scroll to a section
    sectionRefs, // Refs object to attach to sections
  };
};

export default useTabNavigation;
