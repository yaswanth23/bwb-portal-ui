import { memo } from "react";
import { IoBriefcase } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import "./doctor-details-card.styles.css";

const DoctorDetailsCard = ({ doctorDetails, triggerFunction }) => {
  const isOnline = true;
  const triggerCalenderOpen = () => {
    triggerFunction(doctorDetails.calendlyUserCalenderUrl);
  };

  return (
    <div className="dc-card-container">
      <div className="dc-card-first-container">
        <div className={`dc-card-user-avatar ${isOnline ? "online" : ""}`}>
          <img
            src={doctorDetails.profileImageUrl}
            alt="User"
            className="dc-card-avatar-image"
          />
          {isOnline && <div className="dc-card-user-online-indicator"></div>}
        </div>
        <div className="dc-card-user-details">
          <h3>Dr. {doctorDetails.userName}</h3>
          <p className="dc-card-user-speciality">{doctorDetails.specialty}</p>
          <p className="dc-card-user-experience">
            <IoBriefcase className="dc-card-work-icon" />
            <span className="dc-card-user-experience-text">
              {doctorDetails.yearsOfPractice} years
            </span>
          </p>
        </div>
      </div>
      <div className="dc-card-appointment-btn-container">
        <button
          className="dc-card-appointment-btn"
          onClick={triggerCalenderOpen}
        >
          <IoCalendarOutline className="dc-card-calender-icon" />
          Make an Appointment
        </button>
      </div>
    </div>
  );
};

export default memo(DoctorDetailsCard);
