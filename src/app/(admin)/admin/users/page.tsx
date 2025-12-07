"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, User, Users, Shield, Search, X, CheckCircle } from "lucide-react";

// Dữ liệu mẫu (Giống trong ảnh Figure 25)
const initialUsers = [
  {
    id: 1,
    fullname: "System Administrator",
    email: "admin@movieticket.com",
    phone: "0987654321",
    role: "Administrator",
    status: "Active",
    avatar: "https://ui-avatars.com/api/?name=System+Admin&background=0D8ABC&color=fff",
  },
  {
    id: 2,
    fullname: "Lin Luu",
    email: "lhlinh01@gmail.com",
    phone: "0123456789",
    role: "User",
    status: "Active",
    avatar: "https://ui-avatars.com/api/?name=Lin+Luu&background=random",
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form data
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    role: "User",
  });

  // Load dữ liệu
  useEffect(() => {
    const savedUsers = localStorage.getItem("adminUsers");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      setUsers(initialUsers);
    }
  }, []);

  // Lưu dữ liệu
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("adminUsers", JSON.stringify(users));
    }
  }, [users]);

  // --- TÍNH TOÁN THỐNG KÊ ---
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === "Active").length;
  const totalAdmins = users.filter(u => u.role === "Administrator").length;

  // Xử lý Modal
  const openAddModal = () => {
    setEditingId(null);
    setFormData({ fullname: "", email: "", phone: "", role: "User" });
    setShowModal(true);
  };

  const openEditModal = (user: any) => {
    setEditingId(user.id);
    setFormData({
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.fullname || !formData.email) return alert("Name and Email are required!");

    if (editingId) {
      // Edit
      setUsers(users.map(u => u.id === editingId ? { ...u, ...formData } : u));
    } else {
      // Add New
      const newUser = {
        id: Date.now(),
        ...formData,
        status: "Active",
        avatar: `https://ui-avatars.com/api/?name=${formData.fullname}&background=random`,
      };
      setUsers([...users, newUser]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      const newUsers = users.filter(u => u.id !== id);
      setUsers(newUsers);
      if (newUsers.length === 0) localStorage.removeItem("adminUsers");
    }
  };

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      {/* Breadcrumb */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-black dark:text-white">User Management</h2>
        <nav>
          <ol className="flex items-center gap-2 text-sm font-medium">
            <li><Link href="/dashboard" className="hover:text-blue-600">Home / Admin /</Link></li>
            <li className="text-blue-600">User Management</li>
          </ol>
        </nav>
      </div>

      {/* --- 3 STATS CARDS --- */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 mb-6">
        {/* Card 1: Total Users */}
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-gray-700 dark:bg-gray-800 flex items-center justify-between">
            <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">{totalUsers}</h4>
                <span className="text-sm font-medium text-gray-500">Total Users</span>
            </div>
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                <Users className="w-6 h-6"/>
            </div>
        </div>

        {/* Card 2: Active Users */}
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-gray-700 dark:bg-gray-800 flex items-center justify-between">
            <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">{activeUsers}</h4>
                <span className="text-sm font-medium text-gray-500">Active Users</span>
            </div>
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
                <CheckCircle className="w-6 h-6"/>
            </div>
        </div>

        {/* Card 3: Administrators */}
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-gray-700 dark:bg-gray-800 flex items-center justify-between">
            <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">{totalAdmins}</h4>
                <span className="text-sm font-medium text-gray-500">Administrators</span>
            </div>
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">
                <Shield className="w-6 h-6"/>
            </div>
        </div>
      </div>

      {/* --- USER LIST TABLE --- */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-gray-700 dark:bg-gray-800">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-stroke dark:border-gray-700">
          <h4 className="text-xl font-bold text-black dark:text-white">User List</h4>
          <button 
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2.5 rounded-md bg-blue-600 py-2 px-6 font-medium text-white hover:bg-blue-700 transition"
          >
            <Plus className="w-5 h-5"/> Create new User
          </button>
        </div>

        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left dark:bg-gray-700">
                <th className="py-4 px-4 font-medium text-gray-500 uppercase text-xs xl:pl-8">FULL NAME</th>
                <th className="py-4 px-4 font-medium text-gray-500 uppercase text-xs">EMAIL</th>
                <th className="py-4 px-4 font-medium text-gray-500 uppercase text-xs">PHONE</th>
                <th className="py-4 px-4 font-medium text-gray-500 uppercase text-xs">ROLE</th>
                <th className="py-4 px-4 font-medium text-gray-500 uppercase text-xs text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-stroke dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-4 px-4 xl:pl-8">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full overflow-hidden">
                            <img src={user.avatar} alt="User" className="h-full w-full object-cover"/>
                        </div>
                        <p className="font-medium text-black dark:text-white">{user.fullname}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-black dark:text-white">{user.email}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-black dark:text-white">{user.phone || "N/A"}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex rounded-full py-1 px-3 text-xs font-bold ${
                        user.role === 'Administrator' 
                        ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                        : 'bg-gray-100 text-gray-700 border border-gray-200'
                    }`}>
                        {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => openEditModal(user)} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded transition">
                        <Pencil className="w-4 h-4"/>
                      </button>
                      <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:bg-red-50 p-1.5 rounded transition">
                        <Trash2 className="w-4 h-4"/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL ADD/EDIT USER --- */}
      {showModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-2xl dark:bg-gray-800">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-black dark:text-white flex items-center gap-2">
                        <User className="w-6 h-6 text-blue-600"/> 
                        {editingId ? "Edit User" : "Create New User"}
                    </h3>
                    <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-red-500 transition">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-black dark:text-white">Full Name</label>
                        <input 
                            type="text" 
                            className="w-full rounded border border-stroke bg-transparent py-3 px-4 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700"
                            value={formData.fullname}
                            onChange={(e) => setFormData({...formData, fullname: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-black dark:text-white">Email</label>
                        <input 
                            type="email" 
                            className="w-full rounded border border-stroke bg-transparent py-3 px-4 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-black dark:text-white">Phone</label>
                        <input 
                            type="text" 
                            className="w-full rounded border border-stroke bg-transparent py-3 px-4 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-black dark:text-white">Role</label>
                        <select 
                            className="w-full rounded border border-stroke bg-transparent py-3 px-4 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700"
                            value={formData.role}
                            onChange={(e) => setFormData({...formData, role: e.target.value})}
                        >
                            <option value="User">User</option>
                            <option value="Administrator">Administrator</option>
                        </select>
                    </div>

                    <button 
                        onClick={handleSave}
                        className="flex w-full items-center justify-center gap-2 rounded bg-blue-600 p-3 font-medium text-white hover:bg-blue-700 transition mt-4"
                    >
                        {editingId ? "Update User" : "Create User"}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}