import { NavLink } from "react-router-dom";
// import teams from "../../helper/team.json";
// import Card from "./Card";
import HomeCard from "./HomeCard";
import { useSelector } from "react-redux";
import useBlogCall from "../../hooks/useBlogCall";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const BlogsSection = () => {
  const{blogs}=useSelector((state)=>state.blogs)
  const{getAllBlogs}=useBlogCall();
  // const { id } = useParams();
  console.log(blogs);
  
 

   useEffect(()=>{
    
      getAllBlogs();
      console.log("Blogs API cagirildi");
      
    },[])
  

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

          <NavLink to="blogs" className="w-[50%] block mx-auto  mt-6  text-offWhite font-bold text-center py-2 rounded-lg hover:bg-gradient-to-r bg-seaGreen-dark hover:bg-seaGreen-light">
            See More
          </NavLink>
        </div>
        {/* Card Component */}
        <div className="flex flex-wrap justify-center items-center">
          <HomeCard blogs={blogs} />
        </div>
      </div>
    </>
  );
};

export default BlogsSection;
