function BlogDetail({ blog, onBack }) {
  if (!blog) {
    return (
      <div className="text-center text-red-500">
        <h1>Blog not found!</h1>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-navy text-white rounded hover:bg-navy-light"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <div className="rounded overflow-hidden flex flex-col max-w-xl mx-auto">
        {/* Blog Görseli */}
        <a href="#">
          <img
            className="w-full h-80 object-cover"
            src={blog.image}
            alt={blog.title}
          />
        </a>

        {/* Blog İçeriği ve Başlık */}
        <div className="relative -mt-16 px-10 pt-5 pb-16 bg-white shadow-lg rounded-lg m-10">
          <a
            href="#"
            className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
          >
            {blog.title}
          </a>

          {/* Blog Açıklaması */}
          {/* <p className="text-gray-500 text-sm">
            Health psychology is a branch of psychology that focuses on how
            biological, social, and psychological factors influence health and
            illness. It explores the ways in which our behaviors, emotions, and
            thoughts can impact physical health and well-being. Health
            psychologists work to understand the underlying psychological
            factors that contribute to health-related behaviors, such as diet,
            exercise, and stress management. They also study the psychological
            impacts of chronic illness, helping individuals cope with conditions
            like diabetes, heart disease, and cancer. Health psychology
            emphasizes preventive care and encourages lifestyle changes to
            promote better health outcomes. Through research and interventions,
            health psychologists aim to improve overall well-being by addressing
            both mental and physical aspects of health. By understanding the
            interplay between the mind and body, health psychology provides
            valuable insights that can help individuals lead healthier lives and
            manage health challenges more effectively.
          </p> */}


          {/* Blog Detay Metni */}
          <div className="mt-6 text-gray-700">
            <h2 className="text-xl font-bold mb-4">Full Content</h2>
            <p>{blog.fullContent || blog.description}</p>
          </div>
        </div>

        {/* Geri Düğmesi */}
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-navy-dark text-white rounded hover:bg-navy-light"
        >
          Back to Blogs
        </button>
      </div>
    </div>
  );
}

export default BlogDetail;
