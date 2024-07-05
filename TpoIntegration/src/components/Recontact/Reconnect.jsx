import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
import api from '../../api';

const Reconnect = () => {
  // const API_BASE_URL = "http://localhost:8000/api/companies";
  const [record, setRecord] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5); // Number of records per page
  const [editId, setEditId] = useState(null);
  const [editStatus, setEditStatus] = useState("");
  const [editRemark, setEditRemark] = useState("");
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [flagCompanies, setFlagCompanies] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [totaldata, setTotalData] = useState([]);
  // Calculate index of the last record on the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  // Calculate index of the first record on the current page
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // Slice records array to get records for the current page
  // const currentRecords = record.slice(indexOfFirstRecord, indexOfLastRecord);

  // Function to fetch data from API
  // const getData = () => {
  //   // fetch(`http://localhost:8000/api/companies/flagged-remarks`)
  //   api.get(`remarks/flag`)
  //     .then((response) => response.json())
  //     .then((data) => setRecord(data))
  //     .catch((error) => console.error("Error fetching data:", error));
  // };

  const getData = () => {
    api.get(`remarks/flag`)
      .then((response) => {
        setRecord(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Function to fetch Total companies count
  // const getTotalCompanies = () => {
  //   api.get(`/companies/getAll`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Data", data);
  //       setTotalData(data);
  //       setTotalCompanies(data.length);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching total companies:", error);
  //     });
  // };
  const getTotalCompanies = () => {
    api.get(`companies/getAll`)
      .then((response) => {
        console.log("Data", response.data);
        setTotalData(response.data);
        setTotalCompanies(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching total companies:", error);
      });
  };
  // Function to fetch Flag companies count
  // const getFlagCompanies = () => {
  //   // fetch(`http://localhost:8000/api/companies/flagged-remarks`)
  //   api.get(`remarks/flag`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setFlagCompanies(data.length); // Corrected to set flagCompanies
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching flagged companies:", error);
  //     });
  // };
  const getFlagCompanies = () => {
    api.get(`remarks/flag`)
      .then((response) => {
        setFlagCompanies(response.data.length); // Corrected to set flagCompanies
      })
      .catch((error) => {
        console.error("Error fetching flagged companies:", error);
      });
  };

  // Fetch data on component mount
  useEffect(() => {
    getData();
    getTotalCompanies();
    getFlagCompanies();
  }, []);

  // Handle edit button click
  const handleEdit = (id) => {
    setEditId(id); // Set the ID of the record to edit
    const recordToEdit = record.find((item) => item.id === id);
    setEditStatus(recordToEdit.status);
    setEditRemark(recordToEdit.remark);
  };

  // Handle status change in edit mode
  const handleStatusChange = (event) => {
    setEditStatus(event.target.value);
  };

  // Handle remark change in edit mode
  const handleRemarkChange = (event) => {
    setEditRemark(event.target.value);
  };

  // Handle save button click to update remark
  const handleSave = () => {
    axios
      .put(
        `http://localhost:8000/api/companies/update-flagged-remark/${editId}`,
        {
          status: editStatus,
          remark: editRemark,
        }
      )
      .then((response) => {
        console.log("Successfully updated record:", response.data);
        // Update local state after successful update
        const updatedRecords = record.map((item) =>
          item.id === editId
            ? { ...item, status: editStatus, remark: editRemark }
            : item
        );
        setRecord(updatedRecords);
        // Reset edit state
        setEditId(null);
        setEditStatus("");
        setEditRemark("");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating record:", error);
      });
  };

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd-MM-yyyy"); // Format date as dd-MM-yyyy
  };

  // Pagination function
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Filter companies based on search query
  const filteredCompanies = record.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-12">
      <div className="col main pt-5 mt-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb flex text-gray-600">
            <li className="breadcrumb-item">
              <a href="#" className="text-blue-500">
                Home
              </a>
            </li>
            <li className="breadcrumb-item">
              <a href="#" className="text-blue-500">
                Library
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Data
            </li>
          </ol>
        </nav>
        <p className="lead hidden sm:block">Add Employee Details and Records</p>
        <div
          className="alert alert-warning fade collapse"
          role="alert"
          id="myAlert"
        >
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close</span>
          </button>
          <strong>Data and Records</strong> Learn more about employee
        </div>

        {/* Search Input and Filter Button */}
        <div className="mb-4 flex">
          {/* <input
            type="text"
            className="flex-1 p-2 border rounded mr-2"
            placeholder="Search by Company Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          /> */}

          <select
            className="w-100"
            onChange={(e) => setSearchQuery(e.target.value)}
          >
            <option defaultChecked>Select the Company</option>

            {totaldata.map((data, i) => (
              <option key={i} value={data.name}>
                {data.name}
              </option>
            ))}
          </select>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setSearchQuery("")}
          >
            Clear Filters
          </button>
        </div>

        <div className="row mb-6 hidden sm:flex" id="card-display">
          <div className="col-xl-6 col-sm-6 py-2">
            <div className="card bg-green-500 text-white h-100">
              <div className="card-body" style={{ backgroundColor: "#57b960" }}>
                <div className="rotate">
                  <i className="fa fa-user fa-4x"></i>
                </div>
                <h6 className="uppercase">All Companies</h6>
                <h1 className="text-4xl">{totalCompanies}</h1>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-sm-6 py-2">
            <div className="card bg-red-500 text-white h-100">
              <div className="card-body">
                <div className="rotate">
                  <i className="fa fa-list fa-4x"></i>
                </div>
                <h6 className="uppercase">Flag Remark</h6>
                <h1 className="text-4xl">{flagCompanies}</h1>
              </div>
            </div>
          </div>
        </div>
        <hr />

        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <h5 className="mt-3 mb-3 text-secondary">
              Check More Records of Employees
            </h5>
            <div className="table-responsive">
              <table className="table table-striped custom-table">
                <thead className="thead-light">
                  <tr>
                    <th>No</th>
                    <th>Company Name</th>
                    <th>Remark</th>
                    <th>Remark Date</th>
                    <th>Status</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {filteredCompanies
                    .slice(indexOfFirstRecord, indexOfLastRecord)
                    .map((output, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{output.name}</td>
                        <td>
                          {editId === output.id ? (
                            <input
                              type="text"
                              className="form-control mr-2"
                              placeholder="Enter Remark"
                              value={editRemark}
                              onChange={handleRemarkChange}
                            />
                          ) : (
                            output.remark
                          )}
                        </td>
                        <td>{formatDate(output.lastRemarkTime)}</td>
                        <td>
                          {editId === output.id ? (
                            <select
                              className="form-control"
                              value={editStatus}
                              onChange={handleStatusChange}
                            >
                              <option value="1">Still Communication</option>
                              <option value="2">Confirmed</option>
                              <option value="3">HR</option>
                              <option value="4">Paused</option>
                            </select>
                          ) : (
                            output.status
                          )}
                        </td>
                        {/* <td>
                          {editId === output.id ? (
                            <div>
                              <button
                                className="btn btn-sm bg-green-500 text-white mr-2"
                                // onClick={handleSave}
                                onClick={null}
                              >
                                Save
                              </button>
                              <button
                                className="btn btn-sm bg-gray-500 text-white"
                                onClick={() => setEditId(null)}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              className="btn btn-sm bg-blue-500 text-white"
                              onClick={() => handleEdit(output.id)}
                            >
                              Edit
                            </button>
                          )}
                        </td> */}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <nav>
              <ul className="pagination">
                {filteredCompanies.length > recordsPerPage &&
                  Array(Math.ceil(filteredCompanies.length / recordsPerPage))
                    .fill()
                    .map((_, i) => (
                      <li
                        key={i}
                        className={`page-item ${
                          currentPage === i + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          onClick={() => paginate(i + 1)}
                          className="page-link"
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reconnect;
