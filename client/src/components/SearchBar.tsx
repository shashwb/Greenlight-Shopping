import { useState, useEffect } from "react";
import axios from "axios";

const BASE_API_URL = "http://localhost:4000";

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query) return;
      try {
        const response = await axios.get(`${BASE_API_URL}/search?q=${query}`);
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    const delayDebounceFn = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        placeholder="Search for products..."
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <ul className="bg-white border rounded mt-1">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="p-2 cursor-pointer hover:bg-gray-200"
            onClick={() => onSearch(suggestion)}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
