// import react from "react";

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({
//   currentPage,
//   totalPages,
//   onPageChange,
// }) => {
//   const handlePageChange = (page: number) => {
//     onPageChange(page);
//   };

//   return (
//     <div className="flex justify-center">
//       {Array.from({ length: totalPages }, (_, index) => index + 1).map(
//         (page) => (
//           <button
//             key={page}
//             className={`${
//               currentPage === page
//                 ? "bg-blue-500 text-white"
//                 : "bg-white text-black" // Use a different color for non-active pages
//             } px-4 py-2 mx-1 rounded`}
//             onClick={() => handlePageChange(page)}
//           >
//             {page}
//           </button>
//         )
//       )}
//     </div>
//   );
// };

// export default Pagination;

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center mt-6 space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white rounded-md disabled:opacity-50"
      >
        ← Previous
      </button>

      <span className="px-4 py-2 text-gray-800 dark:text-white">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => {
          console.log("woah woah woah woah, currentPage", currentPage);
          onPageChange(currentPage + 1);
        }}
        disabled={currentPage === totalPages}
        className="px-3 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white rounded-md disabled:opacity-50"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
