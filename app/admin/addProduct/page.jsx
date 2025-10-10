"use client";
import { assets } from "@/Assets/assets";
import axios from "axios";
import { set } from "mongoose";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [image, setImage] = useState(false);
  const [data,setData]=useState({
    title:"",
    description:"",
    category:"Startup",
    author:"Alex Bennett",
    author_img:"/author_img.png"

  })

  const onChangeHandler=(event)=>{
    const {name,value}=event.target;
    setData((data)=>({...data,[name]:value}))
   
  }


  const onsubmitHandler= async (e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append('title',data.title);
    formData.append('description',data.description);
    formData.append('category',data.category);
    formData.append('author',data.author);
    formData.append('author_img',data.author_img);
    formData.append('image',image);
    try {
  const response = await axios.post("/api/blog", formData);
  if (response.data.success) {
    toast.success(response.data.message);
    setImage(false);
    setData({
      title: "",
      description: "",
      category: "startup",
      author: "Alex Bennett",
      author_img:"/author_img.png"
,
    });
  } else {
    toast.error(response.data.message || "Something went wrong");
  }
} catch (error) {
  console.error(error);
  toast.error("Failed to upload blog");
}
}

return (
    <form onSubmit={onsubmitHandler} className="pt-5 px-5 sm:pt-12 pl-16">
      <p className="text-xl">Upload thumbnail</p>
      <label htmlFor="image">
        <Image
          className="mt-4"
          src={!image ? assets.upload_area : URL.createObjectURL(image)}
          width={140}
          height={70}
          alt=""
        />
      </label>
      <input
        onChange={(e) => setImage(e.target.files[0])}
        type="file"
        id="image"
        hidden
        required
      />
      <p className="text-xl mt-4">Blog title</p>
      <input
        name="title" onChange={onChangeHandler} value={data.title}
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        type="text"
        placeholder="Type here"
        required
      />
      <p className="text-xl mt-4">Blog Description</p>
      <textarea
        name="description" onChange={onChangeHandler} value={data.description}
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        type="text"
        placeholder="Write content here"
        rows={6}
        required
      />
      <p className="text-xl mt-4">Blog Category</p>
      <select name="category" onChange={onChangeHandler} value={data.category} className="w-40 mt-4 px-4 py-3 border text-gray-500">
        <option value="Startup">Startup</option>
        <option value="Technology">Technology</option>
        <option value="Lifestyle">Lifestyle</option>
      </select>
      <br/>
      <button type="submit" className="mt-8 w-40 h-12 bg-gray-400 text-white shadow-[-4px_4px_0px_#000000] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all">ADD</button>
    </form>
  );
};

export default page;
