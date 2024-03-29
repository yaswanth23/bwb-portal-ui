import { Fragment, memo, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaUserDoctor } from "react-icons/fa6";
import { BsCalendar2CheckFill } from "react-icons/bs";
import "./sidebar.styles.css";

import budget_b from "../../assets/icons/budget-blue.svg";
import budget_w from "../../assets/icons/budget-white.svg";
import home_b from "../../assets/icons/home-blue.svg";
import home_w from "../../assets/icons/home-white.svg";
import plane_b from "../../assets/icons/plane-blue.svg";
import plane_w from "../../assets/icons/plane-white.svg";

import { storeUserLocationCaptured } from "../../store/user/user.action";

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [activeLinkIdx, setActiveLinkIdx] = useState(1);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const apiKey = "AIzaSyAg1jbL4bRBmiqWx5ZQImooTyRSMQTOtcs";
          const { latitude, longitude } = position.coords;
          const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              if (data.status === "OK" && data.results.length > 0) {
                const addressComponents = data.results[0].address_components;
                const postalCodeObj = addressComponents.find((component) =>
                  component.types.includes("postal_code")
                );

                if (postalCodeObj) {
                  const postalCode = postalCodeObj.short_name;
                  dispatch(storeUserLocationCaptured(postalCode));
                }
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not available in your browser.");
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/book-diagnostics") {
      setActiveLinkIdx(2);
    } else if (location.pathname === "/my-bookings") {
      setActiveLinkIdx(3);
    } else if (location.pathname === "/doctor-consultation") {
      setActiveLinkIdx(4);
    } else if (location.pathname === "/my-appointments") {
      setActiveLinkIdx(5);
    }
    document.body.style.backgroundColor = "#f2f2f2";
    return () => {
      document.body.style.backgroundColor = "#f2f2f2";
    };
  }, [location.pathname]);

  return (
    <Fragment>
      <div className="sb-container">
        <div className="sb-logo-container">
          <Link to="/" className="sb-logo">
            <span className="sb-sub-logo-name">bharat</span>wellbeing
          </Link>
        </div>
        <nav className="sb-navigation">
          <ul className="sb-nav-list">
            <li className="sb-nav-item">
              <Link
                to="/"
                onClick={() => setActiveLinkIdx(1)}
                className={`sb-nav-link ${
                  1 === activeLinkIdx ? "active" : null
                }`}
              >
                <img
                  src={1 === activeLinkIdx ? home_b : home_w}
                  className="sb-nav-link-icon"
                  alt="home-icon"
                />
                <span className="sb-nav-link-text">Home</span>
              </Link>
            </li>
            <li className="sb-nav-item">
              <Link
                to="/book-diagnostics"
                onClick={() => setActiveLinkIdx(2)}
                className={`sb-nav-link ${
                  2 === activeLinkIdx ? "active" : null
                }`}
              >
                <img
                  src={2 === activeLinkIdx ? budget_b : budget_w}
                  className="sb-nav-link-icon"
                  alt="book-diagnostics-icon"
                />
                <span className="sb-nav-link-text">Book Diagnostics</span>
              </Link>
            </li>
            <li className="sb-nav-item">
              <Link
                to="/my-bookings"
                onClick={() => setActiveLinkIdx(3)}
                className={`sb-nav-link ${
                  3 === activeLinkIdx ? "active" : null
                }`}
              >
                <img
                  src={3 === activeLinkIdx ? plane_b : plane_w}
                  className="sb-nav-link-icon"
                  alt="transactions-icon"
                />
                <span className="sb-nav-link-text">My Bookings</span>
              </Link>
            </li>
            <li className="sb-nav-item">
              <Link
                to="/doctor-consultation"
                onClick={() => setActiveLinkIdx(4)}
                className={`sb-nav-link ${
                  4 === activeLinkIdx ? "active" : null
                }`}
              >
                <FaUserDoctor
                  className={`sb-nav-link-doctor-icon ${
                    4 === activeLinkIdx ? "active" : null
                  }`}
                />
                <span className="sb-nav-link-text">Consult Doctors</span>
              </Link>
            </li>
            <li className="sb-nav-item">
              <Link
                to="/my-appointments"
                onClick={() => setActiveLinkIdx(5)}
                className={`sb-nav-link ${
                  5 === activeLinkIdx ? "active" : null
                }`}
              >
                <BsCalendar2CheckFill
                  className={`sb-nav-link-doctor-icon ${
                    5 === activeLinkIdx ? "active" : null
                  }`}
                />
                <span className="sb-nav-link-text">My Appointments</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </Fragment>
  );
};

export default memo(Sidebar);
