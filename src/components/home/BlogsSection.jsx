
import Card from "./Card";
const BlogsSection = () => {
  return (
    <>
      <div className="relative flex justify-center items-center h-screen overflow-hidden">
        {/* Background Animation */}
        <div className="absolute top-0 left-0 w-full h-full  "></div>

        {/* Card Component */}
       <Card/>
      </div>
    </>
  );
};

export default BlogsSection;
