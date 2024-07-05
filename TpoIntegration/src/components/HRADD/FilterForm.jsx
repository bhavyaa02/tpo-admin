import React from "react";

const FilterForm = ({
  filterMode,
  setFilterMode,
  filterYear,
  setFilterYear,
  clearFilters,
}) => (
  <div className="flex space-x-2">
   
    
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={() => {
        // setFilterMode("");
        // setFilterYear("");
        clearFilters();
        // setFilterMode("");
        // setFilterYear("");
        // setSearchQuery("");
        // setShowList(false);
        // setIsHRListButtonVisible(true);
      }}
    >
      Clear Filters
    </button>
  </div>
);

export default FilterForm;
