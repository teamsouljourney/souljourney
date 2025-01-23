import React from "react";
import { useParams } from "react-router-dom";
import blogs from "../../helper/blogs.json";

function BlogDetail({ blog, onBack }) {
  if (!blog) {
    return (
      <div className="text-center text-red-500">
        <h1>Blog not found!</h1>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-[#4DA1A9] text-white rounded hover:bg-[#79D7BE]"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Geri Düğmesi */}
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-[#4DA1A9] text-white rounded hover:bg-[#79D7BE]"
      >
        Back
      </button>

      {/* Blog Başlığı ve İçeriği */}
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p className="text-gray-700">{blog.fullContent || blog.description}</p>
    </div>
  );
}

export default BlogDetail;