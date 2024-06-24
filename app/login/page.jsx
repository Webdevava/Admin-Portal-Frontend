// pages/index.js
"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear any previous errors

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      const { token } = response.data;

      // Store token in localStorage
      localStorage.setItem("token", token);

      // Redirect to /portal
      router.push("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle invalid credentials
        setError("Invalid email or password");
      } else if (error.response) {
        // Handle other server errors
        setError(
          error.response.data.message || "An error occurred during login"
        );
      } else if (error.request) {
        // Handle network errors
        setError(
          "Unable to connect to the server. Please check your internet connection."
        );
      } else {
        // Handle unexpected errors
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="john@example.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center mt-2">{error}</div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
