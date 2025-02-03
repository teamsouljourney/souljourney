import { useParams, useNavigate } from "react-router-dom";
import blogs from "../../helper/blogs.json"; // Blog verilerini içeri aktarın

function BlogDetail() {   
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find((b) => b.id.toString() === id);

  if (!blog) {
    return (
      <div className="text-center text-red-500">
        <h1>Blog not found!</h1>
        <button
          onClick={() => navigate("/blogs")}
          className="mt-4 px-4 py-2 bg-navy text-white rounded hover:bg-navy-light"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <div className="rounded overflow-hidden flex flex-col max-w-xl mx-auto">
        <img className="w-full h-80 object-cover" src={blog.image} alt={blog.title} />
        <div className="relative -mt-16 px-10 pt-5 pb-16 bg-white shadow-lg rounded-lg m-10">
          <h2 className="text-xl font-bold mb-4">{blog.title}</h2>
          <p>{blog.fullContent || blog.description}</p>
        </div>
        <button
          onClick={() => navigate("/blogs")}
          className="mt-4 px-4 py-2 bg-navy-dark text-white rounded hover:bg-navy-light"
        >
          Back to Blogs
        </button>
      </div>
    </div>
  );
}

export default BlogDetail;
