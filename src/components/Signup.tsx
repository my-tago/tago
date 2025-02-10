"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import BackgroundGrid from "./BackgroundGrid";
import PasswordInput from "./PasswordInput";

const Signup = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data: Record<string, string> = Object.fromEntries(formData) as Record<string, string>;

      interface SignupResponse {
        message: string;
        token: string;
        user: { username: string };
      }

      const response = await axios.post<SignupResponse>("/api/auth/signup", data, {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      router.push(`/verify-email`);
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BackgroundGrid>
      <div className="relative flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 bg-black p-8 rounded-xl border border-white/10">
          <div>
            <h2 className="text-3xl font-bold text-center text-white mb-8">
              Create Account
            </h2>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 block w-full rounded-md bg-black border border-white/20 
                         text-white px-3 py-2 focus:border-white focus:ring-1 focus:ring-white
                         outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="mt-1 block w-full rounded-md bg-black border border-white/20 
                         text-white px-3 py-2 focus:border-white focus:ring-1 focus:ring-white
                         outline-none"
                placeholder="username"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full rounded-md bg-black border border-white/20 
                         text-white px-3 py-2 focus:border-white focus:ring-1 focus:ring-white
                         outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                Contact Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="mt-1 block w-full rounded-md bg-black border border-white/20 
                         text-white px-3 py-2 focus:border-white focus:ring-1 focus:ring-white
                         outline-none"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <PasswordInput id="password" name="password" required />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-white rounded-md 
                       shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-100 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white
                       transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="text-center">
            <a
              href="/login"
              className="text-white/60 hover:text-white text-sm transition-colors duration-200"
            >
              Already have an account? Sign in
            </a>
          </div>
        </div>
      </div>
    </BackgroundGrid>
  );
};

export default Signup;
