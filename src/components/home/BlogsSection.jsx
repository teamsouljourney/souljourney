
import Card from "./Card";
const BlogsSection = () => {
  return (
    <>
      <div className="relative flex justify-center items-center h-screen bg-offWhite overflow-hidden">
        {/* Background Animation */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-offWhite to-offWhite-dark animate-gradient-x opacity-30 blur-3xl "></div>

        {/* Card Component */}
       <Card/>
      </div>
    </>
  );
};

export default BlogsSection;
