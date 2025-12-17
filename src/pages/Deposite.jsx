import React, { useContext, useState } from "react";
import "./Withdraw.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../context/config";
import { AppContext } from "../context/AppContext";
import Loader from "../components/Loader";

const Deposit = () => {
  const [amount, setAmount] = useState();
  const { loading, setLoading } = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid positive amount.");
      return;
    }

    try {
      const res = await axios.patch(
        `${server}/users/deposit`,
        { amount: parsedAmount },
        { withCredentials: true }
      );

      alert(res.data.message);

      try {
        const res = await axios.post(
          `${server}/transactions/tcredit`,
          { amount: parsedAmount },
          { withCredentials: true }
        );

        // alert(res.data.message);
        setAmount("");

        //Navigate to Receipt
        navigate("/receipt", {
          state: {
            amount: parsedAmount,
            type: "deposited",
            date: new Date().toISOString(),
          },
        });
      } catch (err) {
        console.error(err);
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message); // Show backend error message
        } else {
          alert("Withdrawal failed. Please try again.");
        }
      }

      // navigate("/");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message); // Show backend error message
      } else {
        alert("Withdrawal failed. Please try again.");
      }
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="withdraw-container">
      <form onSubmit={handleSubmit}>
        <h3>DEPOSIT</h3>
        <div className="withdraw-input-field">
          <label htmlFor="amount"> Amount</label>
          <input
            id="amount"
            type="text"
            placeholder="Enter the amount"
            value={amount}
            maxLength={9}
            required
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="withdraw-submit-button">
          <button type="submit">Proceed</button>
        </div>
      </form>
    </div>
  );
};

export default Deposit;
