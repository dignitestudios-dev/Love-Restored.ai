/* eslint-disable react/prop-types */
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const DOTS = "dots";

const getDisplayPages = (currentPage, totalPages, siblingCount = 1) => {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 2);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  const pages = [1];

  if (showLeftDots) {
    pages.push(DOTS);
  } else {
    for (let i = 2; i < leftSibling; i++) pages.push(i);
  }

  for (let i = leftSibling; i <= rightSibling; i++) pages.push(i);

  if (showRightDots) {
    pages.push(DOTS);
  } else {
    for (let i = rightSibling + 1; i < totalPages; i++) pages.push(i);
  }

  pages.push(totalPages);
  return pages;
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const displayPages = getDisplayPages(currentPage, totalPages);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-end mt-8 space-x-2">
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`p-2 rounded-full border border-gray-700 transition ${
          currentPage === 1
            ? "text-gray-500 cursor-not-allowed"
            : "text-gray-300 hover:bg-[#BE8B36] hover:text-white"
        }`}
        aria-label="Previous Page"
      >
        <FaChevronLeft className="w-4 h-4" />
      </button>

      {/* Page Numbers */}
      {displayPages.map((item, index) =>
        item === DOTS ? (
          <span
            key={`dots-${index}`}
            className="px-4 py-2 text-gray-400 text-sm"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            className={`px-4 py-2 rounded-xl border border-gray-700 text-sm transition ${
              item === currentPage
                ? "bg-[#BE8B36] text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            {item}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-full border border-gray-700 transition ${
          currentPage === totalPages
            ? "text-gray-500 cursor-not-allowed"
            : "text-gray-300 hover:bg-[#BE8B36] hover:text-white"
        }`}
        aria-label="Next Page"
      >
        <FaChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
