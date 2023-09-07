import { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaHandHoldingHeart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { PiFilesLight } from "react-icons/pi";
import { AiOutlineUserAdd } from "react-icons/ai";
import Modal from "react-modal";
import "./cartpage.styles.css";

import EmptyCartBanner from "../../assets/images/microscope.png";
import { storeCartCount } from "../../store/cart/cart.action";
import { selectUserData } from "../../store/user/user.selector";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(selectUserData);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const [modalHeaderLabel, setModalHeaderLabel] = useState("Patient Details");
  const [modalStepperValue, setModalStepperValue] = useState(1);
  const [modalStepperOneFlag, setModalStepperOneFlag] = useState(true);
  const [modalStepperTwoFlag, setModalStepperTwoFlag] = useState(false);
  const [modalStepperThreeFlag, setModalStepperThreeFlag] = useState(false);
  const [patientMobileNumber, setPatientMobileNumber] = useState("");
  const [patientDetails, setPatientDetails] = useState([]);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [searchErrorMessage, setSearchErrorMessage] = useState("");
  const [patientErrorMessage, setPatientErrorMessage] = useState("");
  const [isAddNewPatientFlag, setIsAddNewPatientFlag] = useState(false);

  useEffect(() => {
    if (selectedPatients.length > 0) {
      setPatientErrorMessage("");
    }
  }, [selectedPatients]);

  useEffect(() => {
    fetch(
      `https://qar5m2k5ra.execute-api.ap-south-1.amazonaws.com/dev/api/v1/cart/get/items/${userData.userId}/${userData.cartId}`,
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
        setCartItems(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setIsLoading(false);
      });

    const imageList = [EmptyCartBanner];
    imageList.forEach((image) => {
      const newImage = new Image();
      newImage.src = image;
      window[image] = newImage;
    });
  }, []);

  const handleRemoveItem = (item) => {
    const requestData = {
      userId: userData.userId,
      cartId: userData.cartId,
      itemId: item.itemId,
    };

    fetch(
      "https://qar5m2k5ra.execute-api.ap-south-1.amazonaws.com/dev/api/v1/cart/remove/items",
      {
        method: "POST",
        headers: {
          Authorization:
            "eyJhbGciOiJIUzUxMiJ9.eyJzZWNyZXQiOiJiZmE3MzhhNjdkOGU5NGNmNDI4ZTdjZWE5Y2E1YzY3YiJ9.o4k544e1-NWMTBT28lOmEJe_D4TMOuwb11_rXLWb_SNhd6Oq70lWWqVdHzenEr1mhnVTDAtcOufnc4CMlIxUiw",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCartItems(data.data);
        setIsLoading(false);
        dispatch(storeCartCount(userData.userId, userData.cartId));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleDelete = (index) => {
    const updatedData = [...patientDetails];
    updatedData.splice(index, 1);
    setPatientDetails(updatedData);
  };

  const handleInputPatientMobileNumber = (event) => {
    const newMobileNumber = +event.target.value;
    setSearchErrorMessage("");
    if (!isNaN(newMobileNumber)) {
      if (newMobileNumber.toString().length <= 10) {
        setPatientMobileNumber(newMobileNumber.toString());
      }
    }
  };

  const fetchPatientDetails = () => {
    if (patientMobileNumber.length === 10) {
      fetch(
        `https://qar5m2k5ra.execute-api.ap-south-1.amazonaws.com/dev/api/v1/patient/details/${patientMobileNumber}`,
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
          if (data.data.patientInfo.length === 0) {
            setPatientDetails([]);
            setSearchErrorMessage("No Saved patients found for this Number");
          } else {
            console.log("in");
            if (patientDetails.length > 0) {
              setPatientDetails([
                ...patientDetails,
                ...data.data.patientInfo.patientDetails,
              ]);
            } else {
              setPatientDetails(data.data.patientInfo.patientDetails);
            }
            setSearchErrorMessage("");
          }
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    } else {
      setSearchErrorMessage("Invalid Mobile Number");
    }
  };

  const handleCheckboxChange = (event, patient) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedPatients((prevSelected) => [...prevSelected, patient]);
    } else {
      setSelectedPatients((prevSelected) =>
        prevSelected.filter((p) => p !== patient)
      );
    }
  };

  const handleAddNewPatientFlag = () => {
    setIsAddNewPatientFlag(!isAddNewPatientFlag);
  };

  const handleSaveNewPatientData = () => {
    if (name && age && gender) {
      const newEntry = { name, age, gender };
      setPatientDetails([...patientDetails, newEntry]);
      setIsAddNewPatientFlag(!isAddNewPatientFlag);
    } else {
      alert("Please enter all the fields name, age and gender.");
    }
  };

  const handleStepOneContinue = () => {
    if (selectedPatients.length > 0) {
      setModalStepperValue(2);
      setModalStepperTwoFlag(true);
      setModalHeaderLabel("Address Details");
    } else {
      setPatientErrorMessage("Please select the patient");
    }
  };

  return (
    <>
      <div className="cp-empty-cart-page-container">
        {isLoading ? (
          <div className="cp-cart-items-loading-container">Loading...</div>
        ) : cartItems &&
          cartItems?.cartItems &&
          cartItems?.cartItems.length > 0 ? (
          <>
            <div className="cp-cart-items-container">
              <div className="cp-cart-items-main">
                {cartItems.cartItems.map((item) => {
                  return (
                    <div className="cp-cart-items-main-box" key={item.itemId}>
                      <div className="cp-cart-items-box-container">
                        <div className="cp-cart-items-box-header-container">
                          <FaHandHoldingHeart
                            size={25}
                            className="cp-cart-items-icon"
                          />
                          <div className="cp-cart-items-info-box">
                            <h3>{item.testName}</h3>
                          </div>
                        </div>
                        <div>
                          <RiDeleteBin6Line
                            className="cp-cart-items-remove-icon"
                            onClick={() => handleRemoveItem(item)}
                          />
                        </div>
                      </div>
                      <div
                        className="cp-cart-items-info-price-box-container"
                        onClick={openModal}
                      >
                        <div className="cp-cart-items-info-price-box">
                          <span className="cp-cart-items-info-price-symbol">
                            &#8377;
                          </span>
                          <p>{item.mrp}</p>
                        </div>
                        {/* diable patients count view */}
                        {/* <div className="cp-cart-items-info-patient-box">
                          <BsPersonPlus className="cp-cart-items-info-patient-box-ap-icon" />
                          <p>{formData?.length}</p>
                          <p>{formData?.length > 1 ? "Patients" : "Patient"}</p>
                        </div> */}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="cp-cart-items-pricing-main">
                <div className="cp-cart-items-pricing-box">
                  <div className="cp-cart-items-pricing-box-one">
                    <p>Cart Value</p>
                    <p className="cp-cart-items-pricing-box-one-tp">
                      <span className="cp-cart-items-pricing-symbol-box-one">
                        &#8377;
                      </span>
                      {""}
                      {cartItems.totalPrice}
                    </p>
                  </div>
                  <div className="cp-cart-items-pricing-box-two">
                    <p>Order Total</p>
                    <p className="cp-cart-items-pricing-box-two-tp">
                      <span className="cp-cart-items-pricing-symbol-box-two">
                        &#8377;
                      </span>
                      {""}
                      {cartItems.totalPrice}
                    </p>
                  </div>
                </div>
                <div className="cp-cart-items-checkout-box">
                  <button
                    className="cp-cart-items-checkout-button"
                    onClick={openModal}
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              preventScroll={true}
              style={{
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                },
                content: {
                  padding: 0,
                  border: "none",
                  top: "50%",
                  left: "50%",
                  right: "auto",
                  bottom: "auto",
                  marginRight: "-50%",
                  transform: "translate(-50%, -50%)",
                },
              }}
              ariaHideApp={false}
            >
              <div className="cp-modal-container">
                <div className="cp-modal-header-main">
                  <h3>{modalHeaderLabel}</h3>
                  <RxCross2
                    className="cp-modal-cancel-icon"
                    onClick={closeModal}
                  />
                </div>
                <div className="cp-modal-stepper">
                  <div
                    className={
                      modalStepperOneFlag
                        ? "cp-modal-stepper-one active"
                        : "cp-modal-stepper-one"
                    }
                  ></div>
                  <div
                    className={
                      modalStepperTwoFlag
                        ? "cp-modal-stepper-one active"
                        : "cp-modal-stepper-two"
                    }
                  ></div>
                  <div
                    className={
                      modalStepperThreeFlag
                        ? "cp-modal-stepper-three active"
                        : "cp-modal-stepper-three"
                    }
                  ></div>
                </div>
                <div className="cp-modal-content-container">
                  <div>
                    {modalStepperValue === 1 && (
                      <div>
                        <div className="cp-modal-patient-details-info-sec">
                          <h3>Step 1: Select Patient</h3>
                          <div className="cp-modal-patient-info-sub">
                            <p>
                              1. Enter the patient's mobile number for details.
                            </p>
                            <p>
                              2. If details aren't displayed, click "Add New
                              Patient." Ensure all selected patients share the
                              same address.
                            </p>
                          </div>
                          <div className="cp-modal-patient-collect-number-container">
                            <div className="cp-modal-patient-collect-number-main">
                              <input
                                type="text"
                                value={
                                  patientMobileNumber == 0
                                    ? ""
                                    : patientMobileNumber
                                }
                                onChange={handleInputPatientMobileNumber}
                                placeholder="Mobile Number"
                                className="cp-modal-patient-mb-number-container-input"
                              />
                              <button
                                className="cp-modal-search-patient-btn"
                                onClick={fetchPatientDetails}
                              >
                                Search Patient
                              </button>
                            </div>
                            {searchErrorMessage && (
                              <span className="cp-modal-error-message">
                                {searchErrorMessage}
                              </span>
                            )}
                          </div>
                          {patientDetails.length > 0 ? (
                            patientDetails.map((item, index) => (
                              <div
                                className="cp-modal-patients-view-container"
                                key={index}
                              >
                                <div className="cp-modal-patients-view-disp-main">
                                  <div className="cp-modal-patients-view-disp-sub-content">
                                    <input
                                      type="checkbox"
                                      value={item.name}
                                      checked={selectedPatients.includes(item)}
                                      onChange={(e) =>
                                        handleCheckboxChange(e, item)
                                      }
                                    />
                                    <div className="cp-modal-pvd-ccontainer">
                                      <p>{item.name}</p>
                                      <p>
                                        {item.age}, {item.gender}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="cp-modal-form-update-items">
                                    {/* currently edit functionality is not enabled */}
                                    {/* <span
                                      className="cp-modal-form-edit-icon"
                                      onClick={() => handleEdit(index)}
                                    >
                                      Edit
                                    </span> */}
                                    <RiDeleteBin6Line
                                      className="cp-modal-form-remove-icon"
                                      onClick={() => handleDelete(index)}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="cp-modal-patients-view-container">
                              <div className="cp-modal-patients-view-main">
                                <PiFilesLight className="cp-modal-files-icon" />
                                No Saved Patients
                              </div>
                            </div>
                          )}
                          <div className="cp-modal-patients-add-new-container">
                            {isAddNewPatientFlag ? (
                              <div className="cp-modal-patients-add-new-main">
                                <input
                                  type="text"
                                  placeholder="Name"
                                  value={name}
                                  required
                                  onChange={handleNameChange}
                                  className="cp-modal-form-input"
                                />
                                <input
                                  type="text"
                                  placeholder="Age"
                                  value={age}
                                  required
                                  onChange={handleAgeChange}
                                  className="cp-modal-form-input-age"
                                />
                                <label className="cp-modal-form-gender-main">
                                  Gender:
                                  <input
                                    type="radio"
                                    required
                                    value="Male"
                                    checked={gender === "Male"}
                                    onChange={handleGenderChange}
                                    className="cp-modal-form-gender-male"
                                  />
                                  Male
                                  <input
                                    type="radio"
                                    required
                                    value="Female"
                                    checked={gender === "Female"}
                                    onChange={handleGenderChange}
                                    className="cp-modal-form-gender-female"
                                  />
                                  Female
                                </label>
                                <div className="cp-modal-patient-form-btns">
                                  <button
                                    className="cp-modal-patient-cancel-btn"
                                    onClick={handleAddNewPatientFlag}
                                  >
                                    cancel
                                  </button>
                                  <button
                                    className="cp-modal-patient-save-btn"
                                    onClick={handleSaveNewPatientData}
                                  >
                                    save
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <span
                                onClick={handleAddNewPatientFlag}
                                className="cp-modal-form-add-more-text"
                              >
                                <AiOutlineUserAdd className="cp-modal-form-add-user-icon" />
                                Add New Patient
                              </span>
                            )}
                          </div>
                        </div>
                        {patientErrorMessage && (
                          <span className="cp-modal-error-message">
                            {patientErrorMessage}
                          </span>
                        )}
                        <div className="cp-modal-patient-continue-btn-container">
                          <button
                            className="cp-modal-patient-continue-btn"
                            onClick={handleStepOneContinue}
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    )}
                    {modalStepperValue === 2 && (
                      <div>
                        <div className="cp-modal-address-details-info-sec">
                          <h3>Step 2: Select Address</h3>
                          <div className="cp-modal-patient-info-sub">
                            <p>
                              Our Medical Agent will visit this address to
                              collect samples
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    {modalStepperValue === 3 && <div>address</div>}
                  </div>
                </div>
              </div>
            </Modal>
          </>
        ) : (
          <div className="cp-empty-cart-main">
            <div className="cp-empty-cart-img">
              <img
                className="cp-empty-cart-image-main"
                alt="empty-cart"
                src={EmptyCartBanner}
              />
            </div>
            <div className="cp-empty-cart-img-label">
              Looks like you have no items in your cart yet.
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default memo(CartPage);
