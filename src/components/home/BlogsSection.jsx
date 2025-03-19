import { NavLink } from "react-router-dom";
import HomeCard from "./HomeCard";
import { useSelector } from "react-redux";
import useBlogCall from "../../hooks/useBlogCall";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const BlogsSection = () => {
  const { getBlogData } = useBlogCall();
  const { popularBlogs } = useSelector((state) => state.blogs);
  const { t } = useTranslation();

  useEffect(() => {
    const query = "sort[countOfVisitors]=desc&limit=4";
    getBlogData(query);
  }, []);

  return (
    <div className="flex flex-col items-center w-full gap-10">
      <div className="text-center">
        <h1 className="text-3xl leading-normal tracking-tight mb-7 sm:text-5xl font-urbanist">
          {t("ourBlogs")}
        </h1>
        <p className="w-[60%] mx-auto font-urbanist">{t("ourBlogsText")}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 md:gap-x-12">
        {popularBlogs?.map((blog) => (
          <HomeCard key={blog._id} blog={blog} />
        ))}
      </div>

      <div className="w-1/2 text-center">
        <NavLink
          to="blogs"
          className="w-[50%] block mx-auto mt-6 text-offWhite font-bold text-center py-2 rounded-lg hover:bg-gradient-to-r bg-seaGreen-dark hover:bg-seaGreen-light"
        >
          {t("seeMore")}
        </NavLink>
      </div>
    </div>
  );
};

export default BlogsSection;
