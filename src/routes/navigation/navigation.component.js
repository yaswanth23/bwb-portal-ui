import { Fragment, memo } from "react";
import { Link } from "react-router-dom";
import "./navigation.styles.css";

const Navigation = () => {
  return (
    <Fragment>
      <div className="logo-container">
        <Link to="/" className="logo">
          <span className="sub-logo-name">bharat</span>wellbeing
        </Link>
      </div>
    </Fragment>
  );
};

export default memo(Navigation);
