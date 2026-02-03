// import  { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Ui from "../components/ui/AuthCard.tsx";
// import Input from "../components/ui/Input.tsx";
// import Button from "../components/ui/Button.tsx";
// import { UserIcon, LockClosedIcon, FlagIcon } from "@heroicons/react/24/outline";
//
// interface LoginRequest {
//     email: string;
//     password: string;
// }
//
// interface JwtAuthenticationResponse {
//     token: string;
// }
//
// export default function Login() {
//     const [email, setEmail] = useState<string>("");
//     const [password, setPassword] = useState<string>("");
//     const [loading, setLoading] = useState<boolean>(false);
//
//     const handleLogin = async () => {
//         setLoading(true);
//         const loginData: LoginRequest = { email, password };
//
//         try {
//             const response = await axios.post<JwtAuthenticationResponse>(
//                 "http://localhost:8080/api/login",
//                 loginData
//             );
//
//             console.log("Login successful:", response.data);
//             localStorage.setItem("token", response.data.token);
//             alert("Login successful!");
//         } catch (error: any) {
//             console.error("Login failed:", error.response?.data || error.message);
//             alert("Login failed! Check credentials.");
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return (
//         <Ui>
//             {/* Full-screen gradient background with French flag colors */}
//             <div className="min-h-screen bg-gradient-to-br from-blue-500 via-white to-red-500 flex items-center justify-center p-4">
//                 {/* Centered card with glassmorphism effect */}
//                 <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 hover:scale-105">
//                     {/* Header with icon and animation */}
//                     <div className="text-center mb-8 animate-fade-in">
//                         <FlagIcon className="h-12 w-12 text-blue-600 mx-auto mb-4 drop-shadow-lg" />
//                         <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-sm">
//                             Welcome Back 🇫🇷
//                         </h1>
//                         <p className="text-gray-600 text-sm mt-2 italic">
//                             Practice French with AI conversations
//                         </p>
//                     </div>
//
//                     {/* Form inputs with enhanced styling */}
//                     <div className="space-y-6">
//                         <div className="relative">
//                             <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                             <Input
//                                 label="Email"
//                                 type="email"
//                                 placeholder="you@example.com"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 className="pl-10 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//                             />
//                         </div>
//                         <div className="relative">
//                             <LockClosedIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                             <Input
//                                 label="Password"
//                                 type="password"
//                                 placeholder="••••••••"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 className="pl-10 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//                             />
//                         </div>
//                     </div>
//
//                     {/* Button with gradient and hover effect */}
//                     <div className="mt-8">
//                         <Button
//                             text={loading ? "Logging in..." : "Login"}
//                             onClick={handleLogin} // ✅ Corrected
//                             className="w-full bg-gradient-to-r from-blue-600 to-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-red-700 transform hover:scale-105 transition-all duration-300"
//                         />
//                     </div>
//
//                     {/* Footer link with hover underline */}
//                     <p className="text-sm text-center mt-6 text-gray-600">
//                         New here?{" "}
//                         <Link
//                             to="/register"
//                             className="text-indigo-600 font-semibold hover:underline hover:text-indigo-800 transition-colors duration-200"
//                         >
//                             Create an account
//                         </Link>
//                     </p>
//                 </div>
//             </div>
//         </Ui>
//     );
// }
