import { memo, useState, useEffect } from "react";
import { GrTest, GrSchedules } from "react-icons/gr";
import { BsThermometerHalf } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { MdSchedule } from "react-icons/md";
import "./diagnosticDetails.styles.css";

const DiagnosticDetails = ({ diagnosticTestId }) => {
  const [diagnosticsData, setDiagnosticsData] = useState(null);
  console.log(diagnosticsData);

  useEffect(() => {
    if (diagnosticTestId !== "") {
      fetch(
        `https://qar5m2k5ra.execute-api.ap-south-1.amazonaws.com/dev/api/v1/diagnostics/details/${diagnosticTestId}`,
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
          setDiagnosticsData(data.data);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
  }, [diagnosticTestId]);

  return (
    <>
      <div className="dd-container">
        {diagnosticsData && (
          <>
            <div className="dd-first-container">
              {diagnosticsData.sampleType && (
                <div className="dd-first-types-main">
                  <GrTest size={22} />
                  <h3>Sample Type:</h3>
                  <p>{diagnosticsData.sampleType}</p>
                </div>
              )}
              {diagnosticsData.logisticsTemperature && (
                <div className="dd-first-temperature-main">
                  <BsThermometerHalf size={22} />
                  <h3>Temperature:</h3>
                  <p>{diagnosticsData.logisticsTemperature}</p>
                </div>
              )}
            </div>
            <div className="dd-second-container">
              {diagnosticsData.sampleRemarks && (
                <div className="dd-second-remarks-main">
                  <CgNotes size={22} />
                  <h3>Remarks:</h3>
                  <p>{diagnosticsData.sampleRemarks}</p>
                </div>
              )}
            </div>
            <div className="dd-third-container">
              {diagnosticsData.schedule && (
                <div className="dd-third-schedule-main">
                  <GrSchedules size={22} />
                  <h3>Schedule On:</h3>
                  <p>{diagnosticsData.schedule}</p>
                </div>
              )}
              {diagnosticsData.tat && (
                <div className="dd-third-tat-main">
                  <MdSchedule size={22} />
                  <h3>TAT:</h3>
                  <p>{diagnosticsData.tat}</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default memo(DiagnosticDetails);
