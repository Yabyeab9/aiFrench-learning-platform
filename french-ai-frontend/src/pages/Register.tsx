import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import { Link } from "react-router-dom";
import { UserIcon, EnvelopeIcon, LockClosedIcon, SparklesIcon } from "@heroicons/react/24/outline"; // Install @heroicons/react if needed

export default function Register() {
    return (
        <AuthLayout>
            {/* Full-screen gradient background with French flag colors */}
            <div className="min-h-screen bg-gradient-to-br from-blue-500 via-white to-red-500 flex items-center justify-center p-4">
                {/* Centered card with glassmorphism effect */}
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 hover:scale-105">
                    {/* Header with icon and animation */}
                    <div className="text-center mb-8 animate-fade-in">
                        <SparklesIcon className="h-12 w-12 text-red-600 mx-auto mb-4 drop-shadow-lg" />
                        <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-sm">
                            Join the Journey ✨
                        </h1>
                        <p className="text-gray-600 text-sm mt-2 italic">
                            Learn French for life, work, and study
                        </p>
                    </div>

                    {/* Form inputs with enhanced styling */}
                    <div className="space-y-6">
                        <div className="relative">
                            <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <InputField
                                label="Full Name"
                                type="text"
                                placeholder="Your full name"
                                className="pl-10 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            />
                        </div>
                        <div className="relative">
                            <EnvelopeIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <InputField
                                label="Email"
                                type="email"
                                placeholder="you@example.com"
                                className="pl-10 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            />
                        </div>
                        <div className="relative">
                            <LockClosedIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <InputField
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                className="pl-10 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Button with gradient and hover effect */}
                    <div className="mt-8">
                        <PrimaryButton
                            text="Create Account"
                            className="w-full bg-gradient-to-r from-blue-600 to-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-red-700 transform hover:scale-105 transition-all duration-300"
                        />
                    </div>

                    {/* Footer link with hover underline */}
                    <p className="text-sm text-center mt-6 text-gray-600">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-indigo-600 font-semibold hover:underline hover:text-indigo-800 transition-colors duration-200"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
}