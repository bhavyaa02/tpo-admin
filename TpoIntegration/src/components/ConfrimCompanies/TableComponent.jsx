import React, { useEffect, useState } from "react";
// import axios from 'axios';
import api from '../../api';

const TableComponent = () => {
  const [confirmCompanies, setConfirmCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");

  useEffect(() => {
    fetchConfirmCompanies();
  }, []);

  const fetchConfirmCompanies = () => {
    api.get("remarks/confirmed")
      .then(res => {
        setConfirmCompanies(res.data);
      })
      .catch(err => {
        console.error('Error fetching companies:', err);
      });
  };

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const handleClearFilter = () => {
    setSelectedCompany("");
  };

  const filteredCompanies = confirmCompanies.filter((item) => {
    return selectedCompany === "" || item.companyName === selectedCompany;
  });

  return (
    <div className="p-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Company Table</h2>
      <div className="mb-4">
        <label className="block mb-2">
          <span className="text-gray-700">Filter by Company:</span>
          <select
            value={selectedCompany}
            onChange={handleCompanyChange}
            className="block w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">All</option>
            {Array.from(new Set(confirmCompanies.map((item) => item.companyName))).map((companyName, index) => (
              <option key={index} value={companyName}>
                {companyName}
              </option>
            ))}
          </select>
        </label>
        <button
          onClick={handleClearFilter}
          className="mt-2 p-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
        >
          Clear Filter
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="py-2 px-8 border-b bg-gray-200 sticky left-0 z-10 w-16">
                ID
              </th>
              <th className="py-2 px-4 border-b bg-gray-200 sticky left-14 z-10 w-48">
                Company Name
              </th>
              <th className="py-2 px-4 border-b bg-gray-200 text-left">
                Location
              </th>
              <th className="py-2 px-4 border-b bg-gray-200 text-left">
                Mode Of Communication
              </th>
              <th className="py-2 px-4 border-b bg-gray-200 text-left">
                Academic Year
              </th>
              <th className="py-2 px-4 border-b bg-gray-200 text-left">
                Visited
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map((item, index) => (
              <tr key={item.companyId}>
                <td className="py-2 px-8 border-b sticky left-0 bg-white">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border-b sticky left-14 bg-white">
                  {item.companyName}
                </td>
                <td className="py-2 px-4 border-b sticky left-14 bg-white">
                  {item.location}
                </td>
                <td className="py-2 px-4 border-b sticky left-14 bg-white">
                  {item.mode_of_communication}
                </td>
                <td className="py-2 px-4 border-b sticky left-14 bg-white">
                  {item.academic_year}
                </td>
                <td className="py-2 px-4 border-b sticky left-14 bg-white">
                  {item.visited}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
