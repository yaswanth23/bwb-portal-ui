import { memo, useState, useEffect } from "react";
import Modal from "react-modal";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import "./my-bookings.styles.css";

import { selectUserData } from "../../store/user/user.selector";

const MyBookingsPage = () => {
  const apiUrl = process.env.REACT_APP_BE_API_URL;
  const apiKey = process.env.REACT_APP_API_KEY;
  const userData = useSelector(selectUserData);
  const [diagnosticBookings, setDiagnosticBookings] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(10);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({});
  const [bookingStates, setBookingStates] = useState([]);
  console.log(bookingDetails.reports);

  const startBookingIndex = (pageNumber - 1) * limit + 1;
  const endBookingIndex =
    diagnosticBookings.length > 0
      ? Math.min(startBookingIndex + limit - 1, metaData.totalBookingCount)
      : 0;

  useEffect(() => {
    fetchDiagnosticBookings();
  }, [pageNumber]);

  const fetchDiagnosticBookings = () => {
    const apiEndpoint =
      apiUrl +
      `/get/diagnostics/bookings?userId=${userData.userId}&page=${pageNumber}&limit=${limit}`;
    fetch(apiEndpoint, {
      method: "GET",
      headers: {
        Authorization:
          "eyJhbGciOiJIUzUxMiJ9.eyJzZWNyZXQiOiJiZmE3MzhhNjdkOGU5NGNmNDI4ZTdjZWE5Y2E1YzY3YiJ9.o4k544e1-NWMTBT28lOmEJe_D4TMOuwb11_rXLWb_SNhd6Oq70lWWqVdHzenEr1mhnVTDAtcOufnc4CMlIxUiw",
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
        setDiagnosticBookings(data.data.diagnosticBookings);
        setMetaData(data.data.metaData);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const formatCreatedOn = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const openModal = (bookingId) => {
    fetchBookingDetails(bookingId);
    setModalIsOpen(true);
  };

  const fetchBookingDetails = (bookingId) => {
    const apiEndpoint =
      apiUrl + `/details/diagnostics/bookings/${userData.userId}/${bookingId}`;
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
        setBookingDetails(data.data.bookingDetails[0]);
        setBookingStates(data.data.bookingDetails[0].bookingStates);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div className="m-bookings-container">
        <div className="m-bookings-main-header">
          <h3>All Bookings</h3>
        </div>
        {diagnosticBookings.length > 0 ? (
          <div className="m-bookings-item-container">
            <div className="m-bookings-table-container">
              <table className="m-bookings-table-main">
                <thead>
                  <tr>
                    <th>Booking Id</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {diagnosticBookings.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "even-row" : "odd-row"}
                    >
                      <td
                        onClick={() => {
                          openModal(item._id);
                        }}
                      >
                        {item._id}
                      </td>
                      <td>{formatCreatedOn(item.createdOn)}</td>
                      <td>
                        <span className="m-bookings-price-symbol">&#8377;</span>
                        {item.totalPrice}
                      </td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="m-booking-bottom-nav">
              <div className="m-booking-showing-text-label">
                <span>{`Showing ${startBookingIndex}-${endBookingIndex} of ${metaData.totalBookingCount}`}</span>
              </div>
              <button
                onClick={() => setPageNumber(pageNumber - 1)}
                disabled={pageNumber === 1}
                className="m-booking-previous-btn"
              >
                &lt;
              </button>
              <button
                onClick={() => setPageNumber(pageNumber + 1)}
                disabled={pageNumber === metaData.totalPages}
                className="m-booking-next-btn"
              >
                &gt;
              </button>
            </div>
          </div>
        ) : (
          <div>No Bookings</div>
        )}
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
        <div className="my-booking-modal-container">
          {bookingDetails && (
            <>
              <div className="my-booking-modal-header-main">
                <span>Booking Id: {bookingDetails._id}</span>
                <RxCross2
                  className="my-booking-modal-cancel-icon"
                  onClick={closeModal}
                />
              </div>
              <div className="my-booking-stepper-container">
                <div className="my-booking-stepper-section">
                  {bookingStates.length > 0 && (
                    <>
                      {bookingStates.map((step, index) => (
                        <div
                          key={step.stateId}
                          className={
                            step.isActive ? "step-item complete" : "step-item"
                          }
                        >
                          <div className="step">
                            {step.isActive ? (
                              <TiTick className="tick-icon" />
                            ) : (
                              index + 1
                            )}
                          </div>
                          <p>{step.stateName}</p>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
              <div className="my-booking-reports-section">
                {bookingStates.length > 0 && (
                  <>
                    {bookingDetails.reports.length > 0 ? (
                      <>
                        <h2 className="my-booking-report-header">Report List</h2>
                        <ul>
                          {bookingDetails.reports.map((report, index) => (
                            <li key={index}>
                              <a href={report.url} download className="my-booking-report-file-url">
                                {report.url.split("/").pop()}{" "}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <>
                        <h2 className="my-booking-report-header">No Reports Available</h2>
                      </>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default memo(MyBookingsPage);
