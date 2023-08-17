import { memo, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar.component";
import Navbar from "../../components/navbar/navbar.component";
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
    <>
      <div className="hp-container">
        <Sidebar />
        <div className="hp-content-container">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default memo(HomePage);
