import { Fragment, memo, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import "./navigation.styles.css";

const Navigation = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#fbfbfb";
    return () => {
      document.body.style.backgroundColor = "#fbfbfb";
    };
  }, []);

  return (
    <Fragment>
      <div className="logo-container">
        <Link to="/" className="logo">
          <span className="sub-logo-name">bharat</span>wellbeing
        </Link>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default memo(Navigation);
