"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async () => {
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    const redirectTo = searchParams.get("redirectTo") || "/dashboard";
    router.push(redirectTo);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      {/* Card */}
      <div className="bg-white p-8 rounded-xl w-full max-w-md shadow-xl border border-gray-200">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Sign In
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        {/* Email */}
        <input
          className="w-full mb-4 px-4 py-3 rounded-md bg-gray-50 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          className="w-full mb-6 px-4 py-3 rounded-md bg-gray-50 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold py-3 rounded-md"
        >
          Login
        </button>

        {/* Register Link */}
        <p className="text-gray-500 text-sm mt-6 text-center">
          New here?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}