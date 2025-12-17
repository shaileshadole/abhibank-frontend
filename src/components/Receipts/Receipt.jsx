import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Receipt.css";

const Receipt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount, type, date } = location.state || {};

  if (!amount || !type) {
    return <p>Error: Receipt data not available.</p>;
  }

  const dt = new Date(date);
  const formattedDate = dt.toLocaleDateString("en-GB").slice(0, 8); // "08/06/25"
  const formattedTime = dt.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Determine the color class based on transaction type
  const transactionColorClass =
    type.toLowerCase() === "withdrawal" ? "red" : "green";

  return (
    <>
      <div className="receipt-container">
        <h1 className="bank-title">Abhi Bank</h1>
        <div className="receipt-row">
          <div className="label">DATE</div>
          <div className="value">{formattedDate}</div>
        </div>
        <div className="receipt-row">
          <div className="label">TIME</div>
          <div className="value">{formattedTime}</div>
        </div>
        <div className="receipt-row">
          <div className="label">CASH</div>
          <div className={`value ${transactionColorClass}`}>{type}</div>
        </div>
        <div className="receipt-row">
          <div className="label">AMOUNT</div>
          <div className={`value ${transactionColorClass}`}>₹{amount}</div>
        </div>
        <p className="footer">Thank you for banking with us.</p>
        <div className="receipt-home-button">
          {/* <Button name={"Home"} onClick={() => navigate("/")} /> */}
          <button onClick={() => navigate("/")}>Home</button>
        </div>
      </div>
    </>
  );
};

export default Receipt;
