"use client";
import BlogTableitem from "@/components/AdminComponents/BlogTableitem";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@/lib/AuthContext";

const page = () => {
  const [blogs, setBlogs] = useState([]);
  const { user } = useAuth();


 const fetchBlogs = async () => {
    const response = await axios.get("/api/blog"); // GET request to fetch blogs
    setBlogs(response.data.blogs);
  };

const deteleBlog = async (mongoId) => {
  try {
   const response = await axios.delete(`/api/blog?id=${mongoId}&userId=${user.id}&userRole=${user.role}`);
    toast.success(response.data.message);
    fetchBlogs(); // Refresh the list
  } catch (error) {
    toast.error("Failed to delete blog");
  }
};

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-6 sm:pl-10">
      <div className="text-xl font-semibold">
        <h1>All Blogs</h1>
      </div>
      <div className="relative h-[80vh] max-w[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm text-gray-700  text-left uppercase  bg-[#F5F5F5]">
            <tr>
              <th scope="col" className="hidden sm:block py6 py-3 bg-[#F5F5F5]">
                Author name
              </th>
              <th scope="col" className=" py6 py-3  bg-[#F5F5F5]">
                Blog Title
              </th>
              <th scope="col" className="py6 py-3  bg-[#F5F5F5]">
                Date
              </th>
              <th scope="col" className="py6 py-3  bg-[#F5F5F5]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item, index) => (
              <BlogTableitem
                key={index}
                mongoId={item._id}
                title={item.title}
                author={item.author}
                author_img={item.author_img}
                date={item.date}
                deleteBlog={deteleBlog}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
