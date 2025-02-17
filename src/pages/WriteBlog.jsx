import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import NewBlogForm, {
  NewBlogFormSchema,
} from "../components/writeBlog/WriteBlogForm";
import useBlogCall from "../hooks/useBlogCall";
import useCategoryCall from "../hooks/useCategoryCall";

const WriteBlog = () => {
  const { getSingleBlog, addNewBlog, updateBlog } = useBlogCall();
  const { getAllCategories } = useCategoryCall();
  const { id } = useParams();
  const { singleBlog } = useSelector((state) => state.blogs);
  const { currentUser } = useSelector((state) => state.auth);

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
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-5xl p-12 mx-auto">
      {isEditMode && !singleBlog ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={NewBlogFormSchema}
          onSubmit={(values, actions) => {
            if (isEditMode && id) {
              updateBlog(id, values);
            } else {
              addNewBlog("blogs", values);
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
