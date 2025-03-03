import React, { useEffect, useState } from "react";
import BlogHeroSection from "../components/blog/BlogHeroSection";
import BlogList from "../components/blog/BlogList";
import BlogDetail from "../components/blog/BlogDetail";
import useBlogCall from "../hooks/useBlogCall";
import useCategoryCall from "../hooks/useCategoryCall";

function Blog() {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { getAllBlogs } = useBlogCall();
  const { getAllCategories } = useCategoryCall();

  useEffect(() => {
    getAllBlogs();
    getAllCategories();
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b bg-offWhite dark:bg-background-darker text-navy dark:text-offWhite-dark">
      <BlogHeroSection />
      <main className="container p-6 mx-auto">
        {selectedBlog ? (
          <BlogDetail
            blog={selectedBlog}
            onBack={() => setSelectedBlog(null)}
          />
        ) : (
          <BlogList />
        )}
      </main>
    </div>
  );
}

export default Blog;
