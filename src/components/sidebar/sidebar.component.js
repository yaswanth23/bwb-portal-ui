import { Fragment, memo, useEffect } from "react";
import { Link } from "react-router-dom";
import "./sidebar.styles.css";

const Sidebar = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#fbfbfb";
    return () => {
      document.body.style.backgroundColor = "#fbfbfb";
    };
  }, []);

  return (
    <Fragment>
      <div className="sb-container">
        <div className="sb-logo-container">
          <Link to="/" className="sb-logo">
            <span className="sb-sub-logo-name">bharat</span>wellbeing
          </Link>
        </div>
        <div>welcome to sidebar</div>
      </div>
    </Fragment>
  );
};

export default memo(Sidebar);
