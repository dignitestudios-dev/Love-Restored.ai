import { useNavigate, useParams } from "react-router";
import { useFetchById } from "../../hooks/api/Get";
import { useState } from "react";
import { dummyImg } from "../../assets/export";
import NotificationsSkeleton from "./../../components/Loaders/NotificationsSkeleton";
import { Trash2 } from "lucide-react";
import ConfirmationModal from "../../components/global/ConfirmationModal";
import axios from "../../axios";
import { ErrorToast } from "../../components/global/Toaster";
import { FaEye } from "react-icons/fa";

const ReportDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [statusLoading, setStatusLoading] = useState("idle");

  const { data, loading } = useFetchById(`/admin/reports/${id}`, false);

  const handleDelete = async () => {
    try {
      setStatusLoading("loading");
      const reportId = data?.report?.post?._id;
      const commentId = data?.report?.comment?._id;
      const isPost = data?.report?.type === "post";

      const endpoint = isPost
        ? `/admin/reports/post/${reportId}`
        : `/admin/reports/comment/${commentId}`;

      const response = await axios.delete(endpoint);
      if (response.status === 200) {
        // setUpdate((prev) => !prev);
        navigate("/app/reports");
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
    <div className="p-6 min-h-screen">
      <div className="background-gradients relative p-6 rounded-xl text-white shadow-md border border-gray-700 overflow-hidden mt-4">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />

        {/* Title + Icon */}
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] md:text-[36px] font-bold">
            Report Details
          </h1>
        </div>
        {loading ? (
          <NotificationsSkeleton />
        ) : (
          <div>
            <div className="background-gradients border border-gray-700 p-10 rounded-xl mt-6 w-full space-y-8">
              <div className="flex justify-between items-center w-full">
                <h1 className="text-[18px] md:text-[18px] font-bold">
                  Reported {data?.report?.post ? "Post" : "Comment"}
                </h1>
                {data?.report?.post ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        navigate(`/app/post-details/${data?.report?.post?._id}`)
                      }
                      className="text-white border border-gray-700 bg-gray-900 py-2 px-4 cursor-pointer items-center flex bg-opacity-80  rounded-full hover:bg-opacity-100 transition"
                    >
                      View Post <FaEye className="pl-2 text-[24px]" />
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="text-red-400 border border-gray-700 bg-gray-900 py-2 px-4 cursor-pointer items-center flex bg-opacity-80  rounded-full hover:bg-opacity-100 transition"
                    >
                      Delete Post <Trash2 className="pl-2" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        navigate(`/app/post-details/${data?.report?.post?._id}`)
                      }
                      className="text-white border border-gray-700 bg-gray-900 py-2 px-4 cursor-pointer items-center flex bg-opacity-80  rounded-full hover:bg-opacity-100 transition"
                    >
                      View Post <FaEye className="pl-2 text-[24px]" />{" "}
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="text-red-400 border border-gray-700 bg-gray-900 py-2 px-4 cursor-pointer items-center flex bg-opacity-80  rounded-full hover:bg-opacity-100 transition"
                    >
                      Delete Comment <Trash2 className="pl-2" />
                    </button>
                  </div>
                )}
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-6">
                <div>
                  {data?.report?.comment ? (
                    <p className=" text-[14px] font-bold py-4">
                      Comment :{" "}
                      <span className="font-normal">
                        {data?.report?.comment?.post?.text}
                      </span>
                    </p>
                  ) : (
                    <div>
                      <p className=" text-[14px] font-bold py-4">
                        Post :{" "}
                        <span className="font-normal">
                          {data?.report?.post?.text}
                        </span>
                      </p>
                      {data?.report?.post?.media?.length > 0 && (
                        <div className="flex flex-wrap">
                          {data?.report?.post?.media.map((item) => {
                            const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(
                              item?.file
                            );
                            const isVideo = /\.(mp4|webm|ogg)$/i.test(
                              item?.file
                            );

                            return (
                              <div key={item?._id} className="px-2 mb-4">
                                {isImage ? (
                                  <a
                                    href={item?.file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="View image"
                                  >
                                    <img
                                      src={item?.file}
                                      alt="post"
                                      className="w-32 h-32 rounded-xl object-cover hover:scale-105 transition-transform"
                                    />
                                  </a>
                                ) : isVideo ? (
                                  <video
                                    src={item?.file}
                                    controls
                                    className="w-32 h-32 rounded-xl object-cover"
                                  />
                                ) : (
                                  <div className="w-32 h-32 flex items-center justify-center bg-gray-800 text-white rounded-xl">
                                    Unsupported
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="background-gradients border border-gray-700 p-10 rounded-xl mt-6 w-full space-y-8">
              <div className="flex justify-between items-center w-full">
                <h1 className="text-[18px] md:text-[18px] font-bold">
                  Reported user
                </h1>
                <button
                  onClick={() =>
                    navigate(
                      `/app/user-details/${data?.report?.reportedUser?._id}`
                    )
                  }
                  className="text-white border border-gray-700 bg-gray-900 py-2 px-4 cursor-pointer items-center flex bg-opacity-80  rounded-full hover:bg-opacity-100 transition"
                >
                  View User <FaEye className="pl-2 text-[24px]" />{" "}
                </button>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-6">
                <div>
                  <div className=" pt-6 flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-6">
                    <img
                      src={
                        data?.report?.reportedUser?.profilePicture ?? dummyImg
                      }
                      alt="User Profile"
                      className="w-16 h-16 rounded-full object-cover shadow-lg"
                    />
                    <div className="text-white ">
                      <p className=" font-semibold pb-2">
                        {data?.report?.reportedUser?.name}
                      </p>
                      {/* <p className="text-xl text-gray-300 mb-2">{data?.user?.email}</p> */}
                      {/* <p className="text-sm text-gray-400">Joined: {user.signupDate}</p>*/}
                      <span
                        className={`${
                          data?.report?.reportedUser?.isDeactivatedByAdmin ||
                          data?.report?.reportedUser?.isDeleted
                            ? "text-gray-400 bg-gray-800"
                            : "text-green-400 bg-green-800"
                        } bg-opacity-30 px-4 py-2 rounded-full text-xs`}
                      >
                        {data?.report?.reportedUser?.isDeactivatedByAdmin ||
                        data?.report?.reportedUser?.isDeleted
                          ? "Inactive"
                          : "Active"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="background-gradients border border-gray-700 p-10 rounded-xl mt-6 w-full space-y-8">
              <div className="flex justify-between items-center w-full">
                <h1 className="text-[18px] md:text-[18px] font-bold">
                  Reported by
                </h1>
                <button
                  onClick={() =>
                    navigate(`/app/user-details/${data?.report?.reporter?._id}`)
                  }
                  className="text-white border border-gray-700 bg-gray-900 py-2 px-4 cursor-pointer items-center flex bg-opacity-80  rounded-full hover:bg-opacity-100 transition"
                >
                  View User <FaEye className="pl-2 text-[24px]" />{" "}
                </button>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-6">
                <div>
                  <div className=" pt-6 flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-6">
                    <img
                      src={data?.report?.reporter?.profilePicture ?? dummyImg}
                      alt="User Profile"
                      className="w-16 h-16 rounded-full object-cover shadow-lg"
                    />
                    <div className="text-white ">
                      <p className=" font-semibold pb-2">
                        {data?.report?.reporter?.name}
                      </p>
                      {/* <p className="text-xl text-gray-300 mb-2">{data?.user?.email}</p> */}
                      {/* <p className="text-sm text-gray-400">Joined: {user.signupDate}</p>*/}
                      <span
                        className={`${
                          data?.report?.reporter?.isDeactivatedByAdmin ||
                          data?.report?.reporter?.isDeleted
                            ? "text-gray-400 bg-gray-800"
                            : "text-green-400 bg-green-800"
                        } bg-opacity-30 px-4 py-2 rounded-full text-xs`}
                      >
                        {data?.report?.reporter?.isDeactivatedByAdmin ||
                        data?.report?.reporter?.isDeleted
                          ? "Inactive"
                          : "Active"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <ConfirmationModal
            title={
              data?.report?.type === "post"
                ? "Delete this post?"
                : "Delete this comment?"
            }
            content={
              data?.report?.type === "post"
                ? "This post will be deleted ."
                : "This comment will be deleted."
            }
            skipBtnContent="Cancel"
            confirmBtnContent={
              data?.report?.type === "post" ? "Delete Post" : "Delete comment"
            }
            onClose={() => setShowDeleteModal(false)}
            onSubmit={handleDelete}
            loading={statusLoading}
          />
        )}
      </div>
    </div>
  );
};

export default ReportDetails;
