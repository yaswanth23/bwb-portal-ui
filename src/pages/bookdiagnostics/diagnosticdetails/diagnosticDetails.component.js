import { memo } from "react";
import { GrTest, GrSchedules } from "react-icons/gr";
import { BsThermometerHalf } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { MdSchedule } from "react-icons/md";
import "./diagnosticDetails.styles.css";

const DiagnosticDetails = ({ diagnosticsData }) => {
  console.log(diagnosticsData);

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
            <div className="dd-fourth-container">
              {diagnosticsData.mrp && (
                <div className="dd-fourth-mrp-main">
                  <span className="dd-fourth-mrp-symbol">&#8377;</span>
                  <p>{diagnosticsData.mrp}</p>
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
