// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Announcements = () => {
//   const [announcements, setAnnouncements] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [newAnnouncement, setNewAnnouncement] = useState("");
//   const [selectedCompany, setSelectedCompany] = useState("");
//   const [message, setMessage] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [announcementsPerPage] = useState(5); // Number of announcements per page
//   const [editAnnouncementId, setEditAnnouncementId] = useState(null);
//   const [editAnnouncementText, setEditAnnouncementText] = useState("");

//   useEffect(() => {
//     fetchAnnouncements();
//     fetchCompanies();
//   }, []);

//   const fetchAnnouncements = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/api/admin/announcement");
//       setAnnouncements(response.data);
//     } catch (error) {
//       console.error("Error fetching announcements:", error);
//     }
//   };

//   const fetchCompanies = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/api/companies");
//       setCompanies(response.data);
//     } catch (error) {
//       console.error("Error fetching companies:", error);
//     }
//   };

//   const handleAddAnnouncement = async () => {
//     try {
//       const newAnnouncementObj = {
//         id: announcements.length + 1,
//         name: companies.find(
//           (company) => company.id === parseInt(selectedCompany)
//         )?.name,
//         announcement: newAnnouncement,
//         createdAt: new Date().toISOString(),
//       };

//       setAnnouncements([...announcements, newAnnouncementObj]);
//       setMessage("Announcement added successfully");
//       setNewAnnouncement("");
//       setSelectedCompany("");
//       // Optionally, make a POST request to your API
//       // await axios.post('/api/announcements', newAnnouncementObj);
//     } catch (error) {
//       console.error("Error adding announcement:", error);
//     }
//   };

//   const handleUpdateAnnouncement = async (id) => {
//     try {
//       const updatedAnnouncements = announcements.map((announcement) =>
//         announcement.id === id
//           ? { ...announcement, announcement: editAnnouncementText }
//           : announcement
//       );
//       setAnnouncements(updatedAnnouncements);
//       setMessage("Announcement updated successfully");
//       setEditAnnouncementId(null);
//       setEditAnnouncementText("");
//       // Optionally, make a PUT request to your API
//       // await axios.put(`/api/announcements/${id}`, { announcement: editAnnouncementText });
//     } catch (error) {
//       console.error("Error updating announcement:", error);
//     }
//   };

//   const handleDeleteAnnouncement = async (id) => {
//     try {
//       const updatedAnnouncements = announcements.filter(
//         (announcement) => announcement.id !== id
//       );
//       setAnnouncements(updatedAnnouncements);
//       setMessage("Announcement deleted successfully");
//       // Optionally, make a DELETE request to your API
//       // await axios.delete(`/api/announcements/${id}`);
//     } catch (error) {
//       console.error("Error deleting announcement:", error);
//     }
//   };

//   const handleClearFilters = () => {
//     setSelectedCompany("");
//     setCurrentPage(1); // Reset to the first page
//   };

//   // Get filtered announcements based on the selected company
//   const filteredAnnouncements = selectedCompany
//     ? announcements.filter(
//         (announcement) =>
//           announcement.name ===
//           companies.find((company) => company.id === parseInt(selectedCompany))
//             ?.name
//       )
//     : announcements;

//   // Get current announcements
//   const indexOfLastAnnouncement = currentPage * announcementsPerPage;
//   const indexOfFirstAnnouncement =
//     indexOfLastAnnouncement - announcementsPerPage;
//   const currentAnnouncements = filteredAnnouncements.slice(
//     indexOfFirstAnnouncement,
//     indexOfLastAnnouncement
//   );

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const pageNumbers = [];
//   for (
//     let i = 1;
//     i <= Math.ceil(filteredAnnouncements.length / announcementsPerPage);
//     i++
//   ) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold text-center mb-4">Announcements</h1>
//       <div className="flex items-center mb-4 w-full justify-between">
//         <button className="bg-blue-500 text-white p-2 rounded mr-4">Add</button>
//         <select
//           value={selectedCompany}
//           onChange={(e) => setSelectedCompany(e.target.value)}
//           className="border p-2 flex-grow mr-2"
//         >
//           <option value="">Select the Company</option>
//           {companies.map((company) => (
//             <option key={company.id} value={company.id}>
//               {company.name}
//             </option>
//           ))}
//         </select>
//         <button
//           onClick={handleClearFilters}
//           className="bg-blue-500 text-white p-2 rounded"
//         >
//           Clear Filters
//         </button>
//       </div>
//       {message && <div className="mb-4 p-2 bg-green-200">{message}</div>}
//       <div className="mb-4 flex">
//         <input
//           type="text"
//           placeholder="New Announcement"
//           value={newAnnouncement}
//           onChange={(e) => setNewAnnouncement(e.target.value)}
//           className="border p-2 mr-2 flex-grow"
//         />
//         <button
//           onClick={handleAddAnnouncement}
//           className="bg-blue-500 text-white p-2 rounded"
//         >
//           Add Announcement
//         </button>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full">
//           <thead>
//             <tr>
//               <th className="px-4 py-2">Company Name</th>
//               <th className="px-4 py-2">Announcement</th>
//               <th className="px-4 py-2">Created At</th>
//               <th className="px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentAnnouncements.map((announcement) => (
//               <tr key={announcement.id}>
//                 <td className="border px-4 py-2">{announcement.name}</td>
//                 <td className="border px-4 py-2">
//                   {editAnnouncementId === announcement.id ? (
//                     <input
//                       type="text"
//                       value={editAnnouncementText}
//                       onChange={(e) => setEditAnnouncementText(e.target.value)}
//                       className="border p-2"
//                     />
//                   ) : (
//                     announcement.announcement
//                   )}
//                 </td>
//                 <td className="border px-4 py-2">
//                   {new Date(announcement.createdAt).toLocaleString()}
//                 </td>
//                 <td className="border px-4 py-2">
//                   <div className="flex space-x-2">
//                     {editAnnouncementId === announcement.id ? (
//                       <button
//                         onClick={() =>
//                           handleUpdateAnnouncement(announcement.id)
//                         }
//                         className="bg-green-500 text-white p-2 rounded"
//                       >
//                         Save
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => {
//                           setEditAnnouncementId(announcement.id);
//                           setEditAnnouncementText(announcement.announcement);
//                         }}
//                         className="bg-yellow-500 text-white p-2 rounded"
//                       >
//                         Edit
//                       </button>
//                     )}
//                     <button
//                       onClick={() =>
//                         handleDeleteAnnouncement(announcement.id)
//                       }
//                       className="bg-red-500 text-white p-2 rounded"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="flex justify-center mt-4">
//         {pageNumbers.map((number) => (
//           <button
//             key={number}
//             onClick={() => paginate(number)}
//             className={`px-4 py-2 mx-1 ${
//               number === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
//             }`}
//           >
//             {number}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Announcements;

import React, { useEffect, useState } from "react";
// import axios from "axios";
import api from '../../api';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [announcementsPerPage] = useState(5);
  const [editAnnouncementId, setEditAnnouncementId] = useState(null);
  const [editAnnouncementText, setEditAnnouncementText] = useState("");
  console.log(editAnnouncementText);

  useEffect(() => {
    fetchAnnouncements();
    fetchCompanies();
  }, []);

  // useEffect(() => {
  //   fetchCompanies();
  // }, []);

  // useEffect(() => {
  //   if (selectedCompany) {
  //     fetchAnnouncements();
  //   } else {
  //     setAnnouncements([]);
  //   }
  // }, [selectedCompany]);

  console.log(announcements);
  const fetchAnnouncements = async () => {
    try {
      const response = await api.get("announcements");
      setAnnouncements(response.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await api.get("companies/getAll");
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleAddAnnouncement = async () => {
    console.log(selectedCompany);
    try {
      const newAnnouncementObj = {
        postid: selectedCompany,
        msg: newAnnouncement,
      };

      const response = await api.post(
        "announcements",
        newAnnouncementObj
      );
      setAnnouncements([...announcements, response.data]);
      setMessage("Announcement added successfully");
      setNewAnnouncement("");
      setSelectedCompany("");
      window.location.reload();
    } catch (error) {
      console.error("Error adding announcement:", error);
    }
  };

  const handleUpdateAnnouncement = async (id, msg) => {
    try {
      // const updatedAnnouncementObj = {
      //   msg: editAnnouncementText
      // };

      const res = await api.put(`announcements/${id}`, {
        msg,
      });
      console.log(res.data);
      setAnnouncements(
        announcements.map((announcement) =>
          announcement.id === id
            ? { ...announcement, announcement: editAnnouncementText }
            : announcement
        )
      );
      setMessage("Announcement updated successfully");
      setEditAnnouncementId(null);
      setEditAnnouncementText("");
    } catch (error) {
      console.error("Error updating announcement:", error);
    }
  };
  
  const handleDeleteAnnouncement = async (id) => {
    try {
      await api.delete(`announcements/${id}`);
      setAnnouncements(
        announcements.filter((announcement) => announcement.id !== id)
      );
      setMessage("Announcement deleted successfully");
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  const handleClearFilters = () => {
    setSelectedCompany("");
    setCurrentPage(1);
  };

  const filteredAnnouncements = selectedCompany
    ? announcements.filter(
        (announcement) =>
          announcement.name ===
          companies.find((company) => company.id === parseInt(selectedCompany))
            ?.name
      )
    : announcements;

  const indexOfLastAnnouncement = currentPage * announcementsPerPage;
  const indexOfFirstAnnouncement =
    indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = filteredAnnouncements.slice(
    indexOfFirstAnnouncement,
    indexOfLastAnnouncement
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredAnnouncements.length / announcementsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Announcements</h1>
      <div className="flex items-center mb-4 w-full justify-between">
        <select
          value={selectedCompany}
          onChange={(e) => {
            console.log(e.target.value);
            setSelectedCompany(e.target.value);
          }}
          className="border p-2 flex-grow mr-2"
        >
          <option value="">Select the Company</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleClearFilters}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Clear Filters
        </button>
      </div>
      {message && <div className="mb-4 p-2 bg-green-200">{message}</div>}
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="New Announcement"
          value={newAnnouncement}
          onChange={(e) => setNewAnnouncement(e.target.value)}
          className="border p-2 mr-2 flex-grow"
        />
        <button
          onClick={handleAddAnnouncement}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Announcement
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Company Name</th>
              <th className="px-4 py-2">Announcement</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentAnnouncements.map((announcement) => (
              <tr key={announcement.id}>
                <td className="border px-4 py-2">{announcement.name}</td>
                <td className="border px-4 py-2">
                  {editAnnouncementId === announcement.id ? (
                    <input
                      type="text"
                      value={editAnnouncementText}
                      onChange={(e) => setEditAnnouncementText(e.target.value)}
                      className="border p-2"
                    />
                  ) : (
                    announcement.announcement
                  )}
                </td>
                <td className="border px-4 py-2">
                  {new Date(announcement.createdAt).toLocaleString()}
                </td>
                <td className="border px-4 py-2">
                  <div className="flex space-x-2">
                    {editAnnouncementId === announcement.id ? (
                      <button
                        onClick={() =>
                          handleUpdateAnnouncement(
                            announcement.id,
                            editAnnouncementText
                          )
                        }
                        className="bg-green-500 text-white p-2 rounded"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditAnnouncementId(announcement.id);
                          setEditAnnouncementText(announcement.announcement);
                        }}
                        className="bg-yellow-500 text-white p-2 rounded"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteAnnouncement(announcement.id)}
                      className="bg-red-500 text-white p-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-4 py-2 mx-1 ${
              number === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
