import { useState } from "react";
import { useSelector } from "react-redux";
import BlogsCard from "./BlogsCard";

function BlogList() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { categories } = useSelector((state) => state.categories);
  const { blogs } = useSelector((state) => state.blogs);

  return (
    <div>
      {/* <div className="flex flex-wrap justify-center mb-6 space-x-4">
        <button
          onClick={() => handleCategoryChange("All")}
          className={`px-4 py-2 text-black font-semibold border-b-4 hover:bg-navy-light focus:outline-none tab-button transition-all duration-300 ease-in-out mb-5 rounded-lg ${
            selectedCategory === "All"
              ? "bg-navy-light text-white shadow-lg scale-105"
              : "bg-seaGreen-light text-white hover:bg-navy hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-seaGreen"
          }`}
        >
          All
        </button>


        {visibleCategories.map((category) => (
          <button
            key={category._id}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 text-black font-semibold border-b-4 hover:bg-navy-light focus:outline-none tab-button transition-all duration-300 ease-in-out mb-5 rounded-lg ${
              selectedCategory === category.name
                ? "bg-navy-light text-white shadow-lg scale-105"
                : "bg-seaGreen-light text-white hover:bg-navy hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-seaGreen"
            }`}
          >
            {category.name}
          </button>
        ))}

        {remainingCategories.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`px-4 py-2 text-black font-semibold border-b-4 hover:bg-navy-light focus:outline-none tab-button transition-all duration-300 ease-in-out mb-5 rounded-lg ${
                isMenuOpen ? "bg-navy-light text-white shadow-lg scale-105" : ""
              }`}
            >
              More Categories
            </button>

  
            {isMenuOpen && (
              <div className="absolute left-0 z-10 mt-1 bg-white border shadow-md top-full w-fit">
                {remainingCategories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => handleCategoryChange(category)}
                    className={`block w-full px-4 py-2 text-black hover:bg-navy-light rounded-lg ${
                      selectedCategory === category.name
                        ? "bg-navy-light text-white shadow-lg scale-105"
                        : ""
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div> */}

      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {blogs.map((blog, index) => (
            <BlogsCard key={blog._id} blog={blog} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogList;
