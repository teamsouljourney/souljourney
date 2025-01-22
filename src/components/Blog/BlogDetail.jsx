import React from "react";
import { useParams } from "react-router-dom";
import blogs from "../../helper/blogs.json";

function BlogDetail() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === parseInt(id));

  if (!blog) {
    return <p>Blog not found!</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
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
