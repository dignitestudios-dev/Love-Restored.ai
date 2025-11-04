import { FaUsers, FaClipboardList, FaEye } from "react-icons/fa";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useNavigate } from "react-router";
import { FaBuilding } from "react-icons/fa";
import { useFetchData } from "../../hooks/api/Get";
import { goldenShades } from "../../static/AppData";
import { getDateFormat } from "../../lib/helpers";
import DashboardSkeleton from "../../components/Loaders/DashboardSkeleton";

const DummyHome = () => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/app/users");
  };

  const handleViewClick = (userId) => {
    // Navigate to the /app/user-details page
    navigate(`/app/user-details/${userId}`);
  };

  const { data } = useFetchData(`/admin/dashboard/get-stats`, 10, {}, 1, false);

  const { data: usersData, loading } = useFetchData(
    `/admin/users`,
    10,
    {},
    1,
    false
  );

  const lineData = data?.graphCounts?.map(({ month, count }) => ({
    name: month,
    Users: count,
    Listers: 0, // or omit this key if you only want one line
  }));

  const barData = data?.subscriptionCounts?.map(
    ({ subscriptionPlan, count }) => ({
      plan:
        subscriptionPlan?.charAt(0)?.toUpperCase() + subscriptionPlan?.slice(1), // Optional: capitalize plan names
      subscribers: count,
    })
  );

  return (
    <div className="p-6 pt-2 space-y-6 h-screen">
      {/* Heading */}
      {/* <h1 className=" border border-gray-700 text-[36px] mt-4 font-bold text-white  p-4 rounded-xl">Dashboard</h1> */}

      {loading ? (
        <DashboardSkeleton />
      ) : (
        <>
          <div className="background-gradients relative p-6 rounded-xl text-white shadow-md border border-gray-700 overflow-hidden mt-4">
            {/* Accent Bar */}
            <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />

            {/* Title + Icon */}
            <div className="flex items-center justify-between">
              <h1 className="text-[32px] md:text-[36px] font-bold">
                Dashboard
              </h1>
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
                  <h3 className="text-sm opacity-80">Total Users</h3>
                  <p className="text-4xl font-semibold mt-3">
                    {data?.totalUserCount}
                  </p>
                </div>
                <FaBuilding className="text-4xl text-[#DAB462]" />
              </div>
            </div>

            {/* Active Users */}
            <div className="background-gradients relative p-6 rounded-md text-white shadow-md border border-gray-700 overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm opacity-80">Single Users</h3>
                  <p className="text-4xl font-semibold mt-3">
                    {data?.singleUserCount}
                  </p>
                </div>
                <FaUsers className="text-4xl text-[#DAB462]" />
              </div>
            </div>

            {/* Total Bookings */}
            <div className="background-gradient relative p-6 rounded-md text-white shadow-md border border-gray-700 overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm opacity-80">Total Couples</h3>
                  <p className="text-4xl font-semibold mt-3">
                    {data?.coupleCount}
                  </p>
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
                <h3 className="text-lg font-semibold mb-6 text-white">
                  Revenue by Users
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={lineData}>
                    <defs>
                      <linearGradient
                        id="colorUsers"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#B37C26"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#B37C26"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorListers"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#DAB462"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#DAB462"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#E5E7EB"
                    />
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
                <h3 className="text-lg font-semibold mb-8 text-white">
                  Subscription Distribution
                </h3>
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
                      {barData?.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={goldenShades[index % goldenShades?.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [`${value}`, `${name}`]}
                      contentStyle={{
                        backgroundColor: "#B37C26",
                        borderRadius: "20px",
                        borderColor: "#374151",
                      }}
                      itemStyle={{ color: "#fff" }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      iconSize={10}
                      wrapperStyle={{ color: "#D1D5DB" }}
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
              <h3 className="text-2xl font-semibold text-white">
                Users Management
              </h3>
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
              {usersData?.users?.slice(0, 5)?.map((user, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-6 gap-4 items-center text-sm text-gray-200 bg-gray-800 bg-opacity-40 p-4 rounded-lg hover:bg-opacity-60 transition"
                >
                  <div className="font-medium text-gray-300">{idx + 1}</div>
                  <div className="font-semibold">{user?.name}</div>
                  <div className="text-sm opacity-80 truncate font-semibold">
                    {user?.email}
                  </div>
                  <div className="text-sm">{getDateFormat(user?.joinedAt)}</div>
                  <div>
                    <span
                      className={`${
                        user?.isDeactivatedByAdmin || user?.isDeleted
                          ? "text-gray-400 bg-gray-800"
                          : "text-green-400 bg-green-800"
                      }  bg-opacity-30 px-3 py-1 rounded-full text-xs`}
                    >
                      {user?.isDeactivatedByAdmin || user?.isDeleted
                        ? "Inactive"
                        : "Active"}
                    </span>
                  </div>
                  <div>
                    <div>
                      <button
                        onClick={() => handleViewClick(user?._id)}
                        className="text-white border border-gray-700 bg-gray-900 p-2 cursor-pointer items-center flex bg-opacity-80  rounded-full hover:bg-opacity-100 transition"
                      >
                        <FaEye className="w-4 h-4 mr-2 text-[#DAB462]" /> View
                      </button>
                    </div>
                  </div>

                  {/* Pagination */}
                </div>
              ))}
            </div>

            {/* <div className="flex items-center justify-end mt-8 space-x-2">
          
          <button
            className="p-2 rounded-full border border-gray-700 text-gray-300 hover:bg-[#BE8B36] hover:text-white transition"
            aria-label="Previous Page"
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>

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

          <button
            className="p-2 rounded-full border border-gray-700 text-gray-300 hover:bg-[#BE8B36] hover:text-white transition"
            aria-label="Next Page"
          >
            <FaChevronRight className="w-4 h-4" />
          </button>
        </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default DummyHome;
