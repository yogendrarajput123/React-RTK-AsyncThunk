import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import stafftracklogo from "../media/stafftracklogo.png";
import { searchUser } from "../features/userDetailSlice";

const Navbar = () => {
  //whenever we want to read or extract data from global state we do it with useSElector hook
  // here we want to show all data length on navbar
  const allUserData = useSelector((state) => state.app.users);
  const dispatch = useDispatch();

  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    dispatch(searchUser(searchData));
  }, [searchData]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src={stafftracklogo}
              alt="Logo"
              width="45"
              height="40"
              className="d-inline-block align-middle me-2"
            />
            <span className="fw-bold fs-5">StaffTrack</span>
          </Link>

          {/* Toggle button for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse mx-5">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Create Employee
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/read" className="nav-link">
                  All Employees ({allUserData.length})
                </Link>
              </li>
            </ul>
            <input
              className="form-control me-2 w-50"
              type="search"
              placeholder="Search Employees here"
              aria-label="Search"
              onChange={(e) => setSearchData(e.target.value)}
            />
            <button className="btn btn-outline-success px-4" type="submit">
              Search
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;


/***

useEffect(() => {
    dispatch(searchUser(searchData));
  }, [searchData]);

  here we pass the searchdata as an payload with searchUser reducer 

*/