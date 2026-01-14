import { useState } from "react";
import { useParams } from "react-router";
import { useCategoryData } from "../../hooks/api/Get";

const SpinAndSparkChallenges = () => {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category);

  const { data, loading } = useCategoryData(
    `/admin/game/challenges`,
    0,
    { category: decodedCategory },
    0,
    false
  );

  const challenges = data?.challenges || [];

  // Frontend pagination
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const totalPages = Math.ceil(challenges.length / limit);

  const startIndex = (currentPage - 1) * limit;
  const currentChallenges = challenges.slice(startIndex, startIndex + limit);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 rounded-xl mb-8 shadow-lg relative overflow-hidden">
        <h1 className="text-4xl md:text-5xl font-extrabold capitalize">
          {decodedCategory} Challenges
        </h1>
        <p className="mt-2 text-gray-200">
          Total Challenges: {challenges.length}
        </p>
        <span className="absolute top-4 right-6 px-3 py-1 bg-white text-gray-900 font-semibold rounded-full text-sm">
          {decodedCategory.toUpperCase()}
        </span>
      </div>

      {/* Loading / Empty State */}
      {loading && <p className="text-center text-gray-400">Loading...</p>}
      {!loading && challenges.length === 0 && (
        <p className="text-center text-gray-400">No challenges found.</p>
      )}

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentChallenges.map((challenge, idx) => (
          <div
            key={idx}
            className="bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between"
          >
            <div className="text-gray-300 font-semibold mb-2">
              Challenge #{startIndex + idx + 1}
            </div>
            <div className="text-gray-100">{challenge}</div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-5 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-lg font-medium transition"
          >
            Previous
          </button>

          <span className="text-gray-300 font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-5 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-lg font-medium transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SpinAndSparkChallenges;
