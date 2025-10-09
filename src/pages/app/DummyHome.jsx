import React, { useState } from "react";
import {
  FaUsers,
  FaDollarSign,
  FaCalendarCheck,
  FaClipboardList,
  FaEye,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Chart } from "react-google-charts";
import { useNavigate } from "react-router";
import { FaBuilding } from "react-icons/fa";


const DummyHome = () => {
 const navigate = useNavigate();

  const handleViewAll = () => {
    navigate('/app/users');
  };


  // Stats
  const stats = {
    totalListings: 10587,
    activeUsers: 10587,
    totalBookings: 10587,
    revenue: 1086.98,
    reportsPending: 9,
  };

  // Line Chart Data
  const lineData = [
    { name: "Jan", Users: 100, Listers: 50 },
    { name: "Feb", Users: 200, Listers: 150 },
    { name: "Mar", Users: 300, Listers: 180 },
    { name: "Apr", Users: 350, Listers: 200 },
    { name: "May", Users: 400, Listers: 250 },
    { name: "Jun", Users: 500, Listers: 300 },
    { name: "Jul", Users: 600, Listers: 400 },
    { name: "Aug", Users: 735, Listers: 500 },
    { name: "Sep", Users: 650, Listers: 480 },
    { name: "Oct", Users: 700, Listers: 520 },
    { name: "Nov", Users: 720, Listers: 540 },
    { name: "Dec", Users: 800, Listers: 600 },
  ];

  // Pie Chart Data (Google Charts format)
  const pieData = [
    ["Plan", "Revenue"],
    ["Plan 1", 2098.88],
    ["Plan 2", 2098.88],
  ];

  const pieOptions = {
  title: "Revenue by Subscription",
  titleTextStyle: {
    alignment: "start", // Aligns title to the left
    fontSize: 18,
    bold: true,
    color: "#233238",
  },
  is3D: true,
  pieStartAngle: 100,
  sliceVisibilityThreshold: 0.02,
  backgroundColor: "#F9FAFA",
  legend: {
    position: "top",
    alignment: "start", // Aligns legend to the left
    textStyle: {
      color: "#233238",
      fontSize: 14,
    },
  },
  colors: ["#FF8042", "#E040FB"],
  chartArea: {
    top: 70, // Add space so the legend + title fit
    width: "100%",
    height: "80%",
  },
};



  // Bookings
  const bookings = [
    {
      id: 1,
      bookingId: "GH465279",
      bookingType: "Monthly",
      bedType: "Bunk Bed",
      location: "Gaular, Norway",
      hostName: "Jackson John",
      userName: "Mike Smith",
      stayDuration: "21 Jul - 08 Aug, 2025",
      status: "Upcoming",
    },
  ];

  const barData = [
  { plan: "Basic", subscribers: 120 },
  { plan: "Standard", subscribers: 90 },
  { plan: "Premium", subscribers: 60 },
];

 const handleViewClick = () => {
    // Navigate to the /app/user-details page
    navigate('/app/user-details');
  };

  return (
    <div className="p-6 pt-2 space-y-6 h-screen">
      {/* Heading */}
      {/* <h1 className=" border border-gray-700 text-[36px] mt-4 font-bold text-white  p-4 rounded-xl">Dashboard</h1> */}

<div className="background-gradients relative p-6 rounded-xl text-white shadow-md border border-gray-700 overflow-hidden mt-4">
  {/* Accent Bar */}
  <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />

  {/* Title + Icon */}
  <div className="flex items-center justify-between">
    <h1 className="text-[32px] md:text-[36px] font-bold">Dashboard</h1>
  </div>
</div>
      {/* Stats Cards */}
      
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4">
  {/* Total Listings */}
  <div className="background-gradient relative p-6 rounded-md text-white shadow-md border border-gray-700 overflow-hidden group">
    {/* Accent Bar */}
    <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />

    {/* Content with Icon */}
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm opacity-80">Total Listings</h3>
        <p className="text-4xl font-semibold mt-3">{stats.totalListings}</p>
      </div>
      <FaBuilding className="text-4xl text-[#DAB462]" />
    </div>
  </div>

  {/* Active Users */}
  <div className="background-gradients relative p-6 rounded-md text-white shadow-md border border-gray-700 overflow-hidden group">
    <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm opacity-80">Active Users</h3>
        <p className="text-4xl font-semibold mt-3">{stats.activeUsers}</p>
      </div>
      <FaUsers className="text-4xl text-[#DAB462]" />
    </div>
  </div>

  {/* Total Bookings */}
  <div className="background-gradient relative p-6 rounded-md text-white shadow-md border border-gray-700 overflow-hidden group">
    <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm opacity-80">Total Bookings</h3>
        <p className="text-4xl font-semibold mt-3">{stats.totalBookings}</p>
      </div>
      <FaClipboardList className="text-4xl text-[#DAB462]" />
    </div>
  </div>
</div>



      {/* Charts */}
   <div className="background-gradient border border-gray-700 p-6 rounded-xl">
  <h1 className="text-2xl font-semibold mb-6 text-white">Overview</h1>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Area Chart - Revenue by Users */}
    <div className="background-gradient border border-gray-700 rounded-xl p-6 col-span-2">
      <h3 className="text-lg font-semibold mb-6 text-white">Revenue by Users</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={lineData}>
          <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#B37C26" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#B37C26" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorListers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#DAB462" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#DAB462" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis dataKey="name" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="Users"
            stroke="#B37C26"
            fillOpacity={1}
            fill="url(#colorUsers)"
          />
          <Area
            type="monotone"
            dataKey="Listers"
            stroke="#DAB462"
            fillOpacity={1}
            fill="url(#colorListers)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>

    {/* Radial Bar Chart - Subscription Distribution */}
    <div className="background-gradients border border-gray-700 rounded-xl p-6">
  <h3 className="text-lg font-semibold mb-8 text-white">Subscription Distribution</h3>
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={barData}
        dataKey="subscribers"
        nameKey="plan"
        cx="50%"
        cy="50%"
        innerRadius={70}
        outerRadius={110}
        fill="#B37C26"
        // label={({ name, percent }) =>
        //   `${name}: ${(percent * 100).toFixed(0)}%`
        // }
        labelLine={false}
      >
        {barData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#B37C26" : "#DAB462"} />
        ))}
      </Pie>
      <Tooltip
        formatter={(value, name) => [`${value}`, `${name}`]}
        contentStyle={{ backgroundColor: '#B37C26', borderRadius: '20px', borderColor: '#374151' }}
        itemStyle={{ color: '#fff' }}
      />
      <Legend
        verticalAlign="bottom"
        height={36}
        iconSize={10}
        wrapperStyle={{ color: '#D1D5DB' }}
      />
    </PieChart>
  </ResponsiveContainer>
</div>

  </div>
</div>


{/* Recent Subscriptions Section */}
{/* Recent Users Section */}
<div className="mb-4 background-gradients border border-gray-700 p-6 rounded-xl mt-6">
  <div className="flex justify-between items-center mb-6">
    <h3 className="text-2xl font-semibold text-white">Users Management</h3>
    <button
      onClick={handleViewAll}
      className="text-sm text-[#DAB462] hover:underline transition"
    >
      View All
    </button>
  </div>

 <div className="w-full rounded-xl overflow-x-auto space-y-4">
  {/* Table Header */}
  <div className="grid grid-cols-6 gap-4 text-left text-sm font-semibold text-gray-300 border-b border-gray-600 pb-4">
    <div className="px-4">#</div>
    <div>Name</div>
    <div>Email</div>
    <div>Signup Date</div>
    <div>Status</div>
    <div>Actions</div>
  </div>

  {/* Table Rows */}
  {Array(5)
    .fill(0)
    .map((_, idx) => (
      <div
        key={idx}
        className="grid grid-cols-6 gap-4 items-center text-sm text-gray-200 bg-gray-800 bg-opacity-40 p-4 rounded-lg hover:bg-opacity-60 transition"
      >
        <div className="font-medium text-gray-300">{idx + 1}</div>
        <div className="font-semibold">John Doe</div>
        <div className="text-sm opacity-80 truncate font-semibold">john{idx}@example.com</div>
        <div className="text-sm">Oct {10 + idx}, 2025</div>
        <div>
          <span className="text-green-400 bg-green-800 bg-opacity-30 px-3 py-1 rounded-full text-xs">
            Active
          </span>
        </div>
        <div>
  <div>
                        <button onClick={handleViewClick} className="text-white border border-gray-700 bg-gray-900 p-2 cursor-pointer items-center flex bg-opacity-80  rounded-full hover:bg-opacity-100 transition">
                          <FaEye className="w-4 h-4 mr-2 text-[#DAB462]" /> View
  
                        </button>
                      </div>
</div>

{/* Pagination */}



      </div>
    ))}
</div>

<div className="flex items-center justify-end mt-8 space-x-2">
  {/* Previous Button */}
  <button
    className="p-2 rounded-full border border-gray-700 text-gray-300 hover:bg-[#BE8B36] hover:text-white transition"
    aria-label="Previous Page"
  >
    <FaChevronLeft className="w-4 h-4" />
  </button>

  {/* Page Numbers */}
  {[1, 2, 3, 4, 5].map((page, index) => (
    <button
      key={index}
      className={`px-4 py-2 rounded-xl border border-gray-700 text-sm transition ${
        page === 1 // Set current page here
          ? "bg-[#BE8B36] text-white"
          : "text-gray-300 hover:bg-gray-700"
      }`}
    >
      {page}
    </button>
  ))}

  {/* Next Button */}
  <button
    className="p-2 rounded-full border border-gray-700 text-gray-300 hover:bg-[#BE8B36] hover:text-white transition"
    aria-label="Next Page"
  >
    <FaChevronRight className="w-4 h-4" />
  </button>
</div>
</div>


    </div>
  );
};

export default DummyHome;
