const NotificationsSkeleton = () => {
  return (
    <section className="mt-6 background-gradients border border-gray-700 p-6 rounded-xl space-y-6">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="background-gradient border border-gray-700 p-6 rounded-xl animate-pulse"
        >
          <div className="flex justify-between items-center">
            <div className="h-6 w-2/3 bg-gray-600 rounded"></div>
            <div className="h-4 w-1/4 bg-gray-700 rounded"></div>
          </div>
          <div className="mt-2 h-4 w-full bg-gray-700 rounded"></div>
          <div className="mt-2 h-4 w-5/6 bg-gray-700 rounded"></div>
          <div className="mt-2 h-4 w-4/6 bg-gray-700 rounded"></div>
          <div className="flex justify-end mt-4">
            <div className="h-6 w-6 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default NotificationsSkeleton;
