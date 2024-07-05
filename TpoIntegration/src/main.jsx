import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import CompanyList from "./components/pages/CompanyList";
import StudentsList from "./components/pages/StudentsList";
import StudentsForRoundThree from "./components/pages/StudentsForRoundThree";
import StudentsForRoundFour from "./components/pages/StudentsForRoundFour";
import StudentsForRoundTwo from "./components/pages/StudentsForRoundTwo";
import PlacedStudents from "./components/pages/PlacedStudents";
import CompanyDashboard from "./components/Company Communication/CompanyDashBoard.jsx";
import HRDash from "./components/HRADD/HRDash.jsx";
import CompanyRemark from "./components/Company Remark/CompanyRemark.jsx";
import Reconnect from "./components/Recontact/Reconnect.jsx";
import TableComponentContainer from "./components/ConfrimCompanies/TableComponentContainer.jsx";
import JobPostingContainer from "./components/JobPosting/JobPostingContainer.jsx";
import AdminForum from "./components/adminforum/AdminForum.jsx";
import Forums from "./components/adminforum/ForumsDetails";
import Announcement from "./components/announcement/Announcement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <CompanyDashboard /> },
      { path: "/hrcontact", element: <HRDash /> },
      { path: "/companyremark", element: <CompanyRemark /> },
      { path: "/recontact", element: <Reconnect /> },
      { path: "/companyconfirm", element: <TableComponentContainer /> },
      { path: "/jobposting", element: <JobPostingContainer /> },

      { path: "/forums", element: <Forums /> },
      { path: "/postform", element: <AdminForum /> },
      { path: "/announcements", element: <Announcement /> },

      { path: "/driveStatus", element: <CompanyList /> },
      { path: "/driveStatus/students", element: <StudentsList /> },
      { path: "/driveStatus/students-for-round-two", element: <StudentsForRoundTwo /> },
      { path: "/driveStatus/students-for-round-three", element: <StudentsForRoundThree /> },
      { path: "/driveStatus/students-for-round-four", element: <StudentsForRoundFour /> },
      { path: "/driveStatus/placedStudents", element: <PlacedStudents /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
