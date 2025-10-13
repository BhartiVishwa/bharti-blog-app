"use client";

import { assets } from "@/Assets/assets";
import Image from "next/image";
import { useState } from "react";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  // Handle "Subscribe" form
  const onsubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    try {
      const response = await axios.post("/api/email", formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setEmail("");
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  // Handle "Get Started" button
  // const handleGetStarted = () => {
  //   const token = localStorage.getItem("token"); // Example: check JWT in localStorage
  //   if (token) {
  //     router.push("/admin"); // Logged in → admin/dashboard
  //   } else {
  //     router.push("/signup"); // Not logged in → signup
  //   }
  // };

  return (
    <div className="py-5 px-5 md:px-12 lg:px-20">
      <div className="flex justify-between items-center">
        <Image
          src={assets.logo}
          width={180}
          alt="logo"
          className="w-[130px] sm:w-auto"
        />
        <Link href={"/admin"}>
        <button 
          // onClick={handleGetStarted}
          className="flex items-center gap-2 font-medium py-1 px-3 sm:py-2 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000] 
          active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
        >
          Get Started
          <Image src={assets.arrow} alt="arrow" />
        </button>
        </Link>
      </div>

      <div className="text-center py-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet sit
          similique aut delectus nostrum! Optio laborum vero mollitia tenetur
          facere.
        </p>

        <form
          onSubmit={onsubmitHandler}
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            className="pl-4 outline-none border border-black flex-1 py-3"
          />
          <button
            type="submit"
            className="border border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
