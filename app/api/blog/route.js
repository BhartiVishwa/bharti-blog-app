import { connectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import BlogModel from "@/lib/models/BlogModel";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import cloudinary from "cloudinary";
import streamifier from "streamifier";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

export async function POST(request) {
  try {
    await connectDB();
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Cloudinary using stream
    const uploadFromBuffer = (buffer) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
          { folder: "blog_images" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });

    const uploadResponse = await uploadFromBuffer(buffer);

    // Save blog data
    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      author_img: uploadResponse.secure_url,
      image: uploadResponse.secure_url,
      date: Date.now(),
      cloudinary_id: uploadResponse.public_id,
    };

    await BlogModel.create(blogData);

    return NextResponse.json({
      success: true,
      message: "Blog added successfully 🚀",
      imageUrl: uploadResponse.secure_url,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
  