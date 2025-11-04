import { useState } from "react";
import { FaUser, FaFileAlt, FaEye } from "react-icons/fa";
import { useFetchData } from "../../hooks/api/Get";
import { getDateFormat } from "../../lib/helpers";
import Pagination from "./Pagination";
import { useNavigate } from "react-router";
import { Trash2 } from "lucide-react";
import axios from "../../axios";
import { ErrorToast } from "../../components/global/Toaster";
import ConfirmationModal from "../../components/global/ConfirmationModal";

const Reports = () => {
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reportId, setReportId] = useState("");
  const [statusLoading, setStatusLoading] = useState("idle");
  const [update, setUpdate] = useState(false);

  const [page, setPage] = useState(1);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const {
    data: reportsData,
    loading,
    pagination,
  } = useFetchData(`/admin/reports/`, 10, {}, page, update);

  const handleDeleteReport = async () => {
    try {
      setStatusLoading("loading");
      const response = await axios.delete(`/admin/reports/${reportId}`);
      if (response.status === 200) {
        setUpdate((prev) => !prev);
      }
    } catch (error) {
      console.error("Status update failed", error);
      ErrorToast(error.response.data.message);
    } finally {
      setStatusLoading("idle");
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="p-6 min-h-screen pt-2 text-white">
      <div className="background-gradients relative p-6 rounded-xl shadow-md border border-gray-700 overflow-hidden mt-4">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />

        {/* Title */}
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] md:text-[36px] font-bold">
            Reports Management
          </h1>
        </div>
      </div>

      {loading ? (
        Array(10)
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
      ) : (
        <section className="mt-8 background-gradients border border-gray-700 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-6">Reported Content</h2>

          <div className="w-full rounded-xl overflow-x-auto space-y-4">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 text-left text-sm font-semibold text-gray-300 border-b border-gray-600 pb-4">
              <div className="px-4">#</div>
              <div>Type</div>
              {/* <div>Name / Title</div> */}
              <div>Reporter</div>
              {/* <div>Content</div> */}
              {/* <div>Contact</div> */}
              {/* <div>Reason</div> */}
              <div>Report Date</div>
              <div>Actions</div>
            </div>

            {/* Table Rows */}
            {reportsData?.reports?.length === 0 ? (
              <p className="text-center text-gray-400 py-8">
                No reports found.
              </p>
            ) : (
              reportsData?.reports?.map((report, idx) => (
                <div
                  key={report._id}
                  className=" grid grid-cols-5 gap-4 items-center text-sm text-gray-200 bg-gray-800 bg-opacity-40 p-4 rounded-lg hover:bg-opacity-60 transition"
                >
                  <div className="font-medium text-gray-300">{idx + 1}</div>

                  <div className="flex items-center space-x-1 font-semibold">
                    {report.type === "comment" ? (
                      <FaUser
                        className="text-[#DAB462]"
                        title="Comment Report"
                      />
                    ) : (
                      <FaFileAlt
                        className="text-[#DAB462]"
                        title="Post Report"
                      />
                    )}
                    <span>{report.type}</span>
                  </div>

                  <div
                    className="font-semibold truncate"
                    title={report?.reporter?.name}
                  >
                    {report?.reporter?.name}
                  </div>

                  {/* <div>{report?.reporter?.name}</div> */}

                  {/* <div className="truncate">
                    {report.type === "comment"
                      ? report?.reporter?.email
                      : report?.reporter?.email}
                  </div> */}

                  {/* <div className="truncate opacity-80">
                  {report.type === "User" ? report.email : report.owner}
                </div> */}

                  {/* <div>{report.reason ?? "reason"}</div> */}

                  <div>{getDateFormat(report?.createdAt)}</div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        navigate(`/app/report-details/${report?._id}`)
                      }
                      className="text-white border border-gray-700 bg-gray-900 p-2 cursor-pointer items-center flex bg-opacity-80  rounded-full hover:bg-opacity-100 transition"
                    >
                      <FaEye className="w-4 h-4 mr-2 text-[#DAB462]" /> View
                    </button>
                    <button
                      className="text-red-500 hover:text-red-400 transition"
                      onClick={() => {
                        setShowDeleteModal(true);
                        setReportId(report?._id);
                      }} // handle delete here
                    >
                      <Trash2 />
                    </button>
                  </div>
                  {/* <div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        report.status === "Pending"
                          ? "text-yellow-400 bg-yellow-900 bg-opacity-30"
                          : "text-green-400 bg-green-900 bg-opacity-30"
                      }`}
                    >
                      {report.status ?? "status"}
                    </span>
                  </div> */}
                </div>
              ))
            )}
          </div>
        </section>
      )}

      {showDeleteModal && (
        <ConfirmationModal
          title={"Delete this report?"}
          content={"This report will be deleted permanently."}
          skipBtnContent="Cancel"
          confirmBtnContent="Delete"
          onClose={() => setShowDeleteModal(false)}
          onSubmit={handleDeleteReport}
          loading={statusLoading}
        />
      )}

      {/* Pagination */}
      <Pagination
        currentPage={pagination?.currentPage}
        totalPages={pagination?.totalPages}
        onPageChange={handlePageChange}
        setCurrentPage={page}
      />
    </div>
  );
};

export default Reports;
