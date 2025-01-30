import teams from "../../helper/team.json";
import Card from "./Card";
const BlogsSection = () => {
  return (
    <>
      <div className=" flex flex-col items-center gap-10 w-full">
        <div className="text-center  font-urbanist ">
          <h1 className="mb-7 text-3xl sm:text-5xl leading-normal font-urbanist tracking-tight text-navy">Our Blogs</h1>
          <p className="w-[60%] mx-auto font-urbanist">
            Our blog is a valuable resource filled with insightful articles on
            psychological counseling, personal development, and mental health.
            Written by our team of experienced psychologists, therapists, and
            counselors, our articles aim to help you better understand yourself
            and cultivate a healthier mindset. Here’s what you can expect from
            our blog.
          </p>
        </div>
        {/* Card Component */}
        <div className="flex flex-wrap justify-center items-center">
          <Card teams={teams} />
        </div>
      </div>
    </>
  );
};

export default BlogsSection;
