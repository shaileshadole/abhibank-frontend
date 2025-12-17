import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { server } from "../context/config";
import "./MiniStatement.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loader from "../components/Loader";

const MiniStatement = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(AppContext);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${server}/transactions/threehistory`, {
        withCredentials: true,
      });
      setData(res.data.threedata);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="passbook-container">
      <h3>Mini Statement</h3>
      <table className="passbook-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Amount (₹)</th>
            <th>Balance (₹)</th>
            <th>Type</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((txn, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{txn.amount}</td>
              <td>{txn.balance}</td>
              <td className={txn.isCredited ? "deposit" : "withdraw"}>
                {txn.isCredited ? "Deposit" : "Withdraw"}
              </td>
              <td>
                {new Date(txn.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                })}
              </td>
              <td>
                {new Date(txn.createdAt).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="register-submit-button">
        {/* <Button name="Home" onClick={() => navigate("/")} /> */}
        <button onClick={() => navigate("/")}>Home</button>
      </div>
    </div>
  );
};

export default MiniStatement;
