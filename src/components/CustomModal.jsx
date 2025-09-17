import React from "react";
import "./CustomModal.css";
import { useSelector } from "react-redux";

const CustomModal = ({ id, setShowPopUp }) => {
  const allUserData = useSelector((state) => state.app.users);

  const singleUser = allUserData.find((user) => user.id === id);

  // // 🛡️ If user is deleted or not found, don't render modal at all
  if (!singleUser) return null;

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button className="closeBtn" onClick={() => setShowPopUp(false)}>
          ✕
        </button>
        <h2
          style={{ textAlign: "center", marginBottom: "15px", color: "#333" }}
        >
          User Profile
        </h2>
        <div className="userInfo">
          <div className="userField">
            👤 <span>{singleUser.name}</span>
          </div>
          <div className="userField">
            📧 <span>{singleUser.email}</span>
          </div>
          <div className="userField">
            🎂 <span>Age: {singleUser.age}</span>
          </div>
          <div className="userField">
            🎂 <span>Profession: {singleUser.profession}</span>
          </div>
          <div className="userField">
            ⚧ <span>Gender: {singleUser.gender}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;

/*
  📌 Explanation:
  - This component displays a popup modal with user details when "View" is clicked.

  - first we take the prop { id, showPopUp, setShowPopUp } that we pass from the Read.jsx  component

  - We fetch all users from Redux store using useSelector.

  - Then we find the user with the matching id.

*/
