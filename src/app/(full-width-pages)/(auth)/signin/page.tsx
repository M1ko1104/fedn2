"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@movieticket.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Giả lập login: Chờ 1s rồi chuyển hướng
    setTimeout(() => {
      // 1. Tạo cookie giả để vượt qua middleware
      document.cookie = "token=abc-xyz; path=/; max-age=86400"; 
      
      // 2. Chuyển hướng vào trang Dashboard
      // Lưu ý: Nếu trang dashboard của bạn nằm ở folder (admin), 
      // đường dẫn có thể là /dashboard hoặc /admin/dashboard tùy cấu hình
      router.push("/dashboard"); 
      
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      {/* Box trắng chứa form */}
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg border border-gray-100">
        
        {/* Tiêu đề */}
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Login</h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-blue-50/30 px-4 py-3 text-gray-700 focus:border-blue-500 focus:bg-white focus:outline-none transition"
              placeholder="admin@movieticket.com"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-blue-50/30 px-4 py-3 text-gray-700 focus:border-blue-500 focus:bg-white focus:outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Remember Me */}
          <div className="mb-6 flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
              Remember me
            </label>
          </div>

          {/* Nút Login màu xanh */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Link đăng ký bên dưới */}
        <div className="mt-6 text-center">
          <Link 
            href="/auth/signup" 
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Register a new account
          </Link>
        </div>
      </div>
    </div>
  );
}