import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaHandHoldingHeart } from "react-icons/fa";
import "./cartpage.styles.css";

import EmptyCartBanner from "../../assets/images/microscope.png";
import { selectUserData } from "../../store/user/user.selector";

const CartPage = () => {
  const userData = useSelector(selectUserData);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <>
      <div className="cp-empty-cart-page-container">
        {isLoading ? (
          <div className="cp-cart-items-loading-container">Loading...</div>
        ) : cartItems &&
          cartItems.cartItems &&
          cartItems.cartItems.length > 0 ? (
          <div className="cp-cart-items-container">
            <div className="cp-cart-items-main">
              {cartItems.cartItems.map((item, index) => {
                return (
                  <div className="cp-cart-items-main-box">
                    <div className="cp-cart-items-box-container">
                      <FaHandHoldingHeart
                        size={25}
                        className="cp-cart-items-icon"
                      />
                      <div className="cp-cart-items-info-box">
                        <h3>{item.testName}</h3>
                        <div className="cp-cart-items-info-price-box">
                          <span className="cp-cart-items-info-price-symbol">
                            &#8377;
                          </span>
                          <p>{item.mrp}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="cp-cart-items-pricing-main"></div>
          </div>
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
