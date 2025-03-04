
import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"

/**
 * MoreCategories Component - Dropdown for additional categories
 * @param {Object} props - Component props
 * @param {Array} props.categories - List of additional categories
 * @param {string|null} props.selectedCategory - Currently selected category ID
 * @param {Function} props.onCategorySelect - Function to handle category selection
 */
const MoreCategories = ({ categories, selectedCategory, onCategorySelect }) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Check if any category in the dropdown is selected
  const isAnyDropdownCategorySelected = categories.some((category) => category._id === selectedCategory)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handle category selection
  const handleCategoryClick = (categoryId) => {
    onCategorySelect(categoryId)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2 font-semibold rounded-lg transition-all duration-300 ${
          isAnyDropdownCategorySelected
            ? "bg-navy-light text-white shadow-md"
            : "bg-white text-navy hover:bg-navy-light hover:text-white border border-navy"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {t("moreCategories")}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="py-1 max-h-60 overflow-y-auto">
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => handleCategoryClick(category._id)}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-all duration-300 ${
                  selectedCategory === category._id ? "bg-gray-100 font-medium" : ""
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MoreCategories

