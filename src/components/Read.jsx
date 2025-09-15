import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showUser } from "../features/userDetailSlice";
import CustomModal from "./CustomModal";
import { Link } from "react-router-dom";
import "./CustomModal.css";

const Read = () => {
  const [id, setId] = useState();

  const [showPopUp, setShowPopUp] = useState(false);

  const [radioData, setRadiodata] = useState("");

  // When we hit the submit button, this component will automatically fetch data.
  // For that, we use the useEffect() hook to dispatch the showUser action.
  const dispatch = useDispatch();

  // Here state.app refers to the store which holds users, loading, and error.
  // We are extracting users and loading from it.
  const { users, loading, searchData } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <div
          className="spinner-border text-primary mb-3"
          aria-busy="true"
          style={{ width: "3rem", height: "3rem" }}
        >
          <output className="visually-hidden">Loading...</output>
        </div>
        <h4 className="fw-bold text-secondary">
          Loading
          <span role="img" aria-label="rocket">
            🚀
          </span>{" "}
          Please wait...
        </h4>
      </div>
    );
  }

  const professionEmoji = {
    HR: "🧑‍💼",
    Developer: "👨‍💻",
    BD: "📈",
    Manager: "👔",
    Tester: "🕵️",
    Staff: "👥",
    DevOps: "⚙️",
  };

  return (
    <div className="container py-5">
      {/* show data on popup */}
      {showPopUp && (
        <CustomModal
          id={id}
          showPopUp={showPopUp}
          setShowPopUp={setShowPopUp}
        />
      )}

      {/* show according to male and female */}
      <div className="text-center my-5">
        <h2 className="fw-bold text-dark mb-4">All Users Data</h2>

        <div className="d-flex justify-content-center gap-5">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              checked={radioData === ""}
              onChange={(e) => setRadiodata(e.target.value)}
            />
            <label className="form-check-label ms-2 fw-semibold" htmlFor="all">
              All
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="male"
              checked={radioData === "male"}
              onChange={(e) => setRadiodata(e.target.value)}
            />
            <label className="form-check-label ms-2 fw-semibold" htmlFor="male">
              Male
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="female"
              checked={radioData === "female"}
              onChange={(e) => setRadiodata(e.target.value)}
            />
            <label
              className="form-check-label ms-2 fw-semibold"
              htmlFor="female"
            >
              Female
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="trans"
              checked={radioData === "trans"}
              onChange={(e) => setRadiodata(e.target.value)}
            />
            <label
              className="form-check-label ms-2 fw-semibold"
              htmlFor="female"
            >
              Others
            </label>
          </div>
        </div>
      </div>

      {/* map and filters */}
      <div className="row g-4">
        {users
          ?.filter((user) => {
            if (searchData.length === 0) {
              return user;
            } else {
              return (
                user.name.toLowerCase().includes(searchData.toLowerCase()) ||
                user.profession
                  .toLowerCase()
                  .includes(searchData.toLowerCase()) ||
                user.age.toLowerCase().includes(searchData.toLowerCase())
              );
            }
          })

          .filter((user) => {
            if (
              radioData === "male" ||
              radioData === "female" ||
              radioData === "trans"
            ) {
              return user.gender === radioData;
            }
            return user;
          })

          .map((user) => (
            <div key={user.id} className="col-md-6 col-lg-4 ">
              <div
                className="card shadow-lg border-0 rounded-4 h-100 transition"
                onClick={() => [setId(user.id), setShowPopUp(true)]}
                role="button"
              >
                <div className="card-body p-4">
                  <h4 className="card-title text-primary fw-bold mb-3">
                    {user.name}
                  </h4>
                  <h4 className="card-subtitle mb-2 text-muted fw-bold d-flex align-items-center mb-3">
                    <span className="me-2">
                      {professionEmoji[user.profession] || "👨‍💼"}
                    </span>
                    {user.profession}
                  </h4>
                  <h6 className="card-subtitle mb-3 text-muted">
                    {user.email}
                  </h6>
                  <p className="card-text mb-2">
                    <strong>Gender:</strong> {user.gender}
                  </p>
                  <div className="d-flex justify-content-around mt-4">
                    <button
                      onClick={() => [setId(user.id), setShowPopUp(true)]}
                      className="btn btn-primary px-4 py-2 rounded-pill fw-semibold"
                    >
                      View
                    </button>
                    <Link to={`/update/${user.id}`}>
                      <button className="btn btn-success px-4 py-2 rounded-pill fw-semibold">
                        Update
                      </button>
                    </Link>
                    <button
                      onClick={() => dispatch(deleteUser(user.id))}
                      className="btn btn-danger px-4 py-2 rounded-pill fw-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Extra styling for hover effect */}
      <style>{`
        .card.transition {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card.transition:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default Read;
