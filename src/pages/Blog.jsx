import { useEffect } from "react";
import BlogHeroSection from "../components/blog/BlogHeroSection";
import useBlogCall from "../hooks/useBlogCall";
import useCategoryCall from "../hooks/useCategoryCall";
import { useSelector } from "react-redux";
import BlogsCard from "../components/blog/BlogsCard";
import Pagination from "../components/adminPanel/Pagination";

const Blog = () => {
  const { getAllBlogs } = useBlogCall();
  const { getAllCategories } = useCategoryCall();
  const { blogs } = useSelector((state) => state.blogs);
  const { pagBlogs } = useSelector((state) => state.pagination);

  useEffect(() => {
    getAllBlogs();
    getAllCategories();
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b bg-offWhite dark:bg-background-darker text-navy dark:text-offWhite-dark">
      <BlogHeroSection />
      <main className="container px-6 py-16 mx-auto">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {pagBlogs?.map((blog, index) => (
              <BlogsCard key={blog._id} blog={blog} index={index} />
            ))}
          </div>
        </div>
        <Pagination endpoint="blogs" slice="pagBlogs" data={blogs} />
      </main>
    </div>
  );
};

export default Blog;
