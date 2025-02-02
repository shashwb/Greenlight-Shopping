import React, { useState } from "react";
import "../styles/filterpopover.css";

type FilterPopoverProps = {
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
  onApply: () => void;
};

const characteristics: string[] = [
  "Humane",
  "Locally Produced",
  "Healthy",
  "Plastic-Free",
  "Unhealthy",
  "Wasteful",
  "Vegan",
];

const FilterPopover: React.FC<FilterPopoverProps> = ({
  selectedFilters,
  setSelectedFilters,
  onApply,
}) => {
  const [localFilters, setLocalFilters] = useState<string[]>(selectedFilters);

  const toggleFilter = (char: string) => {
    setLocalFilters((prev) =>
      prev.includes(char) ? prev.filter((f) => f !== char) : [...prev, char]
    );
  };

  return (
    <div className="filter-popover mt-2">
      <h4 className="alt-main-font text-green-900  dark:text-green-900">
        Filter Characteristics
      </h4>
      <div className="mt-3">
        {characteristics.map((char) => (
          <label
            key={char}
            className="filter-option mb-2 text-gray-900 alt-main-font"
          >
            <input
              type="checkbox"
              checked={localFilters.includes(char)}
              onChange={() => toggleFilter(char)}
            />
            {char}
          </label>
        ))}
      </div>
      <button
        className="p-2 border rounded mt-4 bg-stone-200 dark:bg-green-800 dark:hover:bg-green-700 text-gray-900 dark:text-gray-100 alt-main-font"
        onClick={() => {
          setSelectedFilters(localFilters);
          onApply();
        }}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterPopover;
