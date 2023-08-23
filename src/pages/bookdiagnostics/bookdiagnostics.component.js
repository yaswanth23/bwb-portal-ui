import { memo, useState, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import "./bookdiagnostics.styles.css";

const BookDiagnosticsPage = () => {
  const [pincodes, setPincodes] = useState(null);
  const [inputPincodeValue, setInputPincodeValue] = useState("");
  const [selectedPincode, setSelectedPincode] = useState("");
  const [openPincodeDropdown, setOpenPincodeDropdown] = useState(false);
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
  }, []);

  const handleInputPincode = (event) => {
    const newPincode = +event.target.value;
    if (!isNaN(newPincode)) {
      if (newPincode.toString().length <= 6) {
        setInputPincodeValue(newPincode.toString());
      }
    }
  };

  return (
    <>
      <div className="bdp-container">
        <div className="bdp-first-container">
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
              {selectedPincode ? selectedPincode : "Select Pincode"}
              <BiChevronDown
                size={25}
                className={openPincodeDropdown && "bdp-chevron-rotate"}
              />
            </div>
            <ul
              className={
                openPincodeDropdown ? "bdp-u-list" : "bdp-u-list close"
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
        </div>
      </div>
    </>
  );
};

export default memo(BookDiagnosticsPage);
