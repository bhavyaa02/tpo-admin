import React, { useState, useEffect } from "react";
import HRList from "./HRList";
import FilterForm from "./FilterForm";
import AddHR from "./AddHR";
import AddHRForm from "./AddHRForm";
import EditHR from "./EditHR";
import api from '../../api';

function HRDash() {
  const [companies, setCompanies] = useState([]);

  const [isAddPopupVisible, setIsAddPopupVisible] = useState(false);
  const [filterMode, setFilterMode] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCompany, setEditingCompany] = useState(null);
  const [companyid, setCompanyID] = useState(0);
  const [showlist, setShowList] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [hrdata, setHRData] = useState([]);
  const [isediting, setIsEditing] = useState(false);
  const [isHRListButtonVisible, setIsHRListButtonVisible] = useState(true); // New state variable

  useEffect(() => {
    const getTeamData = async () => {
      try {
        const res = await api.get(
          "companies/getAll"
        );

        console.log("Fetched companies:", res.data);
        const validCompanies = res.data.filter(
          (company) => company && company.name
        );
        setCompanies(validCompanies);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    getTeamData();
  }, []);

  const validateYear = (year) => {
    const yearRegex = /^(19|20)\d{2}$/;
    return yearRegex.test(year);
  };

  // useEffect(() => {
  //     const getHRData = async () => {
  //         try {
  //             const res = await axios.get(`http://localhost:8000/api/hr/hrlist/${searchQuery}`);
  //             console.log("Fetched HR Data:", res.data);
  //             setCompanies(res.data);
  //         } catch (error) {
  //             console.error("Error fetching team data:", error);
  //         }
  //     };
  //     if (searchQuery) {
  //         getHRData();
  //     }
  // }, [searchQuery])

  const getHRList = async (e) => {
    e.preventDefault();
    if (!searchQuery) {
      alert("Please select the company!!");
    } else {
      setShowList(true);
      try {
        console.log(selectedCompany);
        const res = await api.get(
          `hr/hrlist/${searchQuery}`
        );
        console.log("Fetched HR Data:", res.data);
        setHRData(res.data);
        
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    }
  };

  const addCompany = (company) => {
    if (editingCompany) {
      const updatedCompanies = companies.map((comp, index) =>
        index === editingCompany.index ? company : comp
      );
      setCompanies(updatedCompanies);
    } else {
      setCompanies([...companies, company]);
    }
    setEditingCompany(null);
    setIsAddPopupVisible(false);
  };

  const editCompany = (index) => {
    setEditingCompany({ ...hrdata[index], index });
    // console.log( "Index wala",...companies[index])
    console.log("Edit fucntion called: ", hrdata[index]);
    // setIsAddPopupVisible(true);
    setIsEditing(true);
  };

  const addHR = (index) => {
    setEditingCompany({ ...companies[index], index });
    setIsAddPopupVisible(true);
  };

  const deleteCompany = async (hrid) => {
    console.log(hrid);
    if (window.confirm("Are you sure you want to delete this HR?")) {
      try {
        const res = await api.delete(`hr/${hrid}`);
        console.log(res.data);
        // Refresh the HR list after deletion
        setHRData(hrdata.filter((hr) => hr.id !== hrid));
      } catch (error) {
        console.error("Error deleting HR:", error);
      }
    }
  };

  const clearFilters = () => {
    setFilterMode("");
    setFilterYear("");
    setSearchQuery("");
    setSelectedCompany(null);
    setShowList(false);
    setIsHRListButtonVisible(true);
    setHRData([]);
  };

  // const filteredCompanies = companies
  //     .filter((company) =>
  //         company.company_name.includes(searchQuery)
  //     );

  // console.log("Selected Company :", filteredCompanies)

  const handleSelectChange = (e) => {
    const selectedCompanyName = e.target.value;
    const company = companies.find(
      (company) => company.name === selectedCompanyName
    );
    setSelectedCompany(company);
    setSearchQuery(e.target.value);
    // setSearchQuery(company ? company.name : "");

  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-3">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-lg mr-2"
          onClick={() => {
            setIsAddPopupVisible(true);
            setEditingCompany(null);
            setCompanyID(searchQuery);
          }}
        >
          Add
        </button>
        {/* <input
          type="text"
          className="flex-1 p-2 border rounded"
          placeholder="Search by Company Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        /> */}

        <select
          className="flex-1 p-2 border rounded"
          // value={selectedCompany ? selectedCompany : ""}
          onChange={handleSelectChange}
        >
          <option value="">Select the Company</option>
          {companies.map((data, i) => (
            // console.log(data),
            <option key={i} value={data.id}>
              {data.name}
            </option>
          ))}
        </select>

        <FilterForm
          filterMode={filterMode}
          setFilterMode={setFilterMode}
          filterYear={filterYear}
          setFilterYear={setFilterYear}
          clearFilters={clearFilters}
        />
      </div>

      {isAddPopupVisible && (
        <AddHR
          onSave={addCompany}
          onCancel={() => setIsAddPopupVisible(false)}
          editingCompany={editingCompany}
          setEditingCompany={setEditingCompany}
          validateYear={validateYear}
          companyid={companyid}
          company_name={searchQuery}
        />
      )}

      {isediting && (
        <EditHR
          onSave={addCompany}
          onCancel={() => setIsEditing(false)}
          editingCompany={editingCompany}
          setEditingCompany={setEditingCompany}
          validateYear={validateYear}
          companyid={companyid}
          company_name={searchQuery}
        />
      )}

{isHRListButtonVisible && (
        <button onClick={(e) => getHRList(e)}>Get HR List</button>
      )}
    {showlist && (
        <HRList
          companies={hrdata}
          editCompany={editCompany}
          deleteCompany={deleteCompany}
        />
      )}

      {/* {!showlist ? (
        <button onClick={(e) => getHRList(e)}>Get HR List</button>
      ) : (

        <HRList
          //  companies={selectedCompany ? [selectedCompany] : []}
          companies={hrdata}
          editCompany={editCompany}
          deleteCompany={deleteCompany}
        />
      )} */}
    </div>
  );
}

export default HRDash;
