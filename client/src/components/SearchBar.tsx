// import { useState, useEffect } from "react";
// import axios from "axios";

// const BASE_API_URL = "http://localhost:4000";

// const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState<string[]>([]);

//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       if (!query) return;
//       try {
//         const response = await axios.get(`${BASE_API_URL}/search?q=${query}`);
//         setSuggestions(response.data);
//       } catch (error) {
//         console.error("Error fetching suggestions:", error);
//       }
//     };

//     const delayDebounceFn = setTimeout(fetchSuggestions, 500);
//     return () => clearTimeout(delayDebounceFn);
//   }, [query]);

//   return (
//     <div className=" p-4 rounded-lg mb-8">
//       <input
//         type="text"
//         value={query}
//         placeholder="Search for products or characteristics..."
//         onChange={(e) => setQuery(e.target.value)}
//         className="p-4 rounded-lg w-full"
//       />
//       <ul className="bg-white rounded mt-1">
//         {suggestions.map((suggestion, index) => (
//           <li
//             key={index}
//             className="p-2 cursor-pointer hover:bg-gray-200"
//             onClick={() => onSearch(suggestion)}
//           >
//             {suggestion}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SearchBar;

import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_API_URL = "http://localhost:4000";

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(
          `${BASE_API_URL}/products/search?q=${query}`
        );
        setSuggestions(response.data);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <div className="relative w-full max-w-md mx-auto mb-10 mt-3">
      <input
        type="text"
        value={query}
        placeholder="Search for products..."
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        className="border p-2 rounded w-full dark:bg-gray-800 dark:text-white"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute w-full bg-white dark:bg-gray-900 border rounded mt-1 shadow-lg z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
              onMouseDown={() => {
                setQuery(suggestion);
                onSearch(suggestion);
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
