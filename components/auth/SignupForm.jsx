// "use client";
// import React, { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";

// const SignupForm = () => {
//   const router = useRouter();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const { data } = await axios.post("/api/auth/Signup", { name, email, password });
//       if (data.token) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));
//         toast.success("Signup successful!");
//         router.push("/");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.error || "Signup failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded shadow-md w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="border p-2 rounded w-full mb-4"
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border p-2 rounded w-full mb-4"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border p-2 rounded w-full mb-4"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-green-600 text-white py-2 rounded w-full hover:bg-green-700"
//           disabled={loading}
//         >
//           {loading ? "Signing up..." : "Signup"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignupForm;
