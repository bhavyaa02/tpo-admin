import React from 'react';

const Nav = () => {
  return (
    <nav className="fixed top-0 w-full bg-gray-800 shadow-md mb-3 z-10">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <button
            type="button"
            className="text-gray-200 focus:outline-none mr-2 lg:hidden"
            aria-label="Toggle navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <a className="text-white font-semibold text-lg" href="/" title="Record Book">Record Book</a>
        </div>
        <div className="hidden lg:flex lg:items-center lg:w-auto">
          <ul className="flex flex-col lg:flex-row lg:ml-6 lg:items-center">
            <li className="nav-item active">
              <a className="text-white px-4 py-2 hover:bg-gray-700 rounded" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="text-white px-4 py-2 hover:bg-gray-700 rounded" href="//www.codeply.com">Link</a>
            </li>
            <li className="nav-item">
              <a className="text-white px-4 py-2 hover:bg-gray-700 rounded" href="#myAlert">Alert</a>
            </li>
            <li className="nav-item">
              <a className="text-white px-4 py-2 hover:bg-gray-700 rounded" href="#myModal">About</a>
            </li>
            <li className="nav-item">
              <a className="text-white px-4 py-2 hover:bg-gray-700 rounded">
                <i className="fab fa-google-plus-g"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="text-white px-4 py-2 hover:bg-gray-700 rounded">
                <i className="fas fa-envelope-open-text"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="text-white px-4 py-2 hover:bg-gray-700 rounded">
                <i className="fas fa-align-justify"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
