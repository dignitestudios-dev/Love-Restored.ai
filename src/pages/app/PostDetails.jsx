import { useParams } from "react-router";
import { useFetchById } from "../../hooks/api/Get";
import NotificationsSkeleton from "../../components/Loaders/NotificationsSkeleton";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { getDateFormat } from "../../lib/helpers";

const PostDetails = () => {
  const { id } = useParams();
  const { data, loading } = useFetchById(`/admin/posts/${id}`, false);
  console.log("🚀 ~ PostDetails ~ loading:", loading);

  const mediaItems = data?.post?.media || [];

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!mediaItems || mediaItems.length === 0) return null;

  const showPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
  };

  const currentItem = mediaItems[currentIndex];
  const isVideo =
    typeof currentItem?.file === "string" &&
    currentItem?.file?.toLowerCase().endsWith(".mp4");
  return (
    <div className="p-6 min-h-screen">
      <div className="background-gradients relative p-6 rounded-xl text-white shadow-md border border-gray-700 overflow-hidden mt-4">
        <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />

        {/* Title + Icon */}
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] md:text-[36px] font-bold">Post Details</h1>
        </div>
        {loading ? (
          <NotificationsSkeleton />
        ) : (
          <div>
            <div className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg bg-black/10">
              {/* Media Display */}
              <div className="flex justify-center items-center w-full h-[70vh] bg-black/80 rounded-xl">
                {isVideo ? (
                  <video
                    src={currentItem.file}
                    controls
                    className="max-h-[70vh] w-full object-contain rounded-xl"
                  />
                ) : (
                  <img
                    src={currentItem.file}
                    alt={`media-${currentIndex}`}
                    className="max-h-[70vh] w-full object-contain rounded-xl"
                  />
                )}
              </div>

              {/* Navigation */}
              {mediaItems.length > 1 && (
                <>
                  <button
                    onClick={showPrev}
                    className="absolute top-1/2 -translate-y-1/2 left-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </button>

                  <button
                    onClick={showNext}
                    className="absolute top-1/2 -translate-y-1/2 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Dots / indicators */}
              {mediaItems.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {mediaItems.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`w-3 h-3 rounded-full ${
                        i === currentIndex ? "bg-[#36C0EF]" : "bg-gray-400"
                      }`}
                    ></button>
                  ))}
                </div>
              )}
            </div>
            <div className="background-gradients border border-gray-700 p-10 rounded-xl mt-6 w-full space-y-8">
              <div className="flex items-center space-x-3">
                <p className="text-[14px] font-bold py-4">
                  Dated :{" "}
                  <span className="font-normal">
                    {getDateFormat(data?.post?.updatedAt)}
                  </span>
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <p className="text-[14px] font-bold py-4">
                  User :{" "}
                  {/* <span className="font-normal">{data?.post?.user?.name}</span> */}
                </p>
                <img
                  src={data?.post?.user?.profilePicture}
                  alt={data?.post?.user?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p className="font-semibold">{data?.post?.user?.name}</p>
              </div>
              <div className="flex items-center space-x-3">
                <p className="text-[14px] font-bold py-4">
                  Text : <span className="font-normal">{data?.post?.text}</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
