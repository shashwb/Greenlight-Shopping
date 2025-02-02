import React from "react";

interface FilterProps {
  onFilterChange: (filters: { [key: string]: string | number }) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  return (
    <div className="flex space-x-4 mb-6">
      <input
        type="number"
        placeholder="Min Price"
        className="p-2 border rounded"
        onChange={(e) => onFilterChange({ minPrice: Number(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Max Price"
        className="p-2 border rounded"
        onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Min Score"
        className="p-2 border rounded"
        onChange={(e) => onFilterChange({ minScore: Number(e.target.value) })}
      />
    </div>
  );
};

export default Filter;
