import React, { useContext, useEffect, useState } from "react";
import "./Withdraw.css";
import "./Login.css";
import "./CheckBalance.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../context/config";
import { AppContext } from "../context/AppContext";

const CheckBalance = () => {
  const [balance, setBalance] = useState();
  const { loading, setLoading } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchBalance = async () => {
      try {
        const res = await axios.get(`${server}/users/balance`, {
          withCredentials: true,
        });

        setBalance(res.data.balance);
      } catch (err) {
        console.error(err);
        alert("Failed to Fetch Balance");
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="login-container">
      <h3>Your Available Balance</h3>
      <h3>
        ₹{" "}
        <span className="check-balance-span">
          {balance !== null ? ` ${balance} ` : "Loading..."}
        </span>
      </h3>

      {/* <Button name={"Go to Home"} onClick={() => navigate("/")} /> */}
      <button className="checkbalance-button" onClick={() => navigate("/")}>
        Home
      </button>
    </div>
  );
};

export default CheckBalance;
