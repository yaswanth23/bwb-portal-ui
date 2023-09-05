import { memo, useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { PiDownloadSimple } from "react-icons/pi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./booking-confirm-page.styles.css";

const BookingConfirmation = () => {
  const location = useLocation();
  const bookingData = useState(location.state);
  const pdfRef = useRef();

  useEffect(() => {
    document.body.style.backgroundColor = "#fbfbfb";
    return () => {
      document.body.style.backgroundColor = "#fbfbfb";
    };
  }, []);

  const formatCreatedOn = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imageData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save(`${bookingData[0].data.bookingData[0]._id}_invoice.pdf`);
    });
  };

  return (
    <>
      {bookingData[0] ? (
        <>
          <div className="bcp-container" ref={pdfRef}>
            <div className="bcp-logo-container">
              <span className="bcp-logo">
                <span className="bcp-sub-logo-name">bharat</span>wellbeing
              </span>
            </div>
            <div className="bcp-invoice-container">
              <span>
                <span className="bcp-invoice-booking-id">Booking ID: </span>
                {bookingData[0].data.bookingData[0]._id}
              </span>
              <h1 className="bcp-invoice-header">Invoice</h1>
            </div>
            <div className="bcp-invoice-details-container">
              <span>
                <span className="bcp-invoice-issued-on">Issued On: </span>
                {formatCreatedOn(bookingData[0].data.bookingData[0].createdOn)}
              </span>
              <div className="bcp-invoice-io-paid">Paid</div>
            </div>
            <div className="bcp-patient-details-container">
              <div className="bcp-patient-details-main">
                <span className="bcp-patient-details-header">
                  Patient Information:
                </span>
                {bookingData[0].data.bookingData[0].patientDetails.map(
                  (item, index) => (
                    <>
                      <div key={index} className="bcp-sub-patient-details-main">
                        <p>{item.name}</p>
                        <p>
                          {item.age}, {item.gender}
                        </p>
                      </div>
                    </>
                  )
                )}
              </div>
              <div className="bcp-patient-address-main">
                <span className="bcp-patient-address-header">Address:</span>
                <div className="bcp-sub-patient-address-main">
                  <p>{bookingData[0].data.bookingData[0].address}</p>
                  <p>{bookingData[0].data.bookingData[0].pincode}</p>
                  <span>
                    <span className="bcp-sub-patient-address-phone-header">
                      Phone:{" "}
                    </span>
                    {bookingData[0].data.bookingData[0].mobileNumber}
                  </span>
                </div>
              </div>
            </div>
            <div className="bcp-items-description-container">
              <table className="bcp-items-table-main">
                <thead>
                  <tr>
                    <th>Diagnostic Tests</th>
                    <th></th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingData[0].data.bookingData[0].cartItems.map(
                    (item, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "even-row" : "odd-row"}
                      >
                        <td>{item.testName}</td>

                        <td colSpan="1"></td>
                        <td>{item.mrp}</td>
                      </tr>
                    )
                  )}
                  <tr>
                    <td colSpan="1"></td>
                    <td className="bcp-items-table-total-header">Total</td>
                    <td>{bookingData[0].data.bookingData[0].totalPrice}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="bcp-download-receipt-main">
            <button
              className="bcp-download-receipt-button"
              onClick={downloadPDF}
            >
              <PiDownloadSimple className="bcp-download-icon" /> Download
              Receipt
            </button>
            <Link to="/book-diagnostics" className="bcp-go-home-button">
              Go Home
            </Link>
          </div>
        </>
      ) : (
        <div className="bcp-go-back-container">
          <Link to="/book-diagnostics" className="bcp-go-back-button">
            Go Back
          </Link>
        </div>
      )}
    </>
  );
};

export default memo(BookingConfirmation);
