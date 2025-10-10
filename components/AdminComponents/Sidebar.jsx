"use client";
import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // ✅ menu icons
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
     
      <button
        className="sm:hidden fixed top-4 left-4 z-50 bg-slate-800 text-white p-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 min-h-screen bg-slate-100 transition-transform duration-300 z-40 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        sm:translate-x-0 sm:static sm:flex sm:flex-col w-[13rem] sm:w-[12rem] md:w-[18rem] lg:w-[18rem] border border-black`}
      >
        {/* Logo Section */}
        <Link href={'/'} className="flex items-center justify-center sm:justify-start px-4 py-4 border-b border-black">
          <Image src={assets.logo} width={120} alt="Logo" className="hidden sm:block" />
          <Image src={assets.logo} width={40} alt="Logo small" className="sm:hidden" />
        </Link>

        {/* Menu Section */}
        <div className="flex flex-col items-center sm:items-start gap-4 pl-3 sm:pl-10  pr-0 pt-4 pb-4 w-full box-border  border-black">
          {/* Add Blog */}
          <Link href="/admin/addProduct" className="flex items-center gap-3 font-medium px-3 py-2 bg-white shadow-[-3px_3px_0px_#000000] w-full border border-black hover:bg-gray-50 cursor-pointer 
           active:translate-y-1 active:translate-x-1 active:shadow-none transition-all">
            <Image src={assets.add_icon} alt="Add Blog" width={20} />
            <p className={`${isOpen ? "block" : "hidden"} sm:block`}>Add Blog</p>

          </Link>

          {/* Blog List */}
          <Link href="/admin/blogList" className="flex items-center gap-3 font-medium px-3 py-2 bg-white shadow-[-3px_3px_0px_#000000] w-full border border-black hover:bg-gray-50 cursor-pointer  
          active:translate-y-1 active:translate-x-1 active:shadow-none transition-all">
            <Image src={assets.blog_icon} alt="Blog List" width={20} />
            <p className={`${isOpen ? "block" : "hidden"} sm:block`}>Blog List</p>
          </Link>

          {/* Subscription */}
          <Link href="/admin/subscriptions" className="flex items-center gap-3 font-medium px-3 py-2 bg-white shadow-[-3px_3px_0px_#000000] w-full border border-black hover:bg-gray-50 cursor-pointer 
           active:translate-y-1 active:translate-x-1 active:shadow-none transition-all">
            <Image src={assets.email_icon} alt="Subscription" width={20} />
            <p className={`${isOpen ? "block" : "hidden"} sm:block`}>Subscriptions</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;



// import { assets } from "@/Assets/assets";
// import Image from "next/image";
// import React from "react";

// const Sidebar = () => {
//   return (
//     <div className="flex flex-col bg-slate-100 ">
//       <div className="px-2 sm:pl-14 py-3 border border-black">
//         <Image src={assets.logo} width={120} alt="" />
//       </div>
//       <div className="w-28 sm:w-80 h-[100vh] relative py-12 border  border-black">
//         <div className="w-[50%] sm:w-[80%] absolute right-0">
//           <div className="flex  items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]">
//           <Image src={assets.add_icon} alt="blog" width={20} /><p>Add Blog</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
