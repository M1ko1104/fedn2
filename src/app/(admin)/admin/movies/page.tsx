"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Pencil, Trash2, Eye, Film, X, Upload } from "lucide-react";

// Dữ liệu mẫu ban đầu (chỉ dùng khi chưa có gì trong kho lưu trữ)
const defaultMovies = [
  {
    id: 1,
    title: "Stranger Things",
    duration: "120 minutes",
    description: "Cậu bé mất tích là một loạt phim truyền hình...",
    poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=100&q=80",
  },
  {
    id: 2,
    title: "The Conjuring",
    duration: "145 minutes",
    description: "The Conjuring: Nghi lễ cuối cùng là bộ phim...",
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cd4?w=100&q=80",
  },
];

export default function MoviesPage() {
  // Khởi tạo state rỗng trước, sẽ load dữ liệu sau
  const [movies, setMovies] = useState<any[]>([]); 
  const [searchTerm, setSearchTerm] = useState("");
  
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    description: "",
    poster: "",
  });

  // --- 1. LOAD DỮ LIỆU TỪ LOCAL STORAGE KHI VÀO TRANG ---
  useEffect(() => {
    const savedMovies = localStorage.getItem("adminMovies");
    if (savedMovies) {
      setMovies(JSON.parse(savedMovies));
    } else {
      setMovies(defaultMovies); // Nếu chưa có thì dùng dữ liệu mẫu
    }
  }, []);

  // --- 2. TỰ ĐỘNG LƯU KHI DỮ LIỆU THAY ĐỔI ---
  useEffect(() => {
    if (movies.length > 0) {
      localStorage.setItem("adminMovies", JSON.stringify(movies));
    }
  }, [movies]);

  // Các hàm xử lý Modal
  const openAddModal = () => {
    setEditingId(null);
    setFormData({ title: "", duration: "", description: "", poster: "" });
    setShowModal(true);
  };

  const openEditModal = (movie: any) => {
    setEditingId(movie.id);
    setFormData({
      title: movie.title,
      duration: movie.duration,
      description: movie.description,
      poster: movie.poster,
    });
    setShowModal(true);
  };

  // --- 3. LOGIC LƯU (QUAN TRỌNG) ---
  const handleSave = () => {
    if (!formData.title || !formData.duration) {
      alert("Please fill in at least Title and Duration!");
      return;
    }

    if (editingId) {
      // --- LOGIC SỬA ---
      // Tạo ra mảng mới, tìm thằng có id trùng thì thay thế
      const updatedMovies = movies.map((m) => 
        m.id === editingId ? { ...m, ...formData } : m
      );
      setMovies(updatedMovies);
    } else {
      // --- LOGIC THÊM MỚI ---
      const newMovie = {
        id: Date.now(), // Dùng thời gian làm ID để không trùng
        ...formData,
        poster: formData.poster || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=100&q=80", 
      };
      setMovies([newMovie, ...movies]);
    }

    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this movie?")) {
      const remainingMovies = movies.filter((movie) => movie.id !== id);
      setMovies(remainingMovies);
      // Khi movies thay đổi, useEffect ở trên sẽ tự động lưu lại vào LocalStorage
    }
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 relative">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-black dark:text-white">Movies</h2>
        <nav>
          <ol className="flex items-center gap-2">
            <li><Link className="font-medium" href="/dashboard">Home / Admin /</Link></li>
            <li className="font-medium text-blue-600">Movies</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-gray-700 dark:bg-gray-800">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex flex-col md:flex-row justify-between items-center gap-4">
          <h4 className="text-xl font-bold text-black dark:text-white flex items-center gap-2">
             <Film className="w-6 h-6"/> Movie List
          </h4>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
                <input 
                    type="text" 
                    placeholder="Search movie..." 
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>

            <button 
                onClick={openAddModal}
                className="flex items-center gap-2 rounded bg-blue-600 py-2 px-4.5 font-medium text-white hover:bg-blue-700 transition whitespace-nowrap"
            >
                <Plus className="w-5 h-5" /> Add New Movie
            </button>
          </div>
        </div>

        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left dark:bg-gray-700">
                <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">TITLE</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">DURATION</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">DESCRIPTION</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovies.map((movie) => (
                <tr key={movie.id} className="border-b border-stroke dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-5 px-4 pl-9 xl:pl-11">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="h-12.5 w-15 rounded-md overflow-hidden flex-shrink-0">
                        <img src={movie.poster} alt="Poster" className="h-full w-full object-cover" />
                      </div>
                      <p className="text-sm font-semibold text-black dark:text-white">{movie.title}</p>
                    </div>
                  </td>
                  <td className="py-5 px-4"><p className="text-black dark:text-white text-sm">{movie.duration}</p></td>
                  <td className="py-5 px-4 max-w-[300px]">
                    <p className="text-black dark:text-white text-sm truncate opacity-80">{movie.description}</p>
                  </td>
                  <td className="py-5 px-4">
                    <div className="flex items-center space-x-3.5">
                      <button className="hover:text-blue-600"><Eye className="w-5 h-5" /></button>
                      <button 
                        onClick={() => openEditModal(movie)} 
                        className="hover:text-green-600"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(movie.id)} className="hover:text-red-600"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-2xl dark:bg-gray-800">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-black dark:text-white">
                      {editingId ? "Edit Movie" : "Add New Movie"}
                    </h3>
                    <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-red-500">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-black dark:text-white">Movie Title</label>
                        <input 
                            type="text" 
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-blue-500 active:border-blue-500 dark:border-gray-600 dark:bg-gray-700"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-black dark:text-white">Duration</label>
                            <input 
                                type="text" 
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-blue-500 active:border-blue-500 dark:border-gray-600 dark:bg-gray-700"
                                value={formData.duration}
                                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                            />
                        </div>
                        <div>
                             <label className="mb-2 block text-sm font-medium text-black dark:text-white">Poster URL</label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-blue-500 active:border-blue-500 dark:border-gray-600 dark:bg-gray-700"
                                    value={formData.poster}
                                    onChange={(e) => setFormData({...formData, poster: e.target.value})}
                                />
                                <Upload className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-black dark:text-white">Description</label>
                        <textarea 
                            rows={4}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-blue-500 active:border-blue-500 dark:border-gray-600 dark:bg-gray-700"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                        ></textarea>
                    </div>

                    <button 
                        onClick={handleSave}
                        className={`flex w-full justify-center rounded p-3 font-medium text-white transition ${editingId ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {editingId ? "Update Movie" : "Create Movie"}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}