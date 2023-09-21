import { memo, useEffect, useState } from "react";
import Modal from "react-modal";
import "./doctor-consultation-page.styles.css";

import DoctorCalender from "./doctor-calender/doctor-calender.component";
import DoctorDetailsCard from "./doctor-details/doctor-details-card.component";

const DoctorConsultationPage = () => {
  const apiUrl = process.env.REACT_APP_BE_API_URL;
  const apiKey = process.env.REACT_APP_API_KEY;
  const [limit, setLimit] = useState(10);
  const [metaData, setMetaData] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [doctorUsersList, setDoctorUsersList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [calendlyUserUrl, setCalendlyUserUrl] = useState(null);

  const startBookingIndex = (pageNumber - 1) * limit + 1;
  const endBookingIndex =
    doctorUsersList.length > 0
      ? Math.min(startBookingIndex + limit - 1, metaData.totalDoctorsCount)
      : 0;

  useEffect(() => {
    fetchAllDoctorUsers();
  }, [pageNumber]);

  const fetchAllDoctorUsers = () => {
    const apiEndpoint =
      apiUrl + `/doctor/users/list?page=${pageNumber}&limit=${limit}`;

    fetch(apiEndpoint, {
      method: "GET",
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setDoctorUsersList(data.data.doctorUsers);
        setMetaData(data.data.metaData);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleCalenderOpen = (calendlyUserUrl) => {
    setCalendlyUserUrl(calendlyUserUrl);
    openModal();
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="doctor-consult-container">
      <div className="doctor-consult-main-header">
        <h3>Consult Doctors</h3>
      </div>
      {doctorUsersList.length > 0 ? (
        <>
          <div>
            {doctorUsersList.map((item) => (
              <div className="dc-doctor-card-container" key={item._id}>
                <DoctorDetailsCard
                  doctorDetails={item}
                  triggerFunction={handleCalenderOpen}
                />
              </div>
            ))}
          </div>
          <div className="dc-bottom-nav">
            <div className="dc-showing-text-label">
              <span>{`Showing ${startBookingIndex}-${endBookingIndex} of ${metaData.totalDoctorsCount}`}</span>
            </div>
            <button
              onClick={() => setPageNumber(pageNumber - 1)}
              disabled={pageNumber === 1}
              className="dc-previous-btn"
            >
              &lt;
            </button>
            <button
              onClick={() => setPageNumber(pageNumber + 1)}
              disabled={pageNumber === metaData.totalPages}
              className="dc-next-btn"
            >
              &gt;
            </button>
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            preventScroll={true}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.6)",
              },
              content: {
                padding: 0,
                border: "none",
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
              },
            }}
            ariaHideApp={false}
          >
            <div className="dc-modal-container">
              <DoctorCalender calendlyUserUrl={calendlyUserUrl} />
            </div>
          </Modal>
        </>
      ) : (
        <div>No Doctors Available</div>
      )}
    </div>
  );
};

export default memo(DoctorConsultationPage);
