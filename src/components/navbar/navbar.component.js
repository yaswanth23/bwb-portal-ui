import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { useSelector } from "react-redux";
import "./navbar.styles.css";

import user_b from "../../assets/icons/user-blue.svg";
import { changeIsLoggedOutUser } from "../../store/user/user.action";
import { selectCartCount } from "../../store/cart/cart.selector";

const Navbar = () => {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = () => {
    dispatch(changeIsLoggedOutUser());
  };

  return (
    <>
      <div className="navbar-container">
        <div className="cart-icon-container">
          <Link to="/cart">
            <button className="cart-icon-button">
              <BsCart3 className="navbar-cart-icon" />
              {cartCount >= 0 && (
                <span className="cart-counter">{cartCount}</span>
              )}
            </button>
          </Link>
        </div>
        <div className="user-icon-container">
          <img
            src={user_b}
            className="user-link-icon"
            alt="user-profile"
            onClick={toggleDropdown}
          />
          {isDropdownVisible && (
            <div className="nv-dropdown-menu">
              <span onClick={handleLogout}>Log out</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(Navbar);
