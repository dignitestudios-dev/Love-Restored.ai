import { useNavigate, useParams } from "react-router";
import { useFetchById } from "../../hooks/api/Get";
import { dummyImg } from "../../assets/export";
import { getDateFormat } from "../../lib/helpers";
import UserDetailSkeleton from "../../components/Loaders/UserDetailSkeleton";
import { useState } from "react";
import ConfirmationModal from "../../components/global/ConfirmationModal";
import axios from "../../axios";
import { ErrorToast } from "../../components/global/Toaster";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("🚀 ~ UserDetails ~ navigate:", navigate);

  const [update, setUpdate] = useState(false);

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusLoading, setStatusLoading] = useState("idle");

  const handleStatus = () => {
    setShowStatusModal(true);
  };

  const handleStatusSubmit = async () => {
    try {
      setStatusLoading("loading");
      const userId = data?.user?._id;
      const isDisabled = data?.user?.isDeactivatedByAdmin;

      const endpoint = isDisabled
        ? `admin/users/${userId}/enable`
        : `admin/users/${userId}/disable`;

      const response = await axios.post(endpoint);
      if (response.status === 200) {
        setUpdate((prev) => !prev);
      }
    } catch (error) {
      console.error("Status update failed", error);
      ErrorToast(error.response.data.message);
    } finally {
      setStatusLoading("idle");
      setShowStatusModal(false);
    }
  };

  // const handleBack = () => {
  //   navigate(-1); // Navigate back to the previous page
  // };

  const { data, loading } = useFetchById(`/admin/users/${id}`, update);

  return (
    <div className="p-6 min-h-screen">
      <div className="background-gradients relative p-6 rounded-xl text-white shadow-md border border-gray-700 overflow-hidden mt-4">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />

        {/* Title + Icon */}
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] md:text-[36px] font-bold">User Details</h1>
        </div>
      </div>
      {loading ? (
        <UserDetailSkeleton />
      ) : (
        <div className="background-gradients border border-gray-700 p-10 rounded-xl mt-6 w-full space-y-8">
          {/* User Profile Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-6">
            <img
              src={data?.user?.profilePicture ?? dummyImg}
              alt="User Profile"
              className="w-40 h-40 rounded-full object-cover shadow-lg"
            />
            <div className="text-white ">
              <p className="text-4xl font-semibold">{data?.user?.name}</p>
              <p className="text-xl text-gray-300 mb-2">{data?.user?.email}</p>
              {/* <p className="text-sm text-gray-400">Joined: {user.signupDate}</p>*/}
              <span
                className={`${
                  data?.user?.isDeactivatedByAdmin || data?.user?.isDeleted
                    ? "text-gray-400 bg-gray-800"
                    : "text-green-400 bg-green-800"
                } bg-opacity-30 px-4 py-2  rounded-full text-xs`}
              >
                {data?.user?.isDeactivatedByAdmin || data?.user?.isDeleted
                  ? "Inactive"
                  : "Active"}
              </span>
            </div>
          </div>

          {/* Detailed Information - Now in Separate Containers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Email */}
            <div className="border border-gray-700 background-gradient p-6 rounded-lg">
              <p className="text-lg text-gray-300 font-semibold">Email:</p>
              <p className="text-lg text-white">{data?.user?.email}</p>
            </div>

            {/* Status */}
            <div className="border border-gray-700 background-gradient p-6 rounded-lg">
              <p className="text-lg text-gray-300 font-semibold">Status:</p>
              <p className="text-lg text-white">
                {data?.user?.isDeactivatedByAdmin || data?.user?.isDeleted
                  ? "Inactive"
                  : "Active"}
              </p>
            </div>

            {/* Joined Date */}
            <div className="border border-gray-700 background-gradient p-6 rounded-lg">
              <p className="text-lg text-gray-300 font-semibold">Joined:</p>
              <p className="text-lg text-white">
                {getDateFormat(data?.user?.joinedAt)}
              </p>
            </div>

            {/* Gender */}
            <div className="border border-gray-700 background-gradient p-6 rounded-lg">
              <p className="text-lg text-gray-300 font-semibold">Gender:</p>
              <p className="text-lg text-white capitalize">
                {data?.user?.gender}
              </p>
            </div>

            {/* Marital Status */}
            <div className="border border-gray-700 background-gradient p-6 rounded-lg">
              <p className="text-lg text-gray-300 font-semibold">
                Marital Status:
              </p>
              <p className="text-lg text-white capitalize">
                {data?.user?.relationshipStatus}
              </p>
            </div>

            {/* Date of Birth */}
            <div className="border border-gray-700 background-gradient p-6 rounded-lg">
              <p className="text-lg text-gray-300 font-semibold">
                Date of Birth:
              </p>
              <p className="text-lg text-white">{data?.user?.dateOfBirth}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end items-center space-x-6">
            <button
              onClick={handleStatus}
              className="px-8 py-3 rounded-xl border border-gray-600 hover:border-[#DAB462] transition text-white flex items-center space-x-3"
            >
              <span>
                {data?.user?.isDeactivatedByAdmin ? "Disabled" : "Enabled"}
              </span>
            </button>

            {/* <button
              onClick={handleDelete}
              className="px-8 py-3 rounded-xl bg-red-500 font-semibold hover:bg-red-600 transition text-white flex items-center space-x-3"
            >
              <span>Delete</span>
            </button> */}
          </div>
        </div>
      )}

      {showStatusModal && (
        <ConfirmationModal
          title={
            data?.user?.isDeactivatedByAdmin
              ? "Enable this user?"
              : "Disable this user?"
          }
          content={
            data?.user?.isDeactivatedByAdmin
              ? "This user will be reactivated and regain access."
              : "This user will be deactivated and lose access."
          }
          skipBtnContent="Cancel"
          confirmBtnContent={
            data?.user?.isDeactivatedByAdmin ? "Enable" : "Disable"
          }
          onClose={() => setShowStatusModal(false)}
          onSubmit={handleStatusSubmit}
          loading={statusLoading}
        />
      )}
    </div>
  );
};

export default UserDetails;
