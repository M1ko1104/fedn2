"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, X, Filter, ChevronDown, Eye, Download, Calendar, MapPin, Armchair, Clock, CreditCard, User } from "lucide-react";

// 1. CẬP NHẬT DỮ LIỆU MẪU (Thêm thông tin ghế, loại ghế)
const initialBookings = [
  {
    id: "BK-7890",
    user: "admin@movieticket.com",
    phone: "0987654321",
    movie: "Stranger Things",
    poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=100&q=80",
    screen: "Screen 1",
    screenType: "2D Standard", // Loại màn/phòng
    seatNumber: "F5, F6",
    seatType: "VIP", // Loại ghế
    showDate: "18/06/2025",
    showTime: "20:20",
    bookingDate: "16/06/2025",
    bookingTime: "07:23",
    status: "Pending",
    amount: 240000, // Tổng tiền
  },
  {
    id: "BK-7891",
    user: "john.doe@gmail.com",
    phone: "0123456789",
    movie: "The Conjuring",
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cd4?w=100&q=80",
    screen: "Screen 2",
    screenType: "2D Standard",
    seatNumber: "A10",
    seatType: "Standard",
    showDate: "18/06/2025",
    showTime: "22:00",
    bookingDate: "16/06/2025",
    bookingTime: "06:51",
    status: "Cancelled",
    amount: 120000,
  },
  {
    id: "BK-7892",
    user: "lhlinh01@gmail.com",
    phone: "0912345678",
    movie: "Stranger Things",
    poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=100&q=80",
    screen: "IMAX Hall",
    screenType: "IMAX 3D",
    seatNumber: "K12, K13",
    seatType: "Couple",
    showDate: "19/06/2025",
    showTime: "14:00",
    bookingDate: "16/06/2025",
    bookingTime: "06:46",
    status: "Completed",
    amount: 300000,
  },
];

export default function BookingsPage() {
  const [bookings, setBookings] = useState(initialBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  // State cho Modal Xem Chi Tiết
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Completed": return "bg-green-100 text-green-700 border-green-200";
      case "Cancelled": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const handleSearch = () => {
    let filtered = initialBookings;
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(b => 
        b.id.toLowerCase().includes(lower) || b.user.toLowerCase().includes(lower) || b.movie.toLowerCase().includes(lower)
      );
    }
    if (statusFilter !== "All Statuses") {
      filtered = filtered.filter(b => b.status === statusFilter);
    }
    setBookings(filtered);
  };

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-black dark:text-white">Booking Management</h2>
        <nav>
          <ol className="flex items-center gap-2 text-sm font-medium">
            <li><Link href="/admin/dashboard" className="hover:text-blue-600">Home / Admin /</Link></li>
            <li className="text-blue-600">Bookings</li>
          </ol>
        </nav>
      </div>

      {/* Filter Section */}
      <div className="mb-6 rounded-lg border border-stroke bg-white p-6 shadow-default dark:border-gray-700 dark:bg-gray-800">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">Search</label>
            <input type="text" placeholder="Booking ID..." className="w-full rounded border border-stroke bg-transparent py-2.5 pl-4 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">Status</label>
            <div className="relative">
                <select className="w-full rounded border border-stroke bg-transparent py-2.5 px-4 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 appearance-none" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option>All Statuses</option><option>Pending</option><option>Completed</option><option>Cancelled</option>
                </select>
                <ChevronDown className="absolute right-4 top-3.5 h-4 w-4 text-gray-500 pointer-events-none"/>
            </div>
          </div>
          <div className="flex items-end gap-2 lg:col-start-4">
            <button onClick={handleSearch} className="flex-1 rounded bg-blue-600 py-2.5 px-4 font-medium text-white hover:bg-blue-700 transition"><Search className="w-4 h-4 inline mr-1" /> Search</button>
            <button onClick={() => {setSearchTerm(""); setStatusFilter("All Statuses"); setBookings(initialBookings)}} className="rounded bg-gray-500 py-2.5 px-4 font-medium text-white hover:bg-gray-600 transition"><X className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-gray-700 dark:bg-gray-800">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left dark:bg-gray-700">
                <th className="py-4 px-4 font-bold text-gray-600 uppercase text-xs xl:pl-8">ID</th>
                <th className="py-4 px-4 font-bold text-gray-600 uppercase text-xs">USER</th>
                <th className="py-4 px-4 font-bold text-gray-600 uppercase text-xs">MOVIE</th>
                <th className="py-4 px-4 font-bold text-gray-600 uppercase text-xs">STATUS</th>
                <th className="py-4 px-4 font-bold text-gray-600 uppercase text-xs text-right">AMOUNT</th>
                <th className="py-4 px-4 font-bold text-gray-600 uppercase text-xs text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((item) => (
                <tr key={item.id} className="border-b border-stroke dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-5 px-4 xl:pl-8 font-medium text-black dark:text-white">{item.id}</td>
                  <td className="py-5 px-4 text-sm text-black dark:text-white">{item.user}</td>
                  <td className="py-5 px-4 text-sm font-bold text-black dark:text-white">{item.movie}</td>
                  <td className="py-5 px-4"><span className={`inline-flex rounded-full py-1 px-3 text-xs font-bold border ${getStatusColor(item.status)}`}>{item.status}</span></td>
                  <td className="py-5 px-4 text-right font-bold text-black dark:text-white">{item.amount.toLocaleString('vi-VN')} đ</td>
                  <td className="py-5 px-4 text-center">
                    <button 
                        onClick={() => setSelectedBooking(item)} // Mở modal tại đây
                        className="hover:text-blue-600 transition p-2 rounded-full hover:bg-blue-50" title="View Details"
                    >
                        <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL CHI TIẾT VÉ --- */}
      {selectedBooking && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                
                {/* Modal Header */}
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-600">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Ticket Details</h3>
                        <p className="text-sm text-gray-500">ID: {selectedBooking.id}</p>
                    </div>
                    <button onClick={() => setSelectedBooking(null)} className="text-gray-400 hover:text-red-500 transition">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto">
                    <div className="flex flex-col md:flex-row gap-6">
                        
                        {/* Cột trái: Poster phim */}
                        <div className="w-full md:w-1/3 flex flex-col items-center">
                            <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-lg mb-4">
                                <img src={selectedBooking.poster} alt="Poster" className="object-cover w-full h-full" />
                            </div>
                            <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${getStatusColor(selectedBooking.status)}`}>
                                {selectedBooking.status}
                            </span>
                        </div>

                        {/* Cột phải: Thông tin chi tiết */}
                        <div className="w-full md:w-2/3 space-y-6">
                            
                            {/* Thông tin Phim */}
                            <div>
                                <h2 className="text-2xl font-bold text-blue-600 mb-1">{selectedBooking.movie}</h2>
                                <div className="flex items-center gap-2 text-gray-500 text-sm">
                                    <Clock className="w-4 h-4" /> <span>Duration: 120 mins</span>
                                    <span>•</span>
                                    <span>{selectedBooking.screenType}</span>
                                </div>
                            </div>

                            <hr className="border-dashed border-gray-300 dark:border-gray-600"/>

                            {/* Thông tin Suất chiếu (Grid) */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Calendar className="w-3 h-3"/> Show Date</p>
                                    <p className="font-semibold text-gray-800 dark:text-white">{selectedBooking.showDate}</p>
                                </div>
                                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Clock className="w-3 h-3"/> Time</p>
                                    <p className="font-semibold text-gray-800 dark:text-white">{selectedBooking.showTime}</p>
                                </div>
                                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> Screen</p>
                                    <p className="font-semibold text-gray-800 dark:text-white">{selectedBooking.screen}</p>
                                </div>
                                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Armchair className="w-3 h-3"/> Seat Type</p>
                                    <p className="font-semibold text-blue-600">{selectedBooking.seatType}</p>
                                </div>
                            </div>

                            {/* Số ghế & Giá tiền */}
                            <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Seat Number(s)</p>
                                    <p className="text-xl font-bold text-blue-600">{selectedBooking.seatNumber}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                                    <p className="text-xl font-bold text-green-600">{selectedBooking.amount.toLocaleString('vi-VN')} đ</p>
                                </div>
                            </div>

                            {/* Thông tin Khách hàng */}
                            <div>
                                <h4 className="text-sm font-bold uppercase text-gray-400 mb-3">Customer Info</h4>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                        <User className="w-5 h-5 text-gray-500"/>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800 dark:text-white">{selectedBooking.user}</p>
                                        <p className="text-xs text-gray-500">{selectedBooking.phone}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end gap-3 border-t border-gray-200 dark:border-gray-600">
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50 transition shadow-sm">
                        <Download className="w-4 h-4"/> Print Ticket
                    </button>
                    <button onClick={() => setSelectedBooking(null)} className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition shadow-md">
                        Close
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}