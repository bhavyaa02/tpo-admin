// // import React, { useState, useEffect } from "react";
// // // import axios from 'axios';
// // import AddRemarkForm from "./AddRemarkForm";
// // import ClearFiltersButton from "./ClearFiltersButton";
// // import RemarkItem from "./RemarkItem";
// // import "./companyremark.css";

// // const CompanyRemark = () => {
// //   const [companies, setCompanies] = useState([]);
// //   const [company, setCompany] = useState("");
// //   const [remarks, setRemarks] = useState([]);
// //   const [showAddRemarkForm, setShowAddRemarkForm] = useState(false);

// //   useEffect(() => {
// //     const fetchCompanies = async () => {
// //       try {
// //         const response = await axios.get(
// //           "http://localhost:8000/api/companies/getCompanyList"
// //         );
// //         console.log("Fetched companies:", response.data);
// //         setCompanies(response.data);
// //       } catch (error) {
// //         console.error("Error fetching companies:", error);
// //       }
// //     };
// //     fetchCompanies();
// //   }, []);

// //   const handleCompanyChange = async (e) => {
// //     const companyId = e.target.value;
// //     setCompany(companyId);

// //     try {
// //       if (companyId) {
// //         axios
// //           .get(`http://localhost:8000/api/companies/${companyId}/remarks`)
// //           .then((response) => {
// //             console.log("Fetched remarks for company:", response.data);
// //             setRemarks(response.data);
// //           })
// //           .catch((error) => console.error("Error fetching remarks:", error));
// //       } else {
// //         setRemarks([]);
// //       }
// //       setShowAddRemarkForm(false);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   const handleAddRemark = (newRemark) => {
// //     console.log(JSON.stringify(newRemark));
// //     axios
// //       .post(
// //         `http://localhost:8000/api/companies/${company}/remarks`,
// //         JSON.stringify(newRemark),
// //         {
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       )
// //       .then((response) => {
// //         // console.log('Added new remark:', response.data);
// //         setRemarks([...remarks, { ...newRemark, id: response.data.insertId }]);
// //       })
// //       .catch((error) => console.error("Error adding remark:", error));
// //     setShowAddRemarkForm(false);
// //   };

// //   const handleUpdateStatus = (remarkId, newStatus) => {
// //     // console.log(remarkId);
// //     // console.log(newStatus);
// //     axios
// //       .put(
// //         `http://localhost:8000/api/companies/${company}/remarks/${remarkId}`,
// //         { status: newStatus }
// //       )
// //       .then((response) => {
// //         // console.log('Updated remark status:', response.data);
// //         const updatedRemarks = remarks.map((remark) =>
// //           remark.id === remarkId ? { ...remark, status: newStatus } : remark
// //         );
// //         setRemarks(updatedRemarks);
// //         window.reload();
// //       })
// //       .catch((error) => console.error("Error updating status:", error));
// //   };

// //   const handleClearFilters = () => {
// //     setCompany("");
// //     setRemarks([]);
// //     setShowAddRemarkForm(false);
// //   };

// //   return (
// //     <div>
// //       <div className="header">
// //         <select value={company} onChange={handleCompanyChange}>
// //           <option defaultChecked>--Select Company--</option>

// //           {companies.map((company) => (
// //             <option key={company.id} value={company.id}>
// //               {company.company_name}
// //             </option>
// //           ))}
// //         </select>
// //         <ClearFiltersButton onClick={handleClearFilters} />
// //       </div>
// //       {!company ? (
// //         <div className="no-selection-message">
// //           <h2>Select Companies to view Remarks</h2>
// //         </div>
// //       ) : (
// //         <>
// //           <div className="academic-year">
// //             <h2>
// //               Academic Year:{" "}
// //               {companies.find((c) => c.id === parseInt(company, 10))
// //                 ?.academic_year || "N/A"}
// //             </h2>
// //           </div>
// //           {/* <div className="academic-year">
// //             <p>
// //               <strong>
// //                 <h2>Academic Year :</h2>
// //               </strong>{" "}
// //               <h2>
// //               {companies.find((c) => c.id === parseInt(company, 10))?.academic_year || "N/A"}
// //               </h2>
// //             </p>
// //           </div> */}
// //           <div className="remark-list">
// //             <div className="perfectMatch">
// //               <h2>Contact Remarks</h2>
// //               <p>Displaying the Interactions and Remark History</p>
// //               <div className="line"></div>
// //             </div>
// //             {remarks.length > 0 ? (
// //               remarks.map((remark) => (
// //                 <RemarkItem
// //                   key={remark.id}
// //                   remark={remark}
// //                   onUpdateStatus={handleUpdateStatus}
// //                 />
// //               ))
// //             ) : (
// //               <p>No remarks available.</p>
// //             )}
// //           </div>
// //           <div className="buttonAdd">
// //             <button onClick={() => setShowAddRemarkForm(true)}>
// //               Add New Remark
// //             </button>
// //           </div>{" "}
// //           {showAddRemarkForm && (
// //             <AddRemarkForm
// //               onAddRemark={handleAddRemark}
// //               showModal={showAddRemarkForm}
// //               setShowModal={setShowAddRemarkForm}
// //             />
// //           )}
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default CompanyRemark;

// //newly ui added
// import React, { useState, useEffect } from "react";
// import AddRemarkForm from "./AddRemarkForm";
// import ClearFiltersButton from "./ClearFiltersButton";
// import RemarkItem from "./RemarkItem";
// import "./companyremark.css";

// const initialCompaniesData = [
//   {
//     name: "Company A",
//     academicYears: ["2023-24", "2024-25"],
//     remarks: {
//       "2023-24": [
//         {
//           id: 1,
//           text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//           status: "Still Communication",
//           date: "2023-01-15",
//         },
//         {
//           id: 2,
//           text: "Proin euismod felis et dolor viverra, at aliquam nunc gravida.",
//           status: "Confirmed",
//           date: "2023-02-20",
//         },
//       ],
//       "2024-25": [
//         {
//           id: 3,
//           text: "Aliquam erat volutpat. Nullam rutrum ultrices enim.",
//           status: "Paused",
//           date: "2024-01-10",
//         },
//         {
//           id: 4,
//           text: "Aliquam erat volutp.",
//           status: "Paused",
//           date: "2025-01-10",
//         },
//       ],
//     },
//   },
//   {
//     name: "Company B",
//     academicYears: ["2023-24", "2024-25"],
//     remarks: {
//       "2023-24": [
//         {
//           id: 5,
//           text: "Phasellus eget nibh nec nunc tincidunt cursus at a est.",
//           status: "Still Communication",
//           date: "2023-03-15",
//         },
//         {
//           id: 6,
//           text: "Duis sit amet nulla a metus efficitur ultricies.",
//           status: "Confirmed",
//           date: "2023-04-20",
//         },
//       ],
//       "2024-25": [
//         {
//           id: 7,
//           text: "Cras at felis dignissim, malesuada sapien in, tempus metus.",
//           status: "Paused",
//           date: "2024-02-10",
//         },
//         {
//           id: 8,
//           text: "Morbi congue nulla sit amet felis vulputate hendrerit.",
//           status: "Paused",
//           date: "2024-03-05",
//         },
//       ],
//     },
//   },
// ];

// const CompanyRemark = () => {
//   const [selectedCompany, setSelectedCompany] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");
//   const [remarks, setRemarks] = useState([]);
//   const [showAddRemarkForm, setShowAddRemarkForm] = useState(false);
//   const [remarksDisplayed, setRemarksDisplayed] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(
//     "Please select college and academic year to view its remarks"
//   );

//   useEffect(() => {
//     setErrorMessage(
//       "Please select college and academic year to view its remarks"
//     );
//   }, []);

//   const handleCompanyChange = (e) => {
//     const companyName = e.target.value;
//     setSelectedCompany(companyName);
//     setSelectedYear(""); // Reset selected year when company changes
//     setRemarksDisplayed(false); // Reset remarks display status
//     setErrorMessage(""); // Reset error message
//     // Reset remarks when changing the selected company
//     setRemarks([]);
//   };

//   const handleYearChange = (e) => {
//     const year = e.target.value;
//     setSelectedYear(year);
//     setRemarksDisplayed(false); // Reset remarks display status
//     setErrorMessage(""); // Reset error message
//     // Reset remarks when changing the selected year
//     setRemarks([]);
//   };

//   const handleDisplayRemarks = () => {
//     if (!selectedCompany || !selectedYear) {
//       setRemarks([]);
//       setErrorMessage(
//         "Please select college and academic year to view its remarks"
//       );
//       return;
//     }
//     const company = initialCompaniesData.find(
//       (c) => c.name === selectedCompany
//     );
//     if (company && company.remarks[selectedYear]) {
//       setRemarks(company.remarks[selectedYear]);
//       setRemarksDisplayed(true); // Set remarks display status to true
//       setErrorMessage(""); // Reset error message
//     } else {
//       // If no remarks found for the selected company and year, set remarks to an empty array
//       setRemarks([]);
//       setErrorMessage(""); // Reset error message
//     }
//   };

//   const handleClearFilters = () => {
//     setSelectedCompany("");
//     setSelectedYear("");
//     setRemarks([]);
//     setShowAddRemarkForm(false);
//     setRemarksDisplayed(false); // Reset remarks display status
//     setErrorMessage(
//       "Please select college and academic year to view its remarks"
//     ); // Reset error message
//   };

//   const handleAddRemark = (newRemark) => {
//     // Find the company index in the initialCompaniesData array
//     const companyIndex = initialCompaniesData.findIndex(
//       (c) => c.name === selectedCompany
//     );

//     // Check if the company exists in the initialCompaniesData array and if remarks for the selected year exist
//     if (
//       companyIndex !== -1 &&
//       initialCompaniesData[companyIndex].remarks[selectedYear]
//     ) {
//       // Find the remarks array for the selected year
//       const remarksForYear = [
//         ...initialCompaniesData[companyIndex].remarks[selectedYear],
//       ];

//       // Add the new remark to the remarks array for the selected year
//       remarksForYear.push(newRemark);

//       // Update the initialCompaniesData to reflect the changes
//       const updatedCompaniesData = [...initialCompaniesData];
//       updatedCompaniesData[companyIndex].remarks[selectedYear] = remarksForYear;

//       // Update the state to reflect the changes
//       setRemarks(remarksForYear);
//     }

//     // Close the form after adding a remark
//     setShowAddRemarkForm(false);
//   };
//   return (
//     <div className="container">
//       <div className="header">
//         <select
//           className="companyname-dropdown"
//           value={selectedCompany}
//           onChange={handleCompanyChange}
//         >
//           <option value="">Select Company</option>
//           {initialCompaniesData.map((company) => (
//             <option key={company.name} value={company.name}>
//               {company.name}
//             </option>
//           ))}
//         </select>
//         <select
//           className="academic-year-dropdown"
//           value={selectedYear}
//           onChange={handleYearChange}
//         >
//           <option value="">Select Academic Year</option>
//           {selectedCompany &&
//             initialCompaniesData
//               .find((c) => c.name === selectedCompany)
//               .academicYears.map((year) => (
//                 <option key={year} value={year}>
//                   {year}
//                 </option>
//               ))}
//         </select>
//         <button onClick={handleDisplayRemarks}>Display Remarks</button>
//       </div>
//       <ClearFiltersButton onClick={handleClearFilters} />

//       {errorMessage && (
//         <p>
//           <div className="no-selection-message">{errorMessage}</div>
//         </p>
//       )}
//       {remarksDisplayed && (
//         <div className="remark-list">
//           <div className="perfectMatch">
//             <h2>Contact Remarks</h2>
//             <p>Displaying the Interactions and Remark History</p>
//             <div className="line"></div>
//           </div>
//           {remarks.length > 0 ? (
//             remarks.map((remark) => (
//               <RemarkItem key={remark.id} remark={remark} />
//             ))
//           ) : (
//             <p>No remarks available.</p>
//           )}
//         </div>
//       )}
//       <div className="buttonAdd">
//         {remarksDisplayed && selectedCompany && selectedYear && (
//           <button onClick={() => setShowAddRemarkForm(true)}>
//             Add Remarks
//           </button>
//         )}
//       </div>

//       {showAddRemarkForm && (
//         <AddRemarkForm
//           onAddRemark={handleAddRemark}
//           showModal={showAddRemarkForm}
//           setShowModal={setShowAddRemarkForm}
//         />
//       )}
//     </div>
//   );
// };

// export default CompanyRemark;
import React, { useState, useEffect } from "react";
// import axios from "axios";
import api from '../../api';
import AddRemarkForm from "./AddRemarkForm";
import ClearFiltersButton from "./ClearFiltersButton";
import RemarkItem from "./RemarkItem";
import "./companyremark.css";

const CompanyRemark = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [remarks, setRemarks] = useState([]);
  const [showAddRemarkForm, setShowAddRemarkForm] = useState(false);
  const [remarksDisplayed, setRemarksDisplayed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Please select college and academic year to view its remarks"
  );

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await api.get(
          "companies/getAll"
        );
        console.log("Fetched companies:", response.data);
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  const handleCompanyChange = async (e) => {
    const companyId = e.target.value;
    // const companyName = e.target.key;
    const companyName = e.target.options[e.target.selectedIndex].text;
    console.log(companyId);
    console.log(companyName);
    // e.target.
    setSelectedCompany(companyId);
    setSelectedYear(""); // Reset selected year when company changes
    setRemarksDisplayed(false); // Reset remarks display status
    setErrorMessage(""); // Reset error message

    try {
      const response = await api.get(
        `companies/${companyName}/years`
      );
      console.log("Fetched academic years:", response.data);
      setAcademicYears(response.data);
    } catch (error) {
      console.error("Error fetching academic years:", error);
    }

    // Reset remarks when changing the selected company
    setRemarks([]);
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    setRemarksDisplayed(false); // Reset remarks display status
    setErrorMessage(""); // Reset error message
    // Reset remarks when changing the selected year
    setRemarks([]);
  };

  const handleDisplayRemarks = async () => {
    if (!selectedCompany || !selectedYear) {
      setRemarks([]);
      setErrorMessage(
        "Please select college and academic year to view its remarks"
      );
      return;
    }

    try {
      const response = await api.get(
        `companies/${selectedCompany}/remarks`
      );
      console.log("Fetched remarks for company:", response.data);
      // const remarksForYear = response.data.filter(
      //   (remark) => remark.academic_year === selectedYear
      // );
      // setRemarks(remarksForYear);
      setRemarks(response.data);  
      setRemarksDisplayed(true); // Set remarks display status to true
      setErrorMessage(""); // Reset error message
    } catch (error) {
      console.error("Error fetching remarks:", error);
      setRemarks([]);
      setErrorMessage("Failed to fetch remarks. Please try again.");
    }
  };

  const handleClearFilters = () => {
    setSelectedCompany("");
    setSelectedYear("");
    setRemarks([]);
    setShowAddRemarkForm(false);
    setRemarksDisplayed(false); // Reset remarks display status
    setErrorMessage(
      "Please select college and academic year to view its remarks"
    ); // Reset error message
  };

  const handleAddRemark = async (newRemark) => {
    try {
      const response = await api.post(
        `companies/${selectedCompany}/remarks`,
        JSON.stringify(newRemark),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setRemarks([...remarks, { ...newRemark, id: response.data.insertId }]);
      setShowAddRemarkForm(false);
    } catch (error) {
      console.error("Error adding remark:", error);
    }
  };

  const handleUpdateStatus = async (remarkId, newStatus) => {
    try {
      await api.put(
        `companies/${selectedCompany}/remarks/${remarkId}`,
        { status: newStatus }
      );
      const updatedRemarks = remarks.map((remark) =>
        remark.id === remarkId ? { ...remark, status: newStatus } : remark
      );
      setRemarks(updatedRemarks);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <select
          className="companyname-dropdown"
          value={selectedCompany}
          onChange={handleCompanyChange}
        >
          <option value="">Select Company</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
        <select
          className="academic-year-dropdown"
          value={selectedYear}
          onChange={handleYearChange}
        >
          <option value="">Select Academic Year</option>
          {academicYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button onClick={handleDisplayRemarks}>Display Remarks</button>
      </div>
      <ClearFiltersButton onClick={handleClearFilters} />

      {errorMessage && (
        <div className="no-selection-message">{errorMessage}</div>
      )}
      {remarksDisplayed && (
        <div className="remark-list">
          <div className="perfectMatch">
            <h2>Contact Remarks</h2>
            <p>Displaying the Interactions and Remark History</p>
            <div className="line"></div>
          </div>
          {remarks.length > 0 ? (
            remarks.map((remark) => (
              <RemarkItem
                key={remark.id}
                remark={remark}
                onUpdateStatus={handleUpdateStatus}
              />
            ))
          ) : (
            <p>No remarks available.</p>
          )}
        </div>
      )}
      <div className="buttonAdd">
        {remarksDisplayed && selectedCompany && selectedYear && (
          <button onClick={() => setShowAddRemarkForm(true)}>
            Add Remarks
          </button>
        )}
      </div>

      {showAddRemarkForm && (
        <AddRemarkForm
          onAddRemark={handleAddRemark}
          showModal={showAddRemarkForm}
          setShowModal={setShowAddRemarkForm}
        />
      )}
    </div>
  );
};

export default CompanyRemark;
