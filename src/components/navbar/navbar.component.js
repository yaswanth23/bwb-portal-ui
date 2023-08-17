import { memo } from "react";
import "./navbar.styles.css";

import user_b from "../../assets/icons/user-blue.svg";

const Navbar = () => {
  return (
    <>
      <div className="navbar-container">
        <img src={user_b} className="user-link-icon" alt="user-profile" />
      </div>
    </>
  );
};

export default memo(Navbar);
