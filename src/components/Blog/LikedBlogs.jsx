import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LikedBlogs() {
    const [likedBlogs, setLikedBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLikedBlogs = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/blogs/liked`);
                setLikedBlogs(response.data.data);
            } catch (error) {
                console.error("Error fetching liked blogs:", error);
            }
        };
        fetchLikedBlogs();
    }, []);

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Beğendiğim Bloglar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {likedBlogs.map((blog) => (
                    <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img 
                            src={blog.image} 
                            alt={blog.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-bold mb-2">{blog.title}</h3>
                            <button
                                onClick={() => navigate(`/blogs/${blog._id}`)}
                                className="bg-navy text-white px-4 py-2 rounded hover:bg-navy-light"
                            >
                                Okumaya Devam Et
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
