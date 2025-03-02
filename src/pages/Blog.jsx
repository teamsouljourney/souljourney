import React, { useState } from "react";
import BlogHeroSection from "../components/Blog/BlogHeroSection";
import BlogList from "../components/blog/BlogList";
import BlogDetail from "../components/blog/BlogDetail";

function Blog() {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="min-h-screen bg-gradient-to-b bg-offWhite dark:bg-background-darker text-navy dark:text-offWhite-dark pt-32">
      <BlogHeroSection />
      <main className="container mx-auto p-6">
        {selectedBlog ? (
          <BlogDetail blog={selectedBlog} onBack={() => setSelectedBlog(null)} />
        ) : (
          <BlogList
          handleReadMore={(blog) => setSelectedBlog(blog)}
            selectedCategory={selectedCategory}
            onCategoryChange={(category) => setSelectedCategory(category)}
          />
        )}
      </main>
    </div>
  );
}

export default Blog;
