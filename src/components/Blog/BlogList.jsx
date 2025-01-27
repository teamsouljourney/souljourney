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
      <div className="flex justify-center space-x-4 mb-6">
        {["All", "Health Psychology", "Educational Psychology", "Neuropsychology", "Marriage and Family Therapy"].map(
          (category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category
                  ? "bg-[#79D7BE] text-white"
                  : "bg-[#4DA1A9] text-white hover:bg-[#79D7BE]"
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
            className={`flex flex-col md:flex-row items-center ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Resim Kutusu */}
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-md"
            />

            {/* Metin Kutusu */}
            <div className="mt-4 md:mt-0 md:w-1/2 md:px-6">
              <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
              <p className="text-gray-700">{blog.description}</p>
              <button
                onClick={() => onReadMore(blog)}
                className="mt-4 px-4 py-2 bg-[#8F5B8A] text-white rounded hover:bg-[#D798B0]"
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
