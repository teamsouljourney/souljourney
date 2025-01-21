import BlogList from "../components/Blog/BlogList";

function Blog() {
  return (
    <div className="min-h-screen bg-blue-100 text-gray-800">
      <header className="bg-blue-900 text-white py-4">
        <h1 className="text-center text-3xl font-bold">Soul&Journey Blog</h1>
        <p className="text-center mt-2">
          
        </p>
      </header>
      <main className="container mx-auto p-6">
        <BlogList/>
      </main>
    </div>
  );
}

export default Blog;
