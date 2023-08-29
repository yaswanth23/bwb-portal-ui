import { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaHandHoldingHeart } from "react-icons/fa";
import { BsPersonPlus } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlineUserAdd, AiOutlineEdit } from "react-icons/ai";
import Modal from "react-modal";
import "./cartpage.styles.css";

import EmptyCartBanner from "../../assets/images/microscope.png";
import { storeCartCount } from "../../store/cart/cart.action";
import { selectUserData } from "../../store/user/user.selector";

const CartPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [address, setAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleAddMore = () => {
    if (name && age && gender) {
      if (editIndex === -1) {
        const newEntry = { name, age, gender };
        setFormData([...formData, newEntry]);
      } else {
        const updatedData = [...formData];
        updatedData[editIndex] = { name, age, gender };
        setFormData(updatedData);
        setEditIndex(-1);
      }
      setName("");
      setAge("");
      setGender("");
    } else {
      alert("Please enter all the fields name, age and gender.");
    }
  };

  const handleEdit = (index) => {
    const entryToEdit = formData[index];
    setName(entryToEdit.name);
    setAge(entryToEdit.age);
    setGender(entryToEdit.gender);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedData = [...formData];
    updatedData.splice(index, 1);
    setFormData(updatedData);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleMobileNumberChange = (event) => {
    const newMobileNumber = +event.target.value;
    if (!isNaN(newMobileNumber)) {
      if (newMobileNumber.toString().length <= 10) {
        setMobileNumber(newMobileNumber.toString());
      }
    }
  };

  const handlePincodeChange = (event) => {
    const newPincode = +event.target.value;
    if (!isNaN(newPincode)) {
      if (newPincode.toString().length <= 6) {
        setPincode(newPincode.toString());
      }
    }
  };

  const confirmBookingHandler = () => {
    if (
      mobileNumber &&
      mobileNumber !== 0 &&
      pincode &&
      pincode !== 0 &&
      address &&
      address !== ""
    ) {
      setErrorMessage("");
      const requestData = {
        userId: userData.userId,
        cartId: userData.cartId,
        cartItems: cartItems.cartItems,
        patientDetails: formData,
        address: address,
        mobileNumber: mobileNumber,
        pincode: pincode,
        totalPrice: cartItems.totalPrice,
      };

      fetch(
        "https://qar5m2k5ra.execute-api.ap-south-1.amazonaws.com/dev/api/v1/booking/diagnostics",
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
          dispatch(storeCartCount(userData.userId, userData.cartId));
          setCartItems([]);
          setModalIsOpen(false);
          setFormData([]);
          setName("");
          setAge("");
          setGender("");
          setAddress("");
          setMobileNumber("");
          setPincode("");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      let error = "";
      if (!pincode) {
        error = "Pincode";
      }
      if (!mobileNumber) {
        error = "Mobile Number";
      }
      if (address == "") {
        error = "Address";
      }
      setErrorMessage(`Please enter ${error}`);
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
                {cartItems.cartItems.map((item, index) => {
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
                        <div className="cp-cart-items-info-patient-box">
                          <BsPersonPlus className="cp-cart-items-info-patient-box-ap-icon" />
                          <p>{formData?.length}</p>
                          <p>{formData?.length > 1 ? "Patients" : "Patient"}</p>
                        </div>
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
                  <h3>Patient Details</h3>
                  <MdOutlineCancel
                    className="cp-modal-cancel-icon"
                    onClick={closeModal}
                  />
                </div>
                <div className="cp-modal-form-container">
                  <form>
                    {formData.map((entry, index) => (
                      <div key={index} className="cp-modal-form-data-disp">
                        <div>
                          <p>{entry.name}</p>
                          <p>
                            {entry.age}, {entry.gender}
                          </p>
                        </div>
                        <div className="cp-modal-form-update-items">
                          <span
                            className="cp-modal-form-edit-icon"
                            onClick={() => handleEdit(index)}
                          >
                            Edit
                          </span>
                          <RiDeleteBin6Line
                            className="cp-modal-form-remove-icon"
                            onClick={() => handleDelete(index)}
                          />
                        </div>
                      </div>
                    ))}
                    <div className="cp-modal-input-container">
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
                      <div className="cp-modal-form-add-more-sec">
                        <span
                          onClick={handleAddMore}
                          className="cp-modal-form-add-more-text"
                        >
                          {editIndex === -1 ? (
                            <>
                              <AiOutlineUserAdd className="cp-modal-form-add-user-icon" />
                              Add New Patient
                            </>
                          ) : (
                            <>
                              <AiOutlineEdit className="cp-modal-form-update-user-icon" />
                              Update Details
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
                {formData?.length > 0 && (
                  <>
                    <div className="cp-modal-address-container">
                      <textarea
                        placeholder="Address"
                        value={address}
                        onChange={handleAddressChange}
                        required
                        className="cp-modal-form-textarea"
                        rows={4}
                        cols={50}
                      />
                    </div>
                    <div className="cp-modal-pincode-container">
                      <input
                        type="text"
                        placeholder="Mobile Number"
                        value={mobileNumber == 0 ? "" : mobileNumber}
                        required
                        onChange={handleMobileNumberChange}
                        className="cp-modal-form-add-input"
                      />
                      <input
                        type="text"
                        placeholder="Pincode"
                        value={pincode == 0 ? "" : pincode}
                        required
                        onChange={handlePincodeChange}
                        className="cp-modal-form-add-input"
                      />
                    </div>
                    {errorMessage && (
                      <span className="cp-modal-error-message">
                        {errorMessage}
                      </span>
                    )}
                    <div className="cp-modal-confirm-booking-container">
                      <button
                        className="cp-modal-confirm-booking-button"
                        onClick={confirmBookingHandler}
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </>
                )}
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
