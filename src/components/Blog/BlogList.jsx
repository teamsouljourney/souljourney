import React from "react";
import blogs from "../../helper/blogs.json";

function BlogList({ onReadMore, selectedCategory, onCategoryChange }) {
  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  return (
    <div>
      {/* Kategori Filtreleme Butonları */}
      <div className="flex justify-center space-x-4 mb-6 flex-wrap">
        {["All", "Health Psychology", "Educational Psychology", "Neuropsychology", "Marriage and Family Therapy"].map(
          (category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-6 py-3 mr-3 mb-5 text-white font-semibold rounded-full transition-all duration-300 ease-in-out transform ${
                selectedCategory === category
                  ? "bg-navy-light text-white shadow-lg scale-105"
                  : "bg-seaGreen-light text-white hover:bg-navy hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-seaGreen"
              }`}
            >
              {category}
            </button>
          )
        )}
      </div>

      {/* Blog Kartları */}
      <div className="grid grid-cols-1 gap-8">
        {filteredBlogs.map((blog, index) => (
          <div
            key={blog.id}
            className={`flex flex-col-reverse md:flex-row items-center ${
              index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
            }`}
          >
            {/* Resim Kutusu */}
            <img
              src={blog.image}
              alt={blog.title}
              className="w-52 h-52 object-cover rounded-full shadow-md mb-4 sm:mb-0 sm:w-1/2"
            />

            {/* Metin Kutusu */}
            <div className="sm:ml-6 mt-4 sm:mt-0 sm:w-1/2">
              <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
              <p className="text-gray-700">{blog.description}</p>
              <button
                onClick={() => onReadMore(blog)}
                className="mt-4 px-4 py-2 mb-5 bg-navy  text-white rounded hover:bg-navy-light transition-all"
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
