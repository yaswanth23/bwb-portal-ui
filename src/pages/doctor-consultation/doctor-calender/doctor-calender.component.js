import { memo, useEffect } from "react";
import "./doctor-calender.styles.css";

const DoctorCalender = ({ calendlyUserUrl }) => {
  calendlyUserUrl += "?background_color=ffffff&text_color=0b007b";

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="doctor-calender-container">
      <div
        className="calendly-inline-widget"
        data-url={calendlyUserUrl}
        style={{ minWidth: "320px", height: "700px" }}
      ></div>
    </div>
  );
};

export default memo(DoctorCalender);
