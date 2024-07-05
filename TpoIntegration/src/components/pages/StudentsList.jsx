/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from '../../api';
// import axios from "axios";
// import { useParams } from "react-router-dom";

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [roundTwoStudentIds, setRoundTwoStudentIds] = useState(new Set());
  const [showCheckboxColumn, setShowCheckboxColumn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // const { id } = useParams();
  // console.log(id);

  const extractCompanyIdFromUrl = () => {
    // Get current URL
    const currentUrl = window.location.href;

    // Parse URL and get search params
    const searchParams = new URLSearchParams(new URL(currentUrl).search);

    // Get the value of the 'id' parameter
    const companyId = searchParams.get("id");

    return companyId;
  };
  const companyId = extractCompanyIdFromUrl();

  useEffect(() => {
    extractCompanyIdFromUrl();
    fetchStudents(companyId);
    fetchRoundTwoIds(companyId);
  }, []);

  const fetchStudents = (companyId) => {
    api
      .get(`drivestatus/getstudents/${companyId}`)
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
      });
  };

  console.log(students);
  //get round2 ids to know who is in round2
  const fetchRoundTwoIds = () => {
    api
      .get(`drivestatus/getround2ids/${companyId}`)
      .then((res) => {
        const roundTwoIds = new Set(res.data.map((student) => student.driveid));
        setRoundTwoStudentIds(roundTwoIds);
      })
      .catch((err) => {
        console.error("Error fetching round two student IDs:", err);
      });
  };

  //to handle checkbox changing states
  const handleCheckboxChange = (studentId) => {
    if (selectedStudentIds.includes(studentId)) {
      setSelectedStudentIds(
        selectedStudentIds.filter((id) => id !== studentId)
      );
    } else {
      setSelectedStudentIds([...selectedStudentIds, studentId]);
    }
  };

  const handleAddStudentsToRoundTwo = () => {
    selectedStudentIds.forEach((studentId) => {
      api
        .put(
          `drivestatus/updatetooneround/${studentId}`,
          { round: 2 }
        )
        .then((res) => {
          console.log(`Student ${studentId} moved to round two.`);
          setRoundTwoStudentIds((prevIds) => new Set(prevIds.add(studentId)));
        })
        .catch((err) => {
          console.error(
            `Error updating student ${studentId} to round two:`,
            err
          );
        });
    });
    setSelectedStudentIds([]);
    setShowCheckboxColumn(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Registered Students</h1>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown visibility
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            aria-expanded={isDropdownOpen ? "true" : "false"}
          >
              Rounds Dropdown 
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute mt-1 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <Link
                    to={`/drivestatus/students?&id=${companyId}`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Round 1
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/drivestatus/students-for-round-two?companyId=${companyId}`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Round 2
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/drivestatus/students-for-round-three?companyId=${companyId}`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Round 3
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/drivestatus/students-for-round-four?companyId=${companyId}`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Round 4
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/drivestatus/placedStudents?companyId=${companyId}`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Placed Students
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div>
          <Link
            to={`/drivestatus/students-for-round-two?companyId=${companyId}`}
            className="bg-blue-500 text-white py-2 px-4 ml-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          >
            View Round Two Students
          </Link>
          {!showCheckboxColumn && (
            <button
              onClick={() => setShowCheckboxColumn(true)}
              className="bg-red-400 text-white py-2 px-4 ml-4 rounded hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 mb-4"
            >
              Add Students for Round Two
            </button>
          )}
          {showCheckboxColumn && (
            <button
              onClick={handleAddStudentsToRoundTwo}
              className="bg-green-600 text-white py-2 px-4 ml-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 mb-4"
            >
              Confirm Add to Round Two
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Sr. No.</th>
              <th className="py-3 px-6 text-left">TPO ID</th>
              <th className="py-3 px-6 text-left">Student Name</th>
              <th className="py-3 px-6 text-left">College ID</th>
              <th className="py-3 px-6 text-left">Branch</th>
              <th className="py-3 px-6 text-left">Mobile</th>
              {showCheckboxColumn && (
                <th className="py-3 px-6 text-center">Select For Round Two</th>
              )}
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {students.map((student, i) => (
              <tr key={student.driveid}>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {i + 1}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {student.tpo_id}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {student.full_name}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {student.clg_id}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {student.branch}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {student.mobile}
                </td>
                {showCheckboxColumn && (
                  <td className="py-3 px-6 text-center whitespace-nowrap">
                    {roundTwoStudentIds.has(student.driveid) ? (
                      <span className="text-green-600 font-semibold">
                        Added to Round Two
                      </span>
                    ) : (
                      <input
                        type="checkbox"
                        checked={selectedStudentIds.includes(student.driveid)}
                        onChange={() => handleCheckboxChange(student.driveid)}
                      />
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsList;
