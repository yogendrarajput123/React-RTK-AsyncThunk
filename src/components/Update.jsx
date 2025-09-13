import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../features/userDetailSlice";

const Update = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [updateData, setUpdateData] = useState();

  const { users, loading } = useSelector((state) => state.app);

  useEffect(() => {
    if (id) {
      const singleUser = users.find((user) => user.id === id);
      setUpdateData(singleUser);
    }
  }, []);

  const newData = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  console.log(updateData);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(updateData));
    navigate("/read");
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-4">
      <form
        className="w-50 p-4 rounded shadow bg-white"
        onSubmit={handleSubmit}
      >
        <h3 className="text-center text-primary mb-4">Update Profile</h3>

        {/* Name */}
        <div className="mb-3">
          <label className="form-label fw-bold">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
            name="name"
            value={updateData?.name}
            onChange={newData}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label fw-bold">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            name="email"
            value={updateData?.email}
            onChange={newData}
          />
        </div>

        {/* Age */}
        <div className="mb-3">
          <label className="form-label fw-bold">Age</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your age"
            name="age"
            value={updateData?.age}
            onChange={newData}
          />
        </div>

        {/* Gender */}
        <div className="mb-3">
          <label className="form-label fw-bold d-block">Gender</label>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="male"
              checked={updateData?.gender === "male"}
              onChange={newData}
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
              checked={updateData?.gender === "female"}
              onChange={newData}
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
              checked={updateData?.gender === "trans"}
              onChange={newData}
            />
            <label className="form-check-label" htmlFor="trans">
              Trans
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary px-4">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
