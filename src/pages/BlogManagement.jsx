import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListToolbar from "../components/adminPanel/ListToolBar";
import Pagination from "../components/adminPanel/Pagination";
import useBlogCall from "../hooks/useBlogCall";
import { PlusIcon } from "@heroicons/react/24/outline";
import BlogRow from "../components/adminPanel/BlogRow";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BlogManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { getAllBlogs } = useBlogCall();
  const { blogs } = useSelector((state) => state.blogs);
  const { pagBlogs } = useSelector((state) => state.pagination);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllBlogs();
  }, []);

  const displayedBlogs =
    searchTerm.trim() === ""
      ? pagBlogs
      : pagBlogs?.filter((blog) =>
          [blog.therapistId?.firstName, blog.therapistId?.lastName, blog.title]
            .filter(Boolean)
            .some((name) =>
              name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

  return (
    <div className="container py-10 mx-auto ">
      <div className="bg-white dark:bg-background-lightdark text-navy dark:text-offWhite-dark border rounded-lg shadow-sm">
        <div className="p-6">
          <ListToolbar
            title={t("AP-blogList")}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder={t("searchBlogPlaceholder")}
            actions={
              <button
                onClick={() => navigate("/blogs")}
                className="px-4 py-2 text-white transition duration-300 rounded-md bg-seaGreen hover:bg-navy"
              >
                {t("seeAllBlogs")} {/* See All Blogs */}
              </button>
            }
          />
          <div>
            <div className="hidden text-sm font-medium text-gray-500 dark:text-seaGreen-light md:grid md:grid-cols-12 md:gap-4">
              <div className="col-span-5">{t("AP-blogTitle")} {/* Blog Title */}</div>
              <div className="col-span-3">{t("AP-author")} {/* Author */}</div>
              <div className="col-span-2">{t("AP-createdAt")} {/* Created At */}</div>
              <div className="col-span-2 text-right">{t("AP-actions")} {/* Actions */}</div>
            </div>
            {displayedBlogs?.map((blog) => (
              <BlogRow key={blog._id} blog={blog} />
            ))}
          </div>
          <Pagination data={blogs} endpoint={"blogs"} slice={"pagBlogs"} />
        </div>
      </div>
    </div>
  );
};

export default BlogManagement;
