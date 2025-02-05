import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import blogs from "../../helper/blogs.json";

function BlogList({ onReadMore, selectedCategory, onCategoryChange }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Kullanıcıdan alınan referanslarda bulunan kategorileri ekleyin
  const moreCategories = ["Depression", "Anxiety", "PTSD", "Borderline"];
  
  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);
  
  const handleReadMore = (blog) => {
    navigate(`/blogs/${blog.id}`);
  };

  return (
    <div>
      {/* Kategori Filtreleme Butonları */}
      <div className="flex justify-center space-x-4 mb-6 flex-wrap">
        {["All", "Health Psychology", "Educational Psychology", "Neuropsychology", "Marriage and Family Therapy"].map(
          (category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 text-black font-semibold border-b-4 hover:bg-navy-light focus:outline-none tab-button transition-all duration-300 ease-in-out mb-5 rounded-lg ${
                selectedCategory === category
                  ? "bg-navy-light text-white shadow-lg scale-105"
                  : "bg-seaGreen-light text-white hover:bg-navy hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-seaGreen"
              }`}
            >
              {category}
            </button>
          )
        )}
        
        {/* More Categories Butonu */}
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
              {moreCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`px-4 py-2 text-black hover:bg-navy-light rounded-lg ${
                    selectedCategory === category ? "bg-navy-light text-white shadow-lg scale-105" : ""
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Blog Kartları */}
      <div className="grid grid-cols-1 gap-8 mt-8">
        {filteredBlogs.map((blog, index) => (
          <div
            key={blog.id}
            className={`flex flex-col-reverse md:flex-row items-center ${
              index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
            }`}
          >
                      <div className="md:w-[439px] md:h-[366px] w-[439px] h-[366px]">

            {/* Resim Kutusu */}
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-auto rounded-l-[80%] rounded-r-[80%] object-cover aspect-[439/366]"
            />
            </div>

            {/* Metin Kutusu */}
            <div className="sm:ml-6 mt-4 sm:mt-0 sm:w-1/2">
              <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
              <p className="text-gray-700">{blog.description}</p>

             <div className="flex justify-center">
  <button
    onClick={() => handleReadMore(blog)}
    className="mt-4 px-4 py-2 mb-5 bg-navy  text-white rounded hover:bg-navy-light transition-all"
  >
    Read More
  </button>
</div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
