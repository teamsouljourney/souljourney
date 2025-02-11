import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import blogs from "../../helper/blogs.json";

function BlogDetail() {   
  const { id } = useParams();
  const navigate = useNavigate();
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const blog = blogs.find((b) => b.id.toString() === id);

  // Local Storage'dan beğeni sayısını al
  useEffect(() => {
    const storedLikes = localStorage.getItem(`blog-${id}-likes`);
    const storedIsLiked = localStorage.getItem(`blog-${id}-isLiked`);
    if (storedLikes) setLikeCount(parseInt(storedLikes));
    if (storedIsLiked) setIsLiked(JSON.parse(storedIsLiked));
  }, [id]);

  const handleLike = () => {
    const newLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
    setLikeCount(newLikeCount);
    setIsLiked(!isLiked);
    
    // Local Storage'a kaydet
    localStorage.setItem(`blog-${id}-likes`, newLikeCount.toString());
    localStorage.setItem(`blog-${id}-isLiked`, (!isLiked).toString());
  };

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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className="flex items-center focus:outline-none"
            >
              {isLiked ? (
                <AiFillHeart className="text-2xl text-red-500" />
              ) : (
                <AiOutlineHeart className="text-2xl hover:text-red-500" />
              )}
            </button>
            <span className="text-gray-600">{likeCount}</span>
          </div>
          <button
            onClick={() => navigate("/blogs")}
            className="px-4 py-2 bg-navy-dark text-white rounded hover:bg-navy-light"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
