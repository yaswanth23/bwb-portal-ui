import { memo, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { PiDownloadSimple } from "react-icons/pi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./view-prescription.styles.css";

const ViewPrescriptinPage = () => {
  const apiUrl = process.env.REACT_APP_BE_API_URL;
  const apiKey = process.env.REACT_APP_API_KEY;
  const { appointmentId } = useParams();
  const [appointmentDetails, setAppointmentDetails] = useState([]);
  const pdfRef = useRef();

  useEffect(() => {
    fetchAppointmentDetails();
    document.body.style.backgroundColor = "#f2f2f2";
    return () => {
      document.body.style.backgroundColor = "#f2f2f2";
    };
  }, []);

  const fetchAppointmentDetails = () => {
    const apiEndpoint = apiUrl + `/get/appointments/${appointmentId}`;

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
        setAppointmentDetails(data.data.appointmentDetails);
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
      pdf.save(`${appointmentId}_prescription.pdf`);
    });
  };

  return (
    <>
      {appointmentDetails.length > 0 ? (
        <>
          <div className="vp-container" ref={pdfRef}>
            <div className="vp-logo-container">
              <span className="vp-logo">
                <span className="vp-sub-logo-name">bharat</span>wellbeing
              </span>
            </div>
            <div className="vp-invoice-container">
              <span>
                <span className="vp-invoice-booking-id">Appointment ID: </span>
                {appointmentId}
              </span>
              <h1 className="vp-invoice-header">Invoice</h1>
            </div>
            <div className="vp-invoice-details-container">
              <span>
                <span className="vp-invoice-issued-on">Issued On: </span>
                {formatCreatedOn(appointmentDetails[0].createdOn)}
              </span>
            </div>
            <div className="vp-patient-details-container">
              <div className="vp-patient-details-main">
                <span className="vp-patient-details-header">
                  Patient Information:
                </span>
                <div className="vp-sub-patient-details-main">
                  <p>{appointmentDetails[0].patientName}</p>
                  <p>{appointmentDetails[0].patientMobileNumber}</p>
                </div>
              </div>
              <div className="vp-patient-details-main">
                <span className="vp-patient-details-header">
                  Doctor Information:
                </span>
                <div className="vp-sub-patient-details-main">
                  <p>{appointmentDetails[0].doctorName}</p>
                  <p>{appointmentDetails[0].doctorMobileNumber}</p>
                </div>
              </div>
            </div>
            <div className="vp-items-description-container">
              <div className="vp-c-patient-details-main">
                <span className="vp-patient-details-header">
                  Patient Symptoms:
                </span>
                <div className="vp-sub-patient-details-main">
                  <p>
                    {
                      appointmentDetails[0].prescriptionDetails[0]
                        .patientSymptoms
                    }
                  </p>
                </div>
              </div>
              <div className="vp-c-patient-details-main">
                <span className="vp-patient-details-header">Diagnosis:</span>
                <div className="vp-sub-patient-details-main">
                  <p>
                    {appointmentDetails[0].prescriptionDetails[0].diagnosis}
                  </p>
                </div>
              </div>
              <div className="vp-c-patient-details-main">
                <span className="vp-patient-details-header">
                  Prescribed Medicine:
                </span>
                <div className="vp-sub-patient-details-main">
                  <p>
                    {
                      appointmentDetails[0].prescriptionDetails[0]
                        .prescribedMedicine
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="vp-download-receipt-main">
            <button
              className="vp-download-receipt-button"
              onClick={downloadPDF}
            >
              <PiDownloadSimple className="vp-download-icon" /> Download Receipt
            </button>
          </div>
        </>
      ) : (
        <div>No data found</div>
      )}
    </>
  );
};

export default memo(ViewPrescriptinPage);
