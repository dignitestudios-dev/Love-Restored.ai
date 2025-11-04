const UserDetailSkeleton = () => {
  return (
    <div className="background-gradients border border-gray-700 p-10 rounded-xl mt-6 w-full space-y-8 animate-pulse">
      {/* Profile Header Skeleton */}
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-6">
        <div className="w-40 h-40 rounded-full bg-gray-700 shadow-lg" />
        <div className="space-y-4 w-full">
          <div className="h-8 w-1/2 bg-gray-700 rounded" />
          <div className="h-6 w-1/3 bg-gray-600 rounded" />
          <div className="h-5 w-24 bg-green-800 bg-opacity-30 rounded-full" />
        </div>
      </div>

      {/* Info Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="border border-gray-700 background-gradient p-6 rounded-lg space-y-4"
          >
            <div className="h-5 w-1/3 bg-gray-600 rounded" />
            <div className="h-6 w-2/3 bg-gray-700 rounded" />
          </div>
        ))}
      </div>

      {/* Action Buttons Skeleton */}
      <div className="flex justify-end items-center space-x-6">
        <div className="px-8 py-3 rounded-xl border border-gray-600 bg-gray-700 w-24 h-10" />
        <div className="px-8 py-3 rounded-xl bg-red-500 w-24 h-10" />
      </div>
    </div>
  );
};

export default UserDetailSkeleton;
