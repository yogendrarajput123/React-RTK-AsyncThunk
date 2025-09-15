import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../features/userDetailSlice";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [users, setUsers] = useState({});

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getUserData = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
    // here e.target.value trigger the input and and e.target.name trigger the name of every input we declared [ eg: name: 'email', key:'value']
    // console.log(users);
  };

  // pass the create asynthunk function in dispatch that we created in userDetailSlice
  // actually from here we pass data to our mock api
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("users....", users);
    dispatch(createUser(users));
    navigate("/read");
  };

  return (
    <div className="d-flex p-5 justify-content-center align-items-center mt-5">
      <form
        className="w-50 p-4 rounded shadow bg-white"
        onSubmit={handleSubmit}
      >
        {/* <h3 className="text-center text-primary fw-bold mb-0">🧑‍💼</h3> */}

        {/* Name */}
        <div className="mb-2">
          <label className="form-label fw-bold">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
            name="name"
            onChange={getUserData}
          />
        </div>

        {/* Email */}
        <div className="mb-2">
          <label className="form-label fw-bold">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            name="email"
            onChange={getUserData}
          />
        </div>

        {/* Age */}
        <div className="mb-2">
          <label className="form-label fw-bold">Age</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your age"
            name="age"
            onChange={getUserData}
          />
        </div>

        {/* Profession */}
        <div className="mb-2">
          <label className="form-label fw-bold">Profession</label>
          <select
            className="form-select"
            name="profession"
            onChange={getUserData}
            defaultValue=""
          >
            <option value="" disabled>
              -- Select Profession --
            </option>
            <option value="HR">HR</option>
            <option value="Developer">Developer</option>
            <option value="BD">BD</option>
            <option value="Manager">Manager</option>
            <option value="Manager">Tester</option>
            <option value="Staff">Staff</option>
            <option value="DevOps">DevOps</option>
          </select>
        </div>

        {/* Gender */}
        <div className="mb-2">
          <label className="form-label fw-bold d-block">Gender</label>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="male"
              onChange={getUserData}
            />
            <label className="form-check-label" htmlFor="male">
              Male
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="female"
              onChange={getUserData}
            />
            <label className="form-check-label" htmlFor="female">
              Female
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="trans"
              onChange={getUserData}
            />
            <label className="form-check-label" htmlFor="trans">
              Trans
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary px-5 mt-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
