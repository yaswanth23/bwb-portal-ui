import { memo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";
import "./bookdiagnostics.styles.css";

import DiagnosticDetailsCard from "./diagnosticdetails/diagnosticDetails.component";

const BookDiagnosticsPage = () => {
  const navigate = useNavigate();
  const [pincodes, setPincodes] = useState(null);
  const [inputPincodeValue, setInputPincodeValue] = useState("");
  const [selectedPincode, setSelectedPincode] = useState("Select Pincode");
  const [openPincodeDropdown, setOpenPincodeDropdown] = useState(false);
  const [diagnostics, setDiagnostics] = useState(null);
  const [inputDiagnosticValue, setInputDiagnosticValue] = useState("");
  const [selectedDiagnostics, setSelectedDiagnostics] =
    useState("Select Test Name");
  const [selectedDiagnosticsTestId, setSelectedDiagnosticsTestId] =
    useState("");
  const [openDiagnosticDropdown, setOpenDiagnosticDropdown] = useState(false);
  const [diagnosticsData, setDiagnosticsData] = useState(null);
  const [isAddToCartToggle, setIsAddToCartToggle] = useState(false);
  const limit = 10;

  useEffect(() => {
    if (inputPincodeValue !== "" && inputPincodeValue != 0) {
      fetch(
        `https://qar5m2k5ra.execute-api.ap-south-1.amazonaws.com/dev/api/v1/search/${inputPincodeValue}`,
        {
          method: "GET",
          headers: {
            Authorization:
              "eyJhbGciOiJIUzUxMiJ9.eyJzZWNyZXQiOiJiZmE3MzhhNjdkOGU5NGNmNDI4ZTdjZWE5Y2E1YzY3YiJ9.o4k544e1-NWMTBT28lOmEJe_D4TMOuwb11_rXLWb_SNhd6Oq70lWWqVdHzenEr1mhnVTDAtcOufnc4CMlIxUiw",
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setPincodes(data.data);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
  }, [inputPincodeValue]);

  useEffect(() => {
    if (inputDiagnosticValue !== "") {
      fetch(
        `https://qar5m2k5ra.execute-api.ap-south-1.amazonaws.com/dev/api/v1/search/diagnostics/${inputDiagnosticValue}`,
        {
          method: "GET",
          headers: {
            Authorization:
              "eyJhbGciOiJIUzUxMiJ9.eyJzZWNyZXQiOiJiZmE3MzhhNjdkOGU5NGNmNDI4ZTdjZWE5Y2E1YzY3YiJ9.o4k544e1-NWMTBT28lOmEJe_D4TMOuwb11_rXLWb_SNhd6Oq70lWWqVdHzenEr1mhnVTDAtcOufnc4CMlIxUiw",
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setDiagnostics(data.data);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
  }, [inputDiagnosticValue]);

  useEffect(() => {
    if (selectedDiagnosticsTestId !== "") {
      fetch(
        `https://qar5m2k5ra.execute-api.ap-south-1.amazonaws.com/dev/api/v1/diagnostics/details/${selectedDiagnosticsTestId}`,
        {
          method: "GET",
          headers: {
            Authorization:
              "eyJhbGciOiJIUzUxMiJ9.eyJzZWNyZXQiOiJiZmE3MzhhNjdkOGU5NGNmNDI4ZTdjZWE5Y2E1YzY3YiJ9.o4k544e1-NWMTBT28lOmEJe_D4TMOuwb11_rXLWb_SNhd6Oq70lWWqVdHzenEr1mhnVTDAtcOufnc4CMlIxUiw",
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setDiagnosticsData(data.data);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
  }, [selectedDiagnosticsTestId]);

  useEffect(() => {
    fetch(
      `https://qar5m2k5ra.execute-api.ap-south-1.amazonaws.com/dev/api/v1/get/pincodes?page=1&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization:
            "eyJhbGciOiJIUzUxMiJ9.eyJzZWNyZXQiOiJiZmE3MzhhNjdkOGU5NGNmNDI4ZTdjZWE5Y2E1YzY3YiJ9.o4k544e1-NWMTBT28lOmEJe_D4TMOuwb11_rXLWb_SNhd6Oq70lWWqVdHzenEr1mhnVTDAtcOufnc4CMlIxUiw",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPincodes(data.data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });

    fetch(
      `https://qar5m2k5ra.execute-api.ap-south-1.amazonaws.com/dev/api/v1/get/diagnostics?page=1&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization:
            "eyJhbGciOiJIUzUxMiJ9.eyJzZWNyZXQiOiJiZmE3MzhhNjdkOGU5NGNmNDI4ZTdjZWE5Y2E1YzY3YiJ9.o4k544e1-NWMTBT28lOmEJe_D4TMOuwb11_rXLWb_SNhd6Oq70lWWqVdHzenEr1mhnVTDAtcOufnc4CMlIxUiw",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setDiagnostics(data.data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const handleInputPincode = (event) => {
    const newPincode = +event.target.value;
    if (!isNaN(newPincode)) {
      if (newPincode.toString().length <= 6) {
        setInputPincodeValue(newPincode.toString());
      }
    }
  };

  const handleInputDiagnostic = (event) => {
    setInputDiagnosticValue(event.target.value);
  };

  const addTestsToCart = () => {
    if (
      !isAddToCartToggle &&
      selectedPincode !== "Select Pincode" &&
      selectedDiagnostics !== "Select Test Name"
    ) {
      setIsAddToCartToggle(true);
    } else {
      navigate("/cart");
    }
  };

  const handleClearChanges = () => {
    setInputPincodeValue("");
    setSelectedPincode("Select Pincode");
    setInputDiagnosticValue("");
    setSelectedDiagnostics("Select Test Name");
    setSelectedDiagnosticsTestId("");
    setDiagnosticsData(null);
    setIsAddToCartToggle(false);
  };

  return (
    <>
      <div className="bdp-container">
        <div className="bdp-first-container">
          <div className="bdp-first-patient-details-container">
            <div className="bdp-first-patient-details-label">
              <h3>Book Diagnostics</h3>
            </div>
          </div>
          <div className="bdp-first-sub-one-container">
            <div className="bdp-search-container">
              <span className="bdp-search-label">Pincode</span>
              <div
                className={
                  !selectedPincode
                    ? "bdp-search-main"
                    : "bdp-search-main selected"
                }
                onClick={() => setOpenPincodeDropdown(!openPincodeDropdown)}
              >
                {selectedPincode}
                <BiChevronDown
                  size={25}
                  className={openPincodeDropdown && "bdp-chevron-rotate"}
                />
              </div>
              <ul
                className={
                  openPincodeDropdown ? "bdp-ul-s-list" : "bdp-ul-s-list close"
                }
              >
                <div className="bdp-u-s-list">
                  <AiOutlineSearch size={18} className="bdp-u-search-icon" />
                  <input
                    type="text"
                    value={inputPincodeValue == 0 ? "" : inputPincodeValue}
                    onChange={handleInputPincode}
                    placeholder="Enter pincode"
                    className="bdp-u-search-text"
                  />
                </div>
                {pincodes?.map((item) => (
                  <li
                    key={item.id}
                    className={
                      item?.pincode == selectedPincode
                        ? "bdp-s-list p-selected"
                        : "bdp-s-list"
                    }
                    onClick={() => {
                      if (item?.pincode !== selectedPincode) {
                        setSelectedPincode(item?.pincode);
                        setOpenPincodeDropdown(false);
                        setInputPincodeValue("");
                      }
                    }}
                  >
                    {item?.pincode}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bdp-diagnostics-container">
              <span className="bdp-diagnostics-label">Lab Tests</span>
              <div
                className={
                  !selectedDiagnostics
                    ? "bdp-diagnostics-main"
                    : "bdp-diagnostics-main selected"
                }
                onClick={() =>
                  setOpenDiagnosticDropdown(!openDiagnosticDropdown)
                }
              >
                <div className="bdp-diagnostics-tests-text">
                  {selectedDiagnostics}
                </div>
                <BiChevronDown
                  size={25}
                  className={openDiagnosticDropdown && "bdp-chevron-rotate"}
                />
              </div>
              <ul
                className={
                  openDiagnosticDropdown
                    ? "bdp-ul-d-list"
                    : "bdp-ul-d-list close"
                }
              >
                <div className="bdp-u-s-list">
                  <AiOutlineSearch size={18} className="bdp-u-search-icon" />
                  <input
                    type="text"
                    value={
                      inputDiagnosticValue == 0 ? "" : inputDiagnosticValue
                    }
                    onChange={handleInputDiagnostic}
                    placeholder="Enter Test Name"
                    className="bdp-u-search-text"
                  />
                </div>
                {diagnostics?.map((item) => (
                  <li
                    key={item.testId}
                    className={
                      item?.attributeValue == selectedDiagnostics
                        ? "bdp-s-list p-selected"
                        : "bdp-s-list"
                    }
                    onClick={() => {
                      if (item?.attributeValue !== selectedDiagnostics) {
                        setSelectedDiagnostics(item?.attributeValue);
                        setSelectedDiagnosticsTestId(item?.testId);
                        setOpenDiagnosticDropdown(false);
                        setInputDiagnosticValue("");
                      }
                    }}
                  >
                    {item?.attributeValue}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {selectedDiagnosticsTestId && (
            <div className="bdp-first-sub-two-container">
              <DiagnosticDetailsCard diagnosticsData={diagnosticsData} />
            </div>
          )}
          <div className="bdp-submit-button-container">
            <button
              className="bdp-submit-clear-button"
              onClick={handleClearChanges}
            >
              <span>clear</span>
            </button>
            <button className="bdp-submit-add-to-cart" onClick={addTestsToCart}>
              <BsCart3 className="bdp-submit-add-to-cart-icon" />
              {isAddToCartToggle ? (
                <span>Go to cart</span>
              ) : (
                <span>Add to cart</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(BookDiagnosticsPage);
