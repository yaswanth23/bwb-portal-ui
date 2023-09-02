import { memo } from "react";
import { AiOutlineSchedule } from "react-icons/ai";
import { BsThermometerHalf } from "react-icons/bs";
import {
  PiHeartbeatFill,
  PiTestTubeFill,
  PiClockDuotone,
} from "react-icons/pi";
import "./diagnosticDetails.styles.css";

const DiagnosticDetails = ({ diagnosticsData }) => {
  return (
    <>
      <div className="dd-container">
        <div className="dd-first-container">
          <PiHeartbeatFill className="dd-heart-fill-icon" />
          <h4 className="dd-f-test-header">{diagnosticsData.testName}</h4>
          <div className="dd-f-details-conainer">
            <div className="dd-f-details-sample-type">
              <p className="dd-f-details-st-m">
                <PiTestTubeFill className="dd-f-test-tube-icon" />
                <span>Sample Type: </span>
                {diagnosticsData.sampleType}
              </p>
            </div>
            <div className="dd-f-details-temperature-type">
              <BsThermometerHalf className="dd-f-temperature-icon" />
              <p className="dd-f-details-tt-m">
                <span>Temperature: </span>
                {diagnosticsData.logisticsTemperature}
              </p>
            </div>
            <div className="dd-f-details-schedule-type">
              <AiOutlineSchedule className="dd-f-calander-icon" />
              <p className="dd-f-details-schedule-t-m">
                <span>Schedule On: </span>
                {diagnosticsData.schedule}
              </p>
            </div>
            <div className="dd-f-details-tat-type">
              <PiClockDuotone className="dd-f-clock-icon" />
              <p className="dd-f-details-tat-m">
                <span>TAT: </span>
                {diagnosticsData.tat}
              </p>
            </div>
          </div>
          <div className="dd-details-price">
            <span className="dd-price-symbol">&#8377;</span>
            <p>{diagnosticsData.mrp}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(DiagnosticDetails);
