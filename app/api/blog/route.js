import { connectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import BlogModel from "@/lib/models/BlogModel";
const fs = require("fs");  
//api endpoint to get all blogs
export async function GET(request) {
  try {
    await connectDB();
    const blogId = request.nextUrl.searchParams.get("id");
    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      return NextResponse.json({ success: true, blog });
    } else {
      const blogs = await BlogModel.find();
      return NextResponse.json({ success: true, blogs });
    }
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ success: false, message: error.message });
  }
}

// api endpoint for uploading data
export async function POST(request) {
  try {
    // 🔹 DB connect
    await connectDB();

    // 🔹 Get formData
    const formData = await request.formData();
    // console.log("FormData received:", formData);

    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 🔹 Convert file → buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 🔹 Ensure uploads folder exists
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    // 🔹 Unique filename
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);
    // console.log("Saving to:", filePath);

    // 🔹 Write file to server
    await writeFile(filePath, buffer);
    const imgUrl = `/uploads/${fileName}`;

    // console.log("File saved at:", imgUrl);

    // Blog data prepare karo
    const blogData = {
      title: `${formData.get("title")}`,
      description: `${formData.get("description")}`,
      category: `${formData.get("category")}`,
      author: `${formData.get("author")}`,
      author_img: "/uploads/author_img.png",
      image: `${imgUrl}`,
      date: Date.now(),
    };
    await BlogModel.create(blogData);

    //  Ab response me dono bhej do
    return NextResponse.json({
      success: true,
      message: "Blog added successfully ",
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  const blog = await BlogModel.findById(id);
  fs.unlink(`./public/uploads${blog.image}`,()=>{})
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({msg:"Blog deleted "})





}