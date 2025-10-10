"use client";
import SubsTableitem from "@/components/AdminComponents/SubsTableitem";
import React, { use } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [emails, setEmails] = useState([]);

  // 🔹 Fetch all emails
  const fetchEmails = async () => {
    try {
      const response = await axios.get("/api/email");
      setEmails(response.data.emails || []); // if no emails, avoid error
    } catch (error) {
      console.error("Error fetching emails:", error);
      toast.error("Failed to fetch emails ");
    }
  };

  const deleteEmail = async (mongoId) => {
    const response = await axios.delete("/api/email", {
      params: { id: mongoId },
    });
    if (response.data.success) {
      toast.success(response.data.msg);
      fetchEmails();
    } else {
      toast.error(response.data.msg || "Something went wrong");
    }
  };
  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-6 sm:pl-12">
      <div className="text-xl font-semibold">
        <h1>All Subscription</h1>
      </div>
      <div className="relative max-w-[600px] h-[80vh] overflow -x--auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm text-left text-gray-700 uppercase  bg-[#F5F5F5]">
            <tr>
              <th className="px-6 py-3 ">Email Subscription</th>
              <th className=" hidden sm:block px-6 py-3 ">Date</th>
              <th className="px-6 py-3 ">Action</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((item, index) => (
              <SubsTableitem
                key={index}
                mongoId={item._id}
                deleteEmail={deleteEmail}
                email={item.email}
                date={item.date}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
