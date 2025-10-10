import { assets } from "@/Assets/assets";
import Image from "next/image";
import React from "react";
import { Trash2 } from "lucide-react";

const BlogTableitem = ({
  author_img,
  title,
  author,
  date,
  deleteBlog,
  mongoId,
}) => {
  const Blogdate = new Date(date);
  return (
    <tr className="bg-white border-b ">
      <th
        scope="row"
        className=" items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        <Image
          width={50}
          height={50}
          src={author_img ? author_img : assets.profile_icon}
        />

        <p>{author ? author : "No author"}</p>
      </th>
      <td className="px-6 py-4 ">{title ? title : "No title"}</td>
      <td className="px-6 py-4 ">{Blogdate.toDateString()}</td>
      <td
        onClick={() => deleteBlog(mongoId)}
        className="cursor-pointer px-6 py-4 text-red-500 hover:text-red-700 transition-all"
      >
        <Trash2 size={18} />
      </td>
    </tr>
  );
};

export default BlogTableitem;
