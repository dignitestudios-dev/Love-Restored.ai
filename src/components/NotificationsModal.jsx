import { useState } from "react";
import axios from "../axios";
import { ErrorToast } from "./global/Toaster";

// eslint-disable-next-line react/prop-types
const NotificationsModal = ({ isOpen, onClose, setUpdate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleCreate = async () => {
    if (!title.trim() || !description.trim()) {
      setError("Both title and description are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await axios.post("/admin/notifications/", {
        title,
        description,
      });
      onClose();
      setTitle("");
      setDescription("");
    } catch (err) {
      ErrorToast(err.response.data.message);
      setError("Failed to send notification. Please try again.");
    } finally {
      setUpdate((prev) => !prev);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm px-4">
      <div className="background-gradient border border-gray-700 rounded-xl max-w-md w-full p-6 shadow-lg text-white relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition text-xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4">Create New Notification</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate();
          }}
          className="space-y-5"
        >
          {error && (
            <div className="text-red-500 text-sm font-medium">{error}</div>
          )}

          <div>
            <label className="block text-sm mb-1 text-gray-300">Title</label>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">
              Description
            </label>
            <textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 text-white placeholder-gray-400"
              rows="4"
            />
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-gray-600 hover:border-[#DAB462] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-lg button-bg text-white font-semibold transition ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#b8860b]"
              }`}
            >
              {loading ? "Sending..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotificationsModal;
