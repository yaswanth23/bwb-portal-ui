import { memo, useEffect } from "react";
import "./cartpage.styles.css";

import EmptyCartBanner from "../../assets/images/microscope.png";

const CartPage = () => {
  useEffect(() => {
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
      </div>
    </>
  );
};

export default memo(CartPage);
