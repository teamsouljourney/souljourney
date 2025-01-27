import blogs from "../../helper/blogs.json"

const Card = () => {
  return (
    <>
      {blogs.map((blog) => (
          <div
            key={blog.id}
            className="relative w-80  min-h-[850px] bg-offWhite bg-opacity-80 rounded-2xl shadow-lg  mr-8"
          >
            <img
              src={blog.image}
              alt="Project Cover"
              className="w-full h-[400px] object-cover rounded-t-2xl transition-all duration-500 ease-in-out hover:scale-95 hover:brightness-110 hover:contrast-110"
            />
            <div className="p-6 flex flex-col justify-between h-full">
              <h2 className="text-2xl font-bold text-navy-light text-shadow-lg mb-4 animate__animated animate__fadeInDown font-urbanist">
                {blog.title}
              </h2>
              <p className="text-customBlack btext-sm mb-6 animate__animated animate__fadeIn font-urbanist">
                {blog.description} {/*doktor ismi gelmesi lazim simdilik böyle ekledim.*/}
              </p>

              {/* Tags Section */}
              <div className="flex gap-3 mb-6 animate__animated animate__fadeIn">
                <span className="px-4 py-2 bg-navy-light opacity-4 rounded-full text-sm text-black font-urbanist flex items-center">
                  <i className="fab fa-html5 mr-2"></i> 
                  {blog.category}
                </span>
              </div>

              {/* GitHub Link */}
              <a
                href="https://github.com/your-username/your-repo"
                className="inline-block px-6 py-3 bg-gradient-to-r from-offWhite to-seaGreen-light text-black text-lg font-bold rounded-full uppercase tracking-wider transition-all duration-300 hover:bg-seaGreen hover:shadow-xl relative overflow-hidden group"
              >
                <i className="fab fa-github"></i> View on Blogs Page
                <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 "></span>
              </a>
            </div>
          </div>
        ))}
    </>
  )
}

export default Card