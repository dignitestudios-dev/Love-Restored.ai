import { useState, useEffect } from "react";
import axios from "../axios";
import { ErrorToast, SuccessToast } from "./global/Toaster"; // Added SuccessToast for feedback
import Cookies from "js-cookie";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

// eslint-disable-next-line react/prop-types
const AddChallengeModal = ({
  isOpen,
  onClose,
  categories = [],
  defaultCategory = null,
  setUpdate,
}) => {
  const [category, setCategory] = useState(defaultCategory || "");
  const [challenge, setChallenge] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Update category if defaultCategory changes
  useEffect(() => {
    if (defaultCategory) setCategory(defaultCategory);
  }, [defaultCategory]);

  if (!isOpen) return null;

  const getDeviceFingerprint = async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
  };

  const handleCreate = async () => {
    if (!category || !challenge.trim()) {
      setError("Category and challenge are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const fingerprint = await getDeviceFingerprint();

      await axios.post(
        "/admin/game/add-challenge",
        {
          category,
          challenge,
        },
        {
          headers: {
            devicemodel: fingerprint,
            deviceuniqueid: fingerprint,
          },
        }
      );

      SuccessToast("Challenge created successfully!");
      setChallenge("");
      setCategory(defaultCategory || "");
      onClose();
      setUpdate((prev) => !prev); // Trigger parent refresh
    } catch (err) {
      console.error(err);
      ErrorToast(err?.response?.data?.message || "Failed to create challenge");
      setError("Failed to create challenge.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm px-4">
      <div className="background-gradient border border-gray-700 rounded-xl max-w-md w-full p-6 shadow-lg text-white relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4">Add New Challenge</h2>

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

          {/* Category Dropdown */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 text-white"
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-gray-900">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Challenge Input */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Challenge</label>
            <textarea
              rows="4"
              placeholder="Enter challenge"
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
              className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 text-white placeholder-gray-400"
            />
          </div>

          {/* Actions */}
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
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChallengeModal;
