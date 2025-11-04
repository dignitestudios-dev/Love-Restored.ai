import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useFetchData } from "../../hooks/api/Get";
import { getDateFormat } from "../../lib/helpers";
import Pagination from "./Pagination";
import { useState } from "react";
import DatePickerField from "../../components/DatePickerField";
import moment from "moment";

const Users = () => {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleViewClick = (userId) => {
    // Navigate to the /app/user-details page
    navigate(`/app/user-details/${userId}`);
  };

  const [page, setPage] = useState(1);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const {
    data: usersData,
    loading,
    pagination,
  } = useFetchData(
    `/admin/users`,
    10,
    {
      startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : "",
      endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : "",
    },
    page,
    false
  );

  return (
    <div className="p-6 min-h-screen pt-2 ">
      <div className="background-gradients relative p-6 rounded-xl text-white shadow-md border border-gray-700 overflow-hidden mt-4">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />

        {/* Title + Icon */}
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] md:text-[36px] font-bold">
            Users Management
          </h1>
        </div>
      </div>
      <div className="flex flex-wrap gap-6 items-center justify-end">
        <DatePickerField
          label="Start Date"
          value={startDate}
          onChange={setStartDate}
        />
        <DatePickerField
          label="End Date"
          value={endDate}
          onChange={setEndDate}
          minDate={startDate}
        />
      </div>

      <div className="mb-4 background-gradients border border-gray-700 p-6 rounded-xl mt-6">
        <div className="flex justify-between items-center mb-6">
          {/* <button onClick={handleViewAll} className="text-sm text-[#DAB462] hover:underline transition">View All</button> */}
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
          {loading
            ? Array(5)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-6 gap-4 items-center text-sm text-gray-200 bg-gray-800 bg-opacity-40 p-4 rounded-lg hover:bg-opacity-60 transition"
                  >
                    {/* Shimmer Effect */}
                    <div className="w-8 h-6 bg-gray-700 animate-pulse rounded-lg"></div>
                    <div className="w-24 h-6 bg-gray-700 animate-pulse rounded-lg"></div>
                    <div className="w-40 h-6 bg-gray-700 animate-pulse rounded-lg"></div>
                    <div className="w-24 h-6 bg-gray-700 animate-pulse rounded-lg"></div>
                    <div className="w-32 h-6 bg-gray-700 animate-pulse rounded-lg"></div>
                    <div className="w-20 h-6 bg-gray-700 animate-pulse rounded-lg"></div>
                  </div>
                ))
            : usersData?.users?.map((user, idx) => (
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
                </div>
              ))}
        </div>
        {/* Pagination */}
        <Pagination
          currentPage={pagination?.currentPage}
          totalPages={pagination?.totalPages}
          onPageChange={handlePageChange}
          setCurrentPage={page}
        />
      </div>
    </div>
  );
};

export default Users;
