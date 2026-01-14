import { useEffect, useState } from "react";
import { useCategoryData } from "../../hooks/api/Get";
import AddChallengeModal from "../../components/AddChallengeModal";

const SpinandSpark = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddChallengeOpen, setIsAddChallengeOpen] = useState(false);
const [update, setUpdate] = useState(false);

  // Categories
  const { data, loading, error } = useCategoryData(`/admin/game/categories`, 10, {}, 1, false);

if (error) {
  console.error("Failed to load categories", error);
  // Optionally render something in the UI
  // return <div className="text-red-400">Something went wrong loading categories.</div>;
}

  const categories = data?.categories || [];



useEffect(() => {
  if (!selectedCategory && categories.length > 0) {
    if (categories.includes("conversation")) {
      setSelectedCategory("conversation");
    } else {
      setSelectedCategory(categories[0]); // fallback
    }
  }
}, [categories, selectedCategory]);



  // Challenges
const { data: challengesData, loading: challengesLoading, error: challengesError } = useCategoryData(
  selectedCategory ? `/admin/game/challenges` : null,
  0,
  selectedCategory ? { category: selectedCategory } : null,
  0,
  false
);

if (challengesError) {
  console.error("Failed to load challenges", challengesError);
}



  const challenges = challengesData?.challenges || [];

  // Pagination
  const limit = 9;
  const totalPages = Math.ceil(challenges.length / limit);
  const startIndex = (currentPage - 1) * limit;
  const currentChallenges = challenges.slice(
    startIndex,
    startIndex + limit
  );

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="p-6 min-h-screen pt-2">
      {/* Header */}
     <div className="background-gradients relative p-6 rounded-xl text-white shadow-md border border-gray-700 overflow-hidden mt-4">
  <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />

  <div className="flex items-center justify-between">
    <h1 className="text-[32px] md:text-[36px] font-bold">
      Spin & Spark
    </h1>

   <button
  onClick={() => setIsAddChallengeOpen(true)}
  className="px-5 py-3 text-sm font-semibold rounded-lg button-bg text-white hover:opacity-90 transition"
>
  Create Challenge
</button>

  </div>
</div>


      {/* Categories Table */}
      <div className="mb-4 background-gradients border border-gray-700 p-6 rounded-xl mt-6">
  {/* Filters Container */}
  <h2 className="text-2xl font-bold text-white capitalize mb-4">
              Categories
            </h2>  
            <div className="flex flex-wrap gap-3">
    {/* Loading Skeleton */}
    {loading &&
      Array(6)
        .fill(0)
        .map((_, idx) => (
          <div
            key={idx}
            className="w-28 h-10 bg-gray-700 animate-pulse rounded-full"
          />
        ))}

    {/* Categories as Filters */}
    {!loading &&
      categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`px-5 py-2 text-sm font-medium rounded-full transition border
            ${
              selectedCategory === category
                ? "bg-[#DAB462] text-black border-[#DAB462]"
                : "bg-gray-800 bg-opacity-40 text-gray-300 border-gray-600 hover:bg-opacity-60"
            }`}
        >
          {category}
        </button>
      ))}

    {/* Empty State */}
    {!loading && categories.length === 0 && (
      <div className="text-gray-400">No categories found.</div>
    )}
  </div>
</div>

      {/* Challenges Section */}
      {selectedCategory && (
        <div className="background-gradients border border-gray-700 p-6 rounded-xl mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white capitalize">
              {selectedCategory} Challenges
            </h2>
            <span className="text-sm text-[#DAB462] font-semibold">
              Total: {challenges.length}
            </span>
          </div>

          {/* Loading */}
          {challengesLoading && (
            <div className="space-y-4">
              {Array(6)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-800 bg-opacity-40 p-4 rounded-lg animate-pulse h-20"
                  />
                ))}
            </div>
          )}

          {/* Empty */}
          {!challengesLoading && challenges.length === 0 && (
            <p className="text-center text-gray-400 py-8">
              No challenges found.
            </p>
          )}

          {/* Challenges Grid */}
          <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentChallenges.map((challenge, idx) => (
              <div
                key={idx}
                className="bg-gray-800 bg-opacity-40 p-4 rounded-lg hover:bg-opacity-60 transition border border-gray-700"
              >
                <div className="text-sm text-gray-400 mb-2 font-medium">
                  Challenge #{startIndex + idx + 1}
                </div>
                <div className="text-gray-200 font-semibold">
                  {challenge}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
        
        </div>
        
      )}

        {totalPages > 1 && (
            <div className="flex justify-end items-center gap-4 mt-10">
              <button
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage === 1}
                className="px-5 py-2 bg-gray-900 border border-gray-700 text-white rounded-lg disabled:opacity-50 hover:bg-gray-800 transition"
              >
                Previous
              </button>

              <span className="text-gray-300 font-medium">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage === totalPages}
                className="px-5 py-2 bg-gray-900 border border-gray-700 text-white rounded-lg disabled:opacity-50 hover:bg-gray-800 transition"
              >
                Next
              </button>
            </div>
          )}

      <AddChallengeModal
  isOpen={isAddChallengeOpen}
  onClose={() => setIsAddChallengeOpen(false)}
  categories={categories}
  defaultCategory={selectedCategory}
  setUpdate={setUpdate}
/>

    </div>
  );
};

export default SpinandSpark;
