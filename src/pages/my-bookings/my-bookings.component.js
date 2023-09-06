import { memo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./my-bookings.styles.css";

import { selectUserData } from "../../store/user/user.selector";

const MyBookingsPage = () => {
  const userData = useSelector(selectUserData);
  const [diagnosticBookings, setDiagnosticBookings] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(10);

  const startBookingIndex = (pageNumber - 1) * limit + 1;
  const endBookingIndex =
    diagnosticBookings.length > 0
      ? Math.min(startBookingIndex + limit - 1, metaData.totalBookingCount)
      : 0;

  useEffect(() => {
    fetchDiagnosticBookings();
  }, [pageNumber]);

  const fetchDiagnosticBookings = () => {
    fetch(
      `https://qar5m2k5ra.execute-api.ap-south-1.amazonaws.com/dev/api/v1/get/diagnostics/bookings?userId=${userData.userId}&page=${pageNumber}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization:
            "eyJhbGciOiJIUzUxMiJ9.eyJzZWNyZXQiOiJiZmE3MzhhNjdkOGU5NGNmNDI4ZTdjZWE5Y2E1YzY3YiJ9.o4k544e1-NWMTBT28lOmEJe_D4TMOuwb11_rXLWb_SNhd6Oq70lWWqVdHzenEr1mhnVTDAtcOufnc4CMlIxUiw",
          "Content-Type": "application/json",
        },
      }
    )
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
                      <td>{item._id}</td>
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
    </>
  );
};

export default memo(MyBookingsPage);
