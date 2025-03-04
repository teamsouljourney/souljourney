import { useEffect } from "react";
import BlogHeroSection from "../components/blog/BlogHeroSection";
import useBlogCall from "../hooks/useBlogCall";
import useCategoryCall from "../hooks/useCategoryCall";
import { useDispatch, useSelector } from "react-redux";
import BlogsCard from "../components/blog/BlogsCard";
import Pagination from "../components/adminPanel/Pagination";
import TabSwitch from "../components/TabSwitch";
import { useTranslation } from "react-i18next";
import { setSearchTerm } from "../features/blogSlice";

const Blog = () => {
  const dispatch = useDispatch();
  const { getBlogData } = useBlogCall();
  const { getAllCategories, getFilteredBlogs } = useCategoryCall();
  const { blogs, loading, searchTerm } = useSelector((state) => state.blogs);
  const { pagBlogs } = useSelector((state) => state.pagination);
  const { t } = useTranslation();

  useEffect(() => {
    getBlogData();
    getAllCategories();
  }, []);

  const handleCategoryChange = (categoryId) => {
    if (categoryId) {
      getBlogData(`category=${categoryId}`);
    }
  };

  const handleSearchChange = (value) => {
    dispatch(setSearchTerm(value));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-seaGreen"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b bg-offWhite dark:bg-background-darker text-navy dark:text-offWhite-dark">
      <BlogHeroSection />

      <TabSwitch
        itemType="blogs"
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onAllDataFetch={getBlogData}
        placeholder={t("searchBlogs")}
      />

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
