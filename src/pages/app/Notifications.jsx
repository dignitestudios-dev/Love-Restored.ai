import { Trash2 } from "lucide-react";
import { useState } from "react";
import NotificationsModal from "../../components/NotificationsModal";
import { useFetchData } from "../../hooks/api/Get";
import NotificationsSkeleton from "./../../components/Loaders/NotificationsSkeleton";
import Pagination from "./Pagination";
import { getDateFormat } from "../../lib/helpers";
import ConfirmationModal from "../../components/global/ConfirmationModal";
import axios from "../../axios";
import { ErrorToast } from "../../components/global/Toaster";

const Notifications = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [notificationId, setNotificationId] = useState("");
  const [statusLoading, setStatusLoading] = useState("idle");
  const [update, setUpdate] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const {
    data: notificationsData,
    loading,
    pagination,
  } = useFetchData(`/admin/notifications/`, 10, {}, page, update);

  const handleDeleteNotification = async () => {
    try {
      setStatusLoading("loading");
      const response = await axios.delete(
        `/admin/notifications/${notificationId}`
      );
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
      {/* Header */}
      <div className="background-gradients relative p-6 rounded-xl shadow-md border border-gray-700 overflow-hidden mt-4 flex flex-col md:flex-row md:justify-between md:items-center">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />

        <h1 className="text-[32px] md:text-[36px] font-bold mb-4 md:mb-0">
          Notifications
        </h1>

        <div className="flex text-white rounded-lg shadow p-1 button-bg">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-1 rounded-lg font-medium flex items-center gap-2"
          >
            <span className="text-2xl">+</span>
            <span>Create</span>
          </button>
        </div>
      </div>

      {loading ? (
        <NotificationsSkeleton />
      ) : (
        <section className="mt-6 background-gradients border border-gray-700 p-6 rounded-xl space-y-6">
          {notificationsData?.notifications?.map((notification, index) => (
            <div
              key={index}
              className="background-gradient border border-gray-700 p-6 rounded-xl hover:bg-opacity-80 transition cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div className="text-xl font-semibold text-gray-200">
                  {notification.title}
                </div>
                <div className="text-sm text-gray-400">
                  {getDateFormat(notification.createdAt)}
                </div>
              </div>
              <p className="mt-2 text-gray-300">{notification.description}</p>
              <div className="flex justify-end">
                <button
                  className="text-red-500 hover:text-red-400 transition"
                  onClick={() => {
                    setShowDeleteModal(true);
                    setNotificationId(notification._id);
                  }} // handle delete here
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

      <Pagination
        currentPage={pagination?.currentPage}
        totalPages={pagination?.totalPages}
        onPageChange={handlePageChange}
        setCurrentPage={page}
      />

      {/* Modal */}
      {isModalOpen && (
        <NotificationsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          setUpdate={setUpdate}
        />
      )}

      {showDeleteModal && (
        <ConfirmationModal
          title={"Delete this notification?"}
          content={"This notification will be deleted permanently."}
          skipBtnContent="Cancel"
          confirmBtnContent="Delete"
          onClose={() => setShowDeleteModal(false)}
          onSubmit={handleDeleteNotification}
          loading={statusLoading}
        />
      )}
    </div>
  );
};

export default Notifications;
