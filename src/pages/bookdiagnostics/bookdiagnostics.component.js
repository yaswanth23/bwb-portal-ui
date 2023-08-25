import { memo, useState, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import "./bookdiagnostics.styles.css";

import DiagnosticDetailsCard from "./diagnosticdetails/diagnosticDetails.component";

const BookDiagnosticsPage = () => {
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
  const limit = 10;

  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

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

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleMobileNumberChange = (event) => {
    const newMobileNumber = +event.target.value;
    if (!isNaN(newMobileNumber)) {
      if (newMobileNumber.toString().length <= 10) {
        setMobileNumber(newMobileNumber.toString());
      }
    }
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleAgeChange = (event) => {
    const newAge = +event.target.value;
    if (!isNaN(newAge)) {
      if (newAge.toString().length <= 2) {
        setAge(newAge.toString());
      }
    }
  };

  return (
    <>
      <div className="bdp-container">
        <div className="bdp-first-container">
          <div className="bdp-first-patient-details-container">
            <div className="bdp-first-patient-details-label">
              <h3>Patient Details</h3>
            </div>
            <div className="bdp-first-patient-details-form-main">
              <div className="bdp-first-patient-details-f-inputs">
                <div className="bdp-first-patient-details-f-name">
                  <p className="bdp-p-name-label">Full Name</p>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={fullName}
                    onChange={handleFullNameChange}
                    className="bdp-p-name-field"
                    placeholder="Full Name"
                    autoComplete="off"
                  />
                </div>
                <div className="bdp-first-patient-details-f-mobile">
                  <p className="bdp-p-mobile-label">Mobile Number</p>
                  <input
                    type="text"
                    required
                    name="mobileNumber"
                    value={mobileNumber == 0 ? "" : mobileNumber}
                    onChange={handleMobileNumberChange}
                    className="bdp-p-mobile-field"
                    placeholder="Mobile Number"
                    autoComplete="off"
                    maxLength="10"
                  />
                </div>
              </div>
              <div className="bdp-first-patient-details-s-inputs">
                <div className="bdp-first-patient-details-s-age">
                  <p className="bdp-p-age-label">Age</p>
                  <input
                    type="text"
                    required
                    name="age"
                    value={age == 0 ? "" : age}
                    onChange={handleAgeChange}
                    className="bdp-p-age-field"
                    placeholder="Age"
                    autoComplete="off"
                    maxLength="2"
                  />
                </div>
                <div className="bdp-first-patient-details-s-gender">
                  <p className="bdp-p-gender-label">Gender</p>
                  <div className="bdp-p-gender-main">
                    <div className="bdp-p-gender-sub">
                      <input
                        type="radio"
                        required
                        checked={gender === "Male"}
                        onChange={handleGenderChange}
                        className="bdp-p-gender-field"
                        value="Male"
                        name="gender"
                      />
                      <span>Male</span>
                    </div>
                    <div className="bdp-p-gender-sub">
                      <input
                        type="radio"
                        required
                        checked={gender === "Female"}
                        onChange={handleGenderChange}
                        className="bdp-p-gender-field"
                        value="Female"
                        name="gender"
                      />
                      <span>Female</span>
                    </div>
                  </div>
                </div>
              </div>
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
              <DiagnosticDetailsCard
                diagnosticTestId={selectedDiagnosticsTestId}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(BookDiagnosticsPage);
