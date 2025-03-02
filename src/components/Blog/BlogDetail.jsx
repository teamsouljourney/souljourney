import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useBlogCall from "../../hooks/useBlogCall";
import { useSelector } from "react-redux";

function BlogDetail() {   
  const { id } = useParams();
  const navigate = useNavigate();
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getBlogById } = useBlogCall();

  useEffect(() => {
    const fetchBlogData = async () => {
      setLoading(true);
      try {
        await getBlogById(id);
        // Local Storage'dan beğeni bilgilerini al
        const storedLikes = localStorage.getItem(`blog-${id}-likes`);
        const storedIsLiked = localStorage.getItem(`blog-${id}-isLiked`);
        if (storedLikes) setLikeCount(parseInt(storedLikes));
        if (storedIsLiked) setIsLiked(JSON.parse(storedIsLiked));
      } catch (error) {
        console.error("Blog yüklenirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id, getBlogById]);

  // Redux state'inden blog verisini al ve currentBlog state'ini güncelle
  const { blogs } = useSelector((state) => state.blogs);
  
  useEffect(() => {
    const blog = blogs?.find((blog) => blog._id === id);
    if (blog) {
      setCurrentBlog(blog);
    }
  }, [blogs, id]);

  const handleLike = () => {
    const newLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
    setLikeCount(newLikeCount);
    setIsLiked(!isLiked);
    
    localStorage.setItem(`blog-${id}-likes`, newLikeCount.toString());
    localStorage.setItem(`blog-${id}-isLiked`, (!isLiked).toString());
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy"></div>
      </div>
    );
  }

  if (!currentBlog) {
    return (
      <div className="text-center text-red-500 p-8">
        <h1 className="text-xl font-bold mb-4">Blog bulunamadı!</h1>
        <button
          onClick={() => navigate("/blogs")}
          className="mt-4 px-6 py-2 bg-navy text-white rounded hover:bg-navy-light transition-all"
        >
          Bloglara Dön
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto py-32 bg-offWhite dark:bg-background-darker text-navy dark:text-offWhite-dark">
      <div className="rounded overflow-hidden flex flex-col max-w-xl mx-auto">
        <div className="relative h-80 w-full">
          <img 
            className="w-full h-full object-cover" 
            src={currentBlog.image} 
            alt={currentBlog.title}
          />
        </div>
        
        <div className="relative -mt-16 px-10 pt-5 pb-16 bg-white dark:bg-background-dark text-navy dark:text-offWhite-dark shadow-lg rounded-lg mx-5 md:mx-10">
          <div className="flex items-center gap-2 mb-4">
            {currentBlog.therapistId && (
              <>
                <img 
                  src={currentBlog.therapistId.image} 
                  alt={`${currentBlog.therapistId.firstName} ${currentBlog.therapistId.lastName}`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">
                    {currentBlog.therapistId.firstName} {currentBlog.therapistId.lastName}
                  </h3>
                  <p className="text-sm ">
                    {currentBlog.therapistId.description}
                  </p>
                </div>
              </>
            )}
          </div>
          
          <h2 className="text-2xl font-bold mb-4">{currentBlog.title}</h2>
          <p className=" leading-relaxed">{currentBlog.content}</p>
          
          {currentBlog.categoryId && (
            <span className="inline-block  px-4 py-1 rounded-full text-sm mt-6">
              {currentBlog.categoryId.name}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-6 px-5">
          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className="flex items-center focus:outline-none transition-colors duration-200"
            >
              {isLiked ? (
                <AiFillHeart className="text-2xl text-red-500" />
              ) : (
                <AiOutlineHeart className="text-2xl hover:text-red-500" />
              )}
            </button>
            <span className="text-gray-600 font-medium">{likeCount}</span>
          </div>
          
          <button
            onClick={() => navigate("/blogs")}
            className="px-6 py-2 bg-navy text-white rounded hover:bg-navy-light transition-all"
          >
            Bloglara Dön
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;