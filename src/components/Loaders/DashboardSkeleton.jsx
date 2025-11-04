const DashboardSkeleton = () => {
  return (
    <div>
      {/* Dashboard Header Skeleton */}
      <div className="background-gradients relative p-6 rounded-xl text-white shadow-md border border-gray-700 overflow-hidden mt-4 animate-pulse">
        <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />
        <div className="h-10 w-1/3 bg-gray-700 rounded" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4 mt-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="background-gradient relative p-6 rounded-md text-white shadow-md border border-gray-700 overflow-hidden animate-pulse"
          >
            <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 w-24 bg-gray-700 rounded mb-3" />
                <div className="h-10 w-20 bg-gray-600 rounded" />
              </div>
              <div className="h-10 w-10 bg-gray-700 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="background-gradient border border-gray-700 p-6 rounded-xl mt-6 animate-pulse">
        <div className="h-6 w-1/4 bg-gray-700 rounded mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Area Chart Skeleton */}
          <div className="background-gradient border border-gray-700 rounded-xl p-6 col-span-2">
            <div className="h-5 w-1/3 bg-gray-700 rounded mb-6" />
            <div className="h-[300px] w-full bg-gray-800 rounded" />
          </div>

          {/* Pie Chart Skeleton */}
          <div className="background-gradients border border-gray-700 rounded-xl p-6">
            <div className="h-5 w-1/2 bg-gray-700 rounded mb-8" />
            <div className="h-[300px] w-full bg-gray-800 rounded-full" />
          </div>
        </div>
      </div>

      {/* Users Table Skeleton */}
      <div className="mb-4 background-gradients border border-gray-700 p-6 rounded-xl mt-6 animate-pulse">
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 w-1/3 bg-gray-700 rounded" />
          <div className="h-4 w-16 bg-gray-600 rounded" />
        </div>

        <div className="grid grid-cols-6 gap-4 text-left text-sm font-semibold text-gray-300 border-b border-gray-600 pb-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-700 rounded" />
          ))}
        </div>

        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-6 gap-4 items-center text-sm text-gray-200 bg-gray-800 bg-opacity-40 p-4 rounded-lg mt-4"
          >
            {[...Array(6)].map((_, j) => (
              <div key={j} className="h-4 bg-gray-700 rounded w-full" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
