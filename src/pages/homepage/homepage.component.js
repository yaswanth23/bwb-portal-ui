import { memo } from "react";
import Sidebar from "../../components/sidebar/sidebar.component";
import Navbar from "../../components/navbar/navbar.component";
import "./homepage.styles.css";
import { Outlet } from "react-router-dom";

const HomePage = () => {
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
