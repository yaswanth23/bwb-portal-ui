import { Fragment, memo, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar.component";
import "./homepage.styles.css";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#fbfbfb";
    return () => {
      document.body.style.backgroundColor = "#fbfbfb";
    };
  }, []);

  return (
    <Fragment>
      <div className="hp-container">
        <Sidebar />
        <div className="hp-content-container">
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};

export default memo(HomePage);
