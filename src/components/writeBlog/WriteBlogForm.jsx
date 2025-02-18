import * as Yup from "yup";
import { Form } from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// For React Quill Text Editor
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    ["link", "image"],
  ],
};

export const NewBlogFormSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  categoryId: Yup.string().required("Required"),
  image: Yup.string().required("Required"),
  content: Yup.string().required("Required"),
});

const WriteBlogForm = ({
  values,
  handleChange,
  handleBlur,
  isSubmitting,
  setFieldValue,
  isEditMode,
}) => {
  const { categories } = useSelector((state) => state.categories);
  const { t } = useTranslation();

  return (
    <Form>
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-wrap justify-center gap-4">
          <input
            type="text"
            name="title"
            placeholder={t("blogTitlePlaceholder")}
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            className="peer"
          />
          <select
            name="categoryId"
            value={values.categoryId || ""}
            onChange={handleChange}
            className="p-2 border w-80"
          >
            <option value="" disabled>
              {t("selectCategory")}
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="image"
            placeholder={t("imagePlaceholder")}
            value={values.image}
            onChange={handleChange}
            onBlur={handleBlur}
            className="peer"
          />
        </div>
        <div className="w-full max-w-4xl overflow-hidden border rounded-md">
          <ReactQuill
            id="content"
            theme="snow"
            modules={modules}
            value={values.content}
            placeholder={t("contentPlaceholder")}
            onChange={(value) => setFieldValue("content", value)}
            className="w-full h-[30rem]"
          />
        </div>
        <div className="flex gap-8">
          <button
            type="submit"
            className="px-4 py-2 text-white transition duration-300 rounded-md bg-navy hover:bg-seaGreen"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? t("loading")
              : isEditMode
              ? t("updateBlog")
              : t("createNewBlog")}
          </button>
        </div>
      </div>
    </Form>
  );
};

export default WriteBlogForm;
