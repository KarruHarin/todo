import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SignUpPage = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState(null);
//  const navigate = useNavigate();
//   const sendData = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }
//     try {
//       const response = await axios.post("http://localhost:8000/v1/users/register", {
//         username,
//         email,
//         password
//       });
//       console.log(response.data);
//       if (response.data.statusCode==200) {
//         navigate("/login")
//       }
//     } catch (error) {
//       setError(error.response.data.message || "An error occurred");
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-900 w-full">
//       <div className="hidden md:flex md:w-1/2 items-center justify-center">
//         <div className="text-center transform transition-transform duration-500 hover:scale-105">
//           <h1 className="text-4xl font-bold text-white">Join Us!</h1>
//           <p className="mt-4 text-lg text-gray-300">Create your account to get started. It's free and only takes a minute.</p>
//           <p className="mt-2 text-sm text-gray-400">Already have an account? Please login.</p>
//         </div>
//       </div>
//       <div className="w-full flex items-center justify-center md:w-1/2">
//         <div className="bg-white p-8 rounded-lg shadow-lg w-96 h-auto transform transition-transform duration-500 hover:scale-105">
//           <h2 className="text-2xl font-bold mb-6 text-center text-black">Sign Up</h2>

//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
//               {error}
//             </div>
//           )}

//           <form className="space-y-4" onSubmit={sendData}>
//             <div>
//               <label className="block text-sm font-medium text-black" htmlFor="name">Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-500"
//                 onChange={(e) => setUsername(e.target.value)}
//                 value={username}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-black" htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-500"
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-black" htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-500"
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-black" htmlFor="confirm-password">Confirm Password</label>
//               <input
//                 type="password"
//                 id="confirm-password"
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-500"
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 value={confirmPassword}
//               />
//             </div>
//             <div>
//               <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300">Sign Up</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
};

export default SignUpPage;
