const PostsSkeleton = () => {
  return Array.from({ length: 6 }).map((_, index) => (
    <div
      key={index}
      className="background-gradient cursor-pointer rounded-2xl overflow-hidden shadow-lg border border-gray-800 transition-all relative animate-pulse"
    >
      {/* User Info */}
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-700" />
          <div className="h-4 w-24 bg-gray-600 rounded" />
        </div>
        <div className="w-6 h-6 bg-gray-700 rounded-full" />
      </div>

      {/* Image */}
      <div className="mt-3">
        <div className="w-full h-60 bg-gray-800 rounded-t-lg" />
      </div>

      {/* Description */}
      <div className="p-4 space-y-4">
        <div className="h-4 w-full bg-gray-700 rounded" />
        <div className="h-4 w-3/4 bg-gray-700 rounded" />

        {/* Likes & Comments */}
        <div className="flex justify-between items-center text-sm mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-full" />
            <div className="h-4 w-6 bg-gray-600 rounded" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-500 rounded-full" />
            <div className="h-4 w-6 bg-gray-600 rounded" />
          </div>
        </div>
      </div>
    </div>
  ));
};

export default PostsSkeleton;
