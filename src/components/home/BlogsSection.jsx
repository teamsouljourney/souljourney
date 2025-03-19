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
    <section className="w-full py-12 md:py-16">
      <div className="max-w-[90%] sm:max-w-[85%] md:max-w-[90%] lg:max-w-[85%] mx-auto flex flex-col items-center gap-8 md:gap-10">
        <div className="w-full max-w-3xl text-center">
          <h1 className="mb-4 text-3xl leading-normal tracking-tight sm:mb-6 sm:text-4xl md:text-5xl font-urbanist">
            {t("ourBlogs")}
          </h1>
          <p className="mx-auto text-base text-gray-700 sm:text-lg font-urbanist dark:text-gray-300">
            {t("ourBlogsText")}
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 place-items-center">
          {popularBlogs?.map((blog) => (
            <HomeCard key={blog._id} blog={blog} />
          ))}
        </div>

        <div className="flex justify-center w-full mt-4">
          <NavLink
            to="blogs"
            className="block min-w-[200px] px-8 py-3 text-offWhite font-bold text-center rounded-lg transition-all hover:bg-gradient-to-r bg-seaGreen-dark hover:bg-seaGreen-light hover:shadow-md"
          >
            {t("seeMore")}
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
