import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderNavLinks = () => {
    return (
      <>
        <NavLink
          to="/"
          className={`${
            location.pathname === "/"
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          } px-3 py-2 rounded-md text-sm font-medium`}
          activeClassName="bg-gray-900"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/hrcontact"
          className={`${
            location.pathname === "/hrcontact"
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          } px-3 py-2 rounded-md text-sm font-medium`}
          activeClassName="bg-gray-900"
        >
          Hr Contact
        </NavLink>
        <NavLink
          to="/companyremark"
          className={`${
            location.pathname === "/companyremark"
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          } px-3 py-2 rounded-md text-sm font-medium`}
          activeClassName="bg-gray-900"
        >
          Company Remark
        </NavLink>
        <NavLink
          to="/recontact"
          className={`${
            location.pathname === "/recontact"
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          } px-3 py-2 rounded-md text-sm font-medium`}
          activeClassName="bg-gray-900"
        >
          Recontact
        </NavLink>
        <NavLink
          to="/companyconfirm"
          className={`${
            location.pathname === "/companyconfirm"
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          } px-3 py-2 rounded-md text-sm font-medium`}
          activeClassName="bg-gray-900"
        >
          Confirm Companies
        </NavLink>
        <NavLink
          to="/jobposting"
          className={`${
            location.pathname === "/jobposting"
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          } px-3 py-2 rounded-md text-sm font-medium`}
          activeClassName="bg-gray-900"
        >
          Job Postings
        </NavLink>
        <NavLink
          to="/forums"
          className={`${
            location.pathname === "/forums"
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          } px-3 py-2 rounded-md text-sm font-medium`}
          activeClassName="bg-gray-900"
        >
          Forums
        </NavLink>
        {/* <NavLink
          to="/postform"
          className={`${
            location.pathname === "/postform"
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          } px-3 py-2 rounded-md text-sm font-medium`}
          activeClassName="bg-gray-900"
        >
          Post Form
        </NavLink> */}
        <NavLink
          to="/announcements"
          className={`${
            location.pathname === "/announcements"
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          } px-3 py-2 rounded-md text-sm font-medium`}
          activeClassName="bg-gray-900"
        >
          Announcements
        </NavLink>
        <NavLink
          to="/driveStatus"
          className={`${
            location.pathname === "/driveStatus"
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          } px-3 py-2 rounded-md text-sm font-medium`}
          activeClassName="bg-gray-900"
        >
          Drive Status
        </NavLink>
      </>
    );
  };

  return (
    <nav className="bg-gray-800 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <img
                className="block h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">{renderNavLinks()}</div>
            </div>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">{renderNavLinks()}</div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
