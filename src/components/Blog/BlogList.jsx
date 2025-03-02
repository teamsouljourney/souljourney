import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBlogCall from "../../hooks/useBlogCall";
import { useSelector } from "react-redux";
import useCategoryCall from "../../hooks/useCategoryCall";

function BlogList() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { getAllBlogs } = useBlogCall();
  const { categories } = useSelector((state) => state.categories);
  const { blogs } = useSelector((state) => state.blogs);
  const { getAllCategories } = useCategoryCall();

  const visibleCategories = categories.slice(0, 4);
  const remainingCategories = categories.slice(4);

  // Düzeltilmiş filtreleme fonksiyonu
  const filteredBlogs = blogs.filter((blog) => {
    if (selectedCategory === "All") return true;
    // blog.categoryId null kontrolü eklendi
    return blog.categoryId && blog.categoryId.name === selectedCategory;
  });

  const handleReadMore = (blog) => {
    navigate(`/blogs/${blog._id}`);
  };

  const handleCategoryChange = (category) => {
    // Eğer category bir string ise direkt kullan, değilse category.name'i kullan
    const categoryName =
      typeof category === "string" ? category : category.name;
    setSelectedCategory(categoryName);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    getAllBlogs();
    getAllCategories();
  }, []);

  return (
    <div>
      {/* Kategori Filtreleme Butonları */}
      <div className="flex justify-center space-x-4 mb-6 flex-wrap">
        {/* All kategorisi butonu */}
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

        {/* İlk 4 kategoriyi göster */}
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

        {/* More Categories Butonu */}
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

            {/* Hamburger Menü */}
            {isMenuOpen && (
              <div className="absolute top-full left-0 bg-white border shadow-md mt-1 w-fit z-10">
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
      </div>

      {/* Blog Kartları */}
      <div className="grid grid-cols-1 gap-8 mt-8">
        {filteredBlogs.map((blog, index) => (
          <div
            key={blog._id}
            className={`flex flex-col-reverse md:flex-row items-center ${
              index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
            }`}
          >
            <div className="sm:ml-6 mt-4 sm:mt-0 sm:w-1/2">
              <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
              <p className="">{blog.content}</p>

              <div className="flex justify-center">
                <button
                  onClick={() => handleReadMore(blog)}
                  className="mt-4 px-4 py-2 mb-5 bg-navy text-white rounded hover:bg-navy-light transition-all"
                >
                  Read More
                </button>
              </div>
            </div>
            
            <div className="md:w-[439px] md:h-[366px] w-[439px] h-[366px]">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-auto rounded-l-[80%] rounded-r-[80%] object-cover aspect-[439/366]"
              />
            </div>

            
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
