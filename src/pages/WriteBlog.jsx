import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import NewBlogForm, {
  NewBlogFormSchema,
} from "../components/writeBlog/WriteBlogForm";
import useBlogCall from "../hooks/useBlogCall";
import useCategoryCall from "../hooks/useCategoryCall";
import { useTranslation } from "react-i18next";

const WriteBlog = () => {
  const { t } = useTranslation();
  const { getSingleBlog, createNewBlog, updateBlog } = useBlogCall();
  const { getAllCategories } = useCategoryCall();
  const { id } = useParams();
  const { singleBlog } = useSelector((state) => state.blogs);
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const initialValues = {
    therapistId: currentUser?._id || "",
    categoryId: isEditMode ? singleBlog?.categoryId?._id || "" : "",
    title: isEditMode ? singleBlog?.title || "" : "",
    content: isEditMode ? singleBlog?.content || "" : "",
    image: isEditMode ? singleBlog?.image || "" : "",
  };

  useEffect(() => {
    getAllCategories();
    if (isEditMode && id) {
      getSingleBlog(id);
    }
  }, [id, isEditMode]);

  if (isEditMode && !singleBlog) {
    return <p className="text-center text-gray-500">{t("loading")}</p>;
  }

  return (
    <div className="max-w-5xl px-4 py-16 mx-auto sm:px-8">
      {isEditMode && !singleBlog ? (
        <p className="text-center text-gray-500">{t("loading")}</p>
      ) : (
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={NewBlogFormSchema}
          onSubmit={(values, actions) => {
            if (isEditMode && id) {
              updateBlog(id, values);
              navigate("/profile");
            } else {
              createNewBlog(values);
            }
            actions.resetForm();
            actions.setSubmitting(false);
          }}
          component={(props) => (
            <NewBlogForm {...props} isEditMode={isEditMode} />
          )}
        />
      )}
    </div>
  );
};

export default WriteBlog;
