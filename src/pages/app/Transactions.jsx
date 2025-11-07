import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import moment from "moment";
import RecentSubscriptionTable from "./RecentSubscriptionTable";
import Pagination from "./Pagination";
import DatePickerField from "../../components/DatePickerField";

const Transactions = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // ---------- 🔢 STATIC DATA ----------
  const transactions = [
    {
      _id: "1",
      lister: { name: "John Doe" },
      user: { name: "Alice Smith" },
      totalPrice: 150,
      platformFee: 15,
      adminCommission: 10,
      adminCommissionAmount: 15,
      createdAt: "2025-11-01T12:00:00Z",
    },
    {
      _id: "2",
      lister: { name: "Jane Roe" },
      user: { name: "Bob Johnson" },
      totalPrice: 200,
      platformFee: 20,
      adminCommission: 10,
      adminCommissionAmount: 20,
      createdAt: "2025-11-02T12:00:00Z",
    },
    {
      _id: "3",
      lister: { name: "Mike Lee" },
      user: { name: "Carol White" },
      totalPrice: 350,
      platformFee: 35,
      adminCommission: 10,
      adminCommissionAmount: 35,
      createdAt: "2025-11-03T12:00:00Z",
    },
  ];

  // Filter by date
  const filteredTransactions = transactions.filter((txn) => {
    const created = new Date(txn.createdAt);
    if (startDate && created < startDate) return false;
    if (endDate && created > endDate) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const displayedTxns = filteredTransactions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (newPage) => setPage(newPage);
  const handleViewClick = (txnId) => alert(`View transaction ${txnId}`);
  const handleClearDateFilters = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="p-6 pt-2 min-h-screen">
      <div className="background-gradients relative p-6 rounded-xl text-white shadow-md border border-gray-700 overflow-hidden mt-4 mb-4">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />

        {/* Title + Icon */}
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] md:text-[36px] font-bold">Revenue Overview</h1>
        </div>
      </div>

      {/* ---------- 📅 Filters and Tabs ---------- */}
      <div className="flex justify-end items-center mb-6 flex-wrap gap-4">
        {/* <div className="flex bg-gray-800 rounded-lg w-auto p-1">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-6 py-2 rounded-lg font-medium ${
              activeTab === "bookings"
                ? "button-bg text-white"
                : "text-gray-400 hover:bg-gray-700"
            }`}
          >
            Bookings
          </button>
          <button
            onClick={() => setActiveTab("subscriptions")}
            className={`px-6 py-2 rounded-lg font-medium ${
              activeTab === "subscriptions"
                ? "button-bg text-white"
                : "text-gray-400 hover:bg-gray-700"
            }`}
          >
            Subscriptions
          </button>
        </div> */}

        <div className="flex flex-wrap gap-6 items-end">
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
          {/* <button
            onClick={handleClearDateFilters}
            className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600"
          >
            Clear Filter
          </button> */}
        </div>
      </div>

      {/* ---------- 📜 Table Section ---------- */}
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

export default Transactions;
