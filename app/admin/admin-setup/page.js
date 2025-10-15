"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function AdminSetup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/create-admin", {
        name,
        email,
        password,
      });

      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      toast.error(err.response?.data?.error || "Admin creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 border border-black shadow-[-7px_7px_0px_#000000] max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Admin Account
        </h2>
        <input
          type="text"
          placeholder="Admin Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="pl-4 outline-none border border-black w-full py-3 mb-4"
          required
        />
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-4 outline-none border border-black w-full py-3 mb-4"
          required
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="pl-4 outline-none border border-black w-full py-3 mb-4"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="border border-black py-3 w-full active:bg-gray-600 active:text-white shadow-[-7px_7px_0px_#000000] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
        >
          {loading ? "Creating Admin..." : "Create Admin"}
        </button>
      </form>
    </div>
  );
}
