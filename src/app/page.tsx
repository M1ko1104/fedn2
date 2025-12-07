"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Film, Calendar, LogIn, Play, Clock, Star, Ticket, Video, CheckCircle } from "lucide-react";

// Dữ liệu mẫu ban đầu (Dùng khi chưa có dữ liệu từ Admin)
const defaultMovies = [
  {
    id: 1,
    title: "Stranger Things",
    genre: "Sci-Fi / Horror",
    duration: "120 minutes",
    rating: 9.8,
    poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=500", 
    isHot: true,
  },
  {
    id: 2,
    title: "How to Train Your Dragon",
    genre: "Animation",
    duration: "112 minutes",
    rating: 9.5,
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=500",
    isHot: true,
  },
  {
    id: 3,
    title: "The Conjuring",
    genre: "Horror",
    duration: "145 minutes",
    rating: 8.9,
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cd4?auto=format&fit=crop&q=80&w=500",
    isHot: false,
  },
];

export default function LandingPage() {
  // State lưu danh sách phim
  const [movies, setMovies] = useState<any[]>([]);

  // --- LOGIC ĐỒNG BỘ: Lấy dữ liệu từ Admin (localStorage) ---
  useEffect(() => {
    // 1. Lấy dữ liệu từ kho 'adminMovies' (Do trang Admin tạo ra)
    const savedMovies = localStorage.getItem("adminMovies");
    
    if (savedMovies) {
      const parsedMovies = JSON.parse(savedMovies);
      // Admin lưu dữ liệu hơi khác (thiếu genre, rating), ta sẽ bù đắp giả lập
      const enrichedMovies = parsedMovies.map((m: any) => ({
        ...m,
        genre: "Cinema", // Mặc định vì Admin chưa có nhập thể loại
        rating: (Math.random() * (5 - 4) + 4).toFixed(1), // Random rating từ 4.0 - 5.0 cho đẹp
        isHot: Math.random() < 0.5, // Random phim hot
        poster: m.poster // Admin dùng key là 'poster', khớp với code dưới
      }));
      setMovies(enrichedMovies);
    } else {
      // 2. Nếu Admin chưa thêm gì thì dùng dữ liệu mẫu
      setMovies(defaultMovies);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#020d1e] text-white font-sans selection:bg-blue-500 selection:text-white">
      
      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[#020d1e]/90 backdrop-blur-md border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Film className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">GenZmephim</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-gray-400 font-medium text-sm">
          <Link href="/" className="flex items-center gap-2 text-white font-semibold transition">
            <Play className="w-4 h-4" /> Home
          </Link>
          <Link href="/movies" className="flex items-center gap-2 hover:text-white transition">
             Movies
          </Link>
          <Link href="/showtimes" className="flex items-center gap-2 hover:text-white transition">
             Showtimes
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/auth/register" className="hidden md:block px-4 py-2 text-sm font-semibold text-blue-500 border border-blue-900/30 rounded-lg hover:border-blue-500 transition">
            Register
          </Link>
          <Link 
            href="/auth/signin" 
            className="flex items-center gap-2 px-5 py-2 text-sm font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-[0_0_20px_rgba(37,99,235,0.3)]"
          >
            <LogIn className="w-4 h-4" /> Login
          </Link>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] border-b border-gray-800">
        <div className="flex flex-col justify-center px-6 md:px-16 lg:px-24 py-12 space-y-8 bg-gradient-to-b from-[#020d1e] to-[#051125]">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Movie Tickets
            </h1>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300">
              GenZmephim
            </h1>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-200 mb-3 flex items-center gap-2">
                <Video className="w-5 h-5"/> About GenZmephim
            </h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg">
              At GenZmephim, we bring the cinema experience closer to you with our fast,
              simple, and secure online ticket booking platform.
            </p>
          </div>
          <p className="text-white font-medium italic border-l-4 border-blue-600 pl-4 py-1">
            Lights. Camera. Let's go!
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-3 bg-blue-600 rounded-lg font-bold hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-600/20">
              <Ticket className="w-5 h-5" /> Browse Movies
            </button>
            <button className="px-8 py-3 border border-gray-600 rounded-lg font-bold text-gray-300 hover:border-white hover:text-white transition flex items-center gap-2">
              <Calendar className="w-5 h-5" /> View Showtimes
            </button>
          </div>
        </div>
        <div className="relative hidden lg:block h-full bg-black">
          {/* Ảnh Banner */}
          <div className="absolute inset-0 w-full h-full">
             <img src="/banner.png" alt="Banner" className="w-full h-full object-cover opacity-80" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#020d1e] via-[#020d1e]/40 to-transparent"></div>
        </div>
      </section>

      {/* --- NOW SHOWING SECTION (DỮ LIỆU TỪ ADMIN) --- */}
      <section className="px-6 md:px-16 lg:px-24 py-20 bg-[#020d1e]">
        <div className="flex items-end justify-between mb-10 border-b border-gray-800 pb-4">
            <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
                <div>
                    <h2 className="text-3xl font-bold">Now Showing</h2>
                    <p className="text-gray-500 text-sm mt-1">Book your tickets now</p>
                </div>
            </div>
            <Link href="/movies" className="text-sm text-blue-500 hover:text-blue-400 flex items-center gap-1 font-semibold mb-1">
                View all <Play className="w-3 h-3" />
            </Link>
        </div>

        {/* --- GRID PHIM --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {movies.length > 0 ? movies.map((movie) => (
                <div key={movie.id} className="group bg-[#0b1221] rounded-2xl overflow-hidden border border-gray-800/50 hover:border-blue-600/50 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300">
                    <div className="relative h-[320px] w-full overflow-hidden bg-gray-800">
                        <img 
                            src={movie.poster} 
                            alt={movie.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            onError={(e) => {
                                // Nếu ảnh lỗi thì hiện ảnh mặc định
                                e.currentTarget.src = "https://via.placeholder.com/300x450?text=No+Image";
                            }}
                        />
                        {movie.isHot && (
                            <div className="absolute top-3 right-3 px-2 py-1 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider rounded shadow-lg">HOT</div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0b1221] to-transparent"></div>
                    </div>

                    <div className="p-5 relative -mt-6">
                        <div className="flex items-center justify-between mb-2">
                             <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold bg-yellow-500/10 px-2 py-1 rounded">
                                <Star className="w-3 h-3 fill-yellow-500" /> {movie.rating || "5.0"}
                            </div>
                            <span className="text-xs text-gray-400 font-medium">{movie.duration}</span>
                        </div>
                        
                        <h3 className="text-lg font-bold truncate text-white mb-1 group-hover:text-blue-400 transition" title={movie.title}>
                            {movie.title}
                        </h3>
                        <p className="text-xs text-gray-500 mb-4 truncate">{movie.genre}</p>

                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-900/20">
                                Book
                            </button>
                            <button className="flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-gray-400 bg-gray-800/50 rounded-lg hover:bg-gray-700 hover:text-white transition">
                                Details
                            </button>
                        </div>
                    </div>
                </div>
            )) : (
                <p className="text-gray-500 col-span-4 text-center">No movies available.</p>
            )}
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="px-6 md:px-16 lg:px-24 py-20 bg-[#0b1221] border-t border-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
                <div>
                    <h2 className="text-3xl font-bold mb-3">Why Choose Us?</h2>
                    <p className="text-gray-400">Great movie experience with attractive offers tailored just for you.</p>
                </div>
                
                <div className="space-y-6">
                    {[
                        { title: "Easy Booking", desc: "Book tickets online in minutes.", icon: Ticket },
                        { title: "Latest Movies", desc: "Always updated with the newest movies.", icon: Film },
                        { title: "Great Promotions", desc: "Special discounts for members.", icon: Star }
                    ].map((item, idx) => (
                        <div key={idx} className="flex gap-5 group">
                            <div className="mt-1 w-12 h-12 bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-lg group-hover:text-blue-400 transition">{item.title}</h4>
                                <p className="text-sm text-gray-400 leading-relaxed mt-1">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Box thống kê */}
            <div className="bg-white text-gray-900 p-8 rounded-3xl shadow-2xl max-w-md mx-auto lg:ml-auto w-full">
                <div className="text-center mb-8">
                    <h3 className="text-xl font-extrabold text-gray-900">GenZmephim Stats</h3>
                </div>
                <div className="flex justify-between text-center divide-x divide-gray-200">
                    <div className="px-2 flex-1">
                        <div className="text-3xl font-black text-blue-600">{movies.length}+</div>
                        <div className="text-[10px] uppercase font-bold text-gray-500 mt-2">Movies</div>
                    </div>
                    <div className="px-2 flex-1">
                        <div className="text-3xl font-black text-green-600">5</div>
                        <div className="text-[10px] uppercase font-bold text-gray-500 mt-2">Screens</div>
                    </div>
                    <div className="px-2 flex-1">
                        <div className="text-3xl font-black text-purple-600">24/7</div>
                        <div className="text-[10px] uppercase font-bold text-gray-500 mt-2">Support</div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <footer className="py-8 text-center text-gray-600 text-sm border-t border-gray-800 bg-[#020d1e]">
        <p>&copy; 2025 GenZmephim. Built for movie lovers.</p>
      </footer>
    </div>
  );
}