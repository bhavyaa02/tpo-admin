import React from "react";
import TableComponent from "./TableComponent"; // Adjust the path as necessary

const TableComponentContainer = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
        Confirm Companies
      </h1>
      <TableComponent />
    </div>
  );
};

export default TableComponentContainer;
