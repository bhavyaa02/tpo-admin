// import React from "react";

// const ClearFiltersButton = ({ onClick }) => {
//   return (
//     <button className="clearFilterButton" onClick={onClick}>
//       Clear Filters
//     </button>
//   );
// };

// export default ClearFiltersButton;

// newely ui added

import React from "react";

const ClearFiltersButton = ({ onClick }) => {
  return (
    <div className="clearFilterButtonCon">
      <button className="clearFilterButton" onClick={onClick}>
        Clear Filters
      </button>
    </div>
  );
};

export default ClearFiltersButton;
