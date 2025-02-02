import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

/** context */
import { DarkModeContext } from "../DarkModeContext";

/** components */
import FilterPopover from "./FilterPopover";
import "../styles/searchbar.css";

const BASE_API_URL = "http://localhost:4000";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const darkModeContext = useContext(DarkModeContext);
  const { isDarkMode } = darkModeContext || {};

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
    <div className="relative w-full max-w-3xl mx-auto mb-10 mt-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          placeholder="Search for products..."
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="border p-2 rounded w-full dark:bg-gray-800 dark:text-white"
        />
        <div className="relative">
          <button
            className="p-4 rounded-md hover:bg-slate-50 text-white-900 dark:text-white dark:hover:bg-gray-600"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <svg
              className="w-6 h-6 fill-white"
              fill="none"
              height="28"
              viewBox="0 0 28 28"
              width="28"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 7.0625C2 6.47569 2.48843 6 3.09091 6H24.9091C25.5116 6 26 6.47569 26 7.0625C26 7.64931 25.5116 8.125 24.9091 8.125H3.09091C2.48843 8.125 2 7.64931 2 7.0625Z"
                fill={isDarkMode ? "white" : "black"}
              />
              <path
                d="M6.90909 14.5C6.90909 13.9132 7.39752 13.4375 8 13.4375H20C20.6025 13.4375 21.0909 13.9132 21.0909 14.5C21.0909 15.0868 20.6025 15.5625 20 15.5625H8C7.39752 15.5625 6.90909 15.0868 6.90909 14.5Z"
                fill={isDarkMode ? "white" : "black"}
              />
              <path
                d="M12.3636 20.875C11.7612 20.875 11.2727 21.3507 11.2727 21.9375C11.2727 22.5243 11.7612 23 12.3636 23H15.6364C16.2388 23 16.7273 22.5243 16.7273 21.9375C16.7273 21.3507 16.2388 20.875 15.6364 20.875H12.3636Z"
                fill={isDarkMode ? "white" : "black"}
              />
            </svg>
          </button>
          {isFilterOpen && (
            <div className="top-full left-0 z-10">
              <FilterPopover
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                onApply={() => {
                  setIsFilterOpen(false);
                  onSearch(query);
                }}
              />
            </div>
          )}
        </div>
        <button
          className="alt-main-font p-4 rounded-md hover:bg-green-700 dark:hover:bg-gray-600 bg-green-800 text-white dark:bg-gray-700 dark:text-white text-white"
          onClick={() => onSearch(query)}
        >
          <span>Search</span>
        </button>
      </div>
      <div className="selected-tags mt-2 alt-main-font text-gray-800">
        {selectedFilters.map((char) => (
          <span
            key={char}
            className="tag"
            onClick={() =>
              setSelectedFilters(selectedFilters.filter((f) => f !== char))
            }
          >
            {char} ✕
          </span>
        ))}
      </div>
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
