import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import moment from "moment";
import Pagination from "./Pagination"; // your Pagination component
import DatePickerField from "../../components/DatePickerField";

const RecentSubscriptionTable = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // ---------- STATIC DATA ----------
  const subscriptions = [
    {
      _id: "sub_00123456",
      createdAt: "2025-10-01T10:00:00Z",
      user: { name: "John Doe" },
      productId: "premium_plan",
      subscriptionPlan: "Monthly",
      subscriptionPrice: 29.99,
    },
    {
      _id: "sub_00123457",
      createdAt: "2025-10-02T14:30:00Z",
      user: { name: "Jane Smith" },
      productId: "basic_plan",
      subscriptionPlan: "Yearly",
      subscriptionPrice: 199.99,
    },
    {
      _id: "sub_00123458",
      createdAt: "2025-10-03T08:15:00Z",
      user: { name: "Alice Johnson" },
      productId: "standard_plan",
      subscriptionPlan: "Monthly",
      subscriptionPrice: 49.99,
    },
    {
      _id: "sub_00123459",
      createdAt: "2025-10-04T16:45:00Z",
      user: { name: "Bob Brown" },
      productId: "premium_plan",
      subscriptionPlan: "Yearly",
      subscriptionPrice: 299.99,
    },
    {
      _id: "sub_00123460",
      createdAt: "2025-10-05T12:20:00Z",
      user: { name: "Carol White" },
      productId: "basic_plan",
      subscriptionPlan: "Monthly",
      subscriptionPrice: 19.99,
    },
    {
      _id: "sub_00123461",
      createdAt: "2025-10-06T09:10:00Z",
      user: { name: "David Green" },
      productId: "standard_plan",
      subscriptionPlan: "Yearly",
      subscriptionPrice: 149.99,
    },
  ];

  // Filter by dates
  const filteredSubs = subscriptions.filter((sub) => {
    const created = new Date(sub.createdAt);
    if (startDate && created < startDate) return false;
    if (endDate && created > endDate) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredSubs.length / itemsPerPage);
  const displayedSubs = filteredSubs.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (newPage) => setPage(newPage);

  const handleViewClick = (subId) => {
    alert(`View subscription details for ${subId}`);
  };

  return (
    <div className="min-h-screen pt-2">
      {/* <div className="flex flex-wrap gap-6 items-center justify-end mb-6">
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
      </div> */}

      <div className="mb-4 background-gradients border border-gray-700 p-6 rounded-xl mt-2">
        <div className="w-full rounded-xl overflow-x-auto space-y-4">
          {/* Table Header */}
          <div className="grid grid-cols-7 gap-4 text-left text-sm font-semibold text-gray-300 border-b border-gray-600 pb-4">
            <div>#</div>
            <div>Date</div>
            <div>Transaction ID</div>
            <div>Subscriber</div>
            <div>Plan</div>
            <div>Duration</div>
            <div>Amount Paid</div>
          </div>

          {/* Table Rows */}
          {displayedSubs.length === 0
            ? Array(5)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-7 gap-4 items-center text-sm text-gray-200 bg-gray-800 bg-opacity-40 p-4 rounded-lg animate-pulse"
                  >
                    {Array(7)
                      .fill(0)
                      .map((__, i) => (
                        <div key={i} className="h-6 bg-gray-700 rounded-lg"></div>
                      ))}
                  </div>
                ))
            : displayedSubs.map((sub, idx) => (
                <div
                  key={sub._id}
                  className="grid grid-cols-7 gap-4 items-center text-sm text-gray-200 bg-gray-800 bg-opacity-40 p-4 rounded-lg hover:bg-opacity-60 transition"
                >
                  <div>{(page - 1) * itemsPerPage + idx + 1}</div>
                  <div>{moment(sub.createdAt).format("DD, MMM YYYY")}</div>
                  <div>{sub._id.slice(-8).toUpperCase()}</div>
                  <div>{sub.user?.name || "N/A"}</div>
                  <div>{sub.productId.replace(/_/g, " ")}</div>
                  <div>{sub.subscriptionPlan}</div>
                  <div>${sub.subscriptionPrice.toFixed(2)}</div>
                  {/* <div>
                    <button
                      onClick={() => handleViewClick(sub._id)}
                      className="text-white border border-gray-700 bg-gray-900 p-2 cursor-pointer items-center flex bg-opacity-80  rounded-full hover:bg-opacity-100 transition"
                    >
                      <FaEye className="w-4 h-4 mr-2 text-[#DAB462]" /> View
                    </button>
                  </div> */}
                </div>
              ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          setCurrentPage={page}
        />
      </div>
    </div>
  );
};

export default RecentSubscriptionTable;
