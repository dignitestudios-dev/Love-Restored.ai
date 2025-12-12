import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import moment from "moment";
import Pagination from "./Pagination";
import DatePickerField from "../../components/DatePickerField";
import { useFetchData } from "../../hooks/api/Get";
 
const RecentSubscriptionTable = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [page, setPage] = useState(1);
  const [update, setUpdate] = useState(false);
  const itemsPerPage = 5;
 
  const {
    data: subscriptionsData,
    loading,
    pagination,
  } = useFetchData(
    `/admin/dashboard/get-subs`,
    20,
    {
      startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : "",
      endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : "",
    },
    page,
    update
  );
 
  const filteredSubs = subscriptionsData?.filter((sub) => {
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
  console.log(subscriptionsData, "subscriptionsData");
 
  return (
    <div className="min-h-screen pt-2 p-6">
      <div className="background-gradients relative p-6 rounded-xl text-white shadow-md border border-gray-700 overflow-hidden mt-4 mb-4">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />
 
        {/* Title + Icon */}
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] md:text-[36px] font-bold">
            Revenue Overview
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
 
        <button
          onClick={() => {
            setStartDate(null);
            setEndDate(null);
            setPage(1);
          }}
          className="px-4 py-2 mt-4 rounded-lg bg-gray-800 border border-gray-600 text-gray-200 hover:bg-gray-700 transition"
        >
          Clear Filter
        </button>
      </div>
 
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
          {/* Table Rows */}
          {loading
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
                        <div
                          key={i}
                          className="h-6 bg-gray-700 rounded-lg"
                        ></div>
                      ))}
                  </div>
                ))
            : subscriptionsData?.map((sub, idx) => (
                <div
                  key={sub._id}
                  className="grid grid-cols-7 gap-4 items-center text-sm text-gray-200 bg-gray-800 bg-opacity-40 p-4 rounded-lg hover:bg-opacity-60 transition"
                >
                  <div>{(page - 1) * itemsPerPage + idx + 1}</div>
                  <div>{moment(sub.createdAt).format("DD, MMM YYYY")}</div>
                  <div>
                    {sub.transactionNumber || sub._id.slice(-8).toUpperCase()}
                  </div>
                  <div>{sub.user?.name || "N/A"}</div>
                  <div>{"Subscription"}</div>
                  <div>{"N/A"}</div>
                  <div>${(sub.amount || 0).toFixed(2)}</div>
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
