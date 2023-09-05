import { memo, useState, useEffect } from "react";
import "./my-bookings.styles.css";

const MyBookingsPage = () => {
  return (
    <>
      <div className="m-bookings-container">
        <div className="m-bookings-main-header">
          <h3>All Bookings</h3>
        </div>
      </div>
    </>
  );
};

export default memo(MyBookingsPage);
