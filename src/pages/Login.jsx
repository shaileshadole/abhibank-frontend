import React, { useContext, useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../context/config";
import { AppContext } from "../context/AppContext";
import Loader from "../components/Loader";

const Login = () => {
  const [atmNumber, setAtmNumber] = useState("");
  const [pin, setPin] = useState("");
  const navigate = useNavigate();

  const { loading, setLoading } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Simple Validation: Check if Pin is 4 digits
    const pinRegex = /^[0-9]{4}$/;
    if (!pinRegex.test(pin)) {
      alert("PIN must be exactly 4 digits.");
      return;
    }

    // Simple validation: Check if ATM number is 16 digits
    const atmRegex = /^[0-9]{16}$/;
    if (!atmRegex.test(atmNumber)) {
      alert("ATM number must be exactly 16 digits.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${server}/users/login`,
        { atmNumber, pin: parseInt(pin, 10) },
        { withCredentials: true }
      );

      alert(res.data.message);

      // Optionally redirect to another page here (e.g., PIN screen)
      navigate("/users/main-menu");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
          "ATM number does not exist or login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="login-container">
      <h3>Welcome To Abhi Bank</h3>
      <form onSubmit={handleSubmit}>
        <div className="login-input-field">
          <label htmlFor="atmNumber">ATM Number</label>
          <input
            type="text"
            id="atmNumber"
            placeholder="Enter your 16-digit ATM number"
            value={atmNumber}
            maxLength="16"
            required
            onChange={(e) => setAtmNumber(e.target.value)}
          />
        </div>

        <div className="login-input-field">
          <label htmlFor="pin">PIN</label>
          <input
            type="password"
            id="pin"
            placeholder="Enter your 14-digit PIN"
            value={pin}
            maxLength="4"
            required
            onChange={(e) => setPin(e.target.value)}
          />
        </div>

        <div className="login-submit-button">
          {/* <Button name="Proceed" type="submit" disabled={loading} /> */}
          <button type="submit">Proceed</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
