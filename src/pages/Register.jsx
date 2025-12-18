import { useContext, useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../context/config";
import ATMNumber from "./ATMNumber";
import Loader from "../components/Loader";
import { AppContext } from "../context/AppContext";

const Register = () => {
  const [pin, setPin] = useState("");
  const [name, setName] = useState("");
  const [atmNumber, setAtmNumber] = useState(null);
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Client-side Validation
    const pinRegex = /^[0-9]{4}$/;
    if (!pinRegex.test(pin)) {
      alert("PIN Must be exactly 4 digits (numbers only).");
      return;
    }

    try {
      const res = await axios.post(
        `${server}/users/register`,
        { name, pin },
        { withCredentials: true }
      );

      if (res.data.success) {
        const atmRes = await axios.get(`${server}/users/atmNumber`, {
          withCredentials: true,
        });

        if (atmRes.data.success) {
          setAtmNumber(atmRes.data.atmNumber);
        } else {
          alert("Failed to fetch ATM Number");
        }
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Registration Failed!");
    }
  };

  // Conditional rendering after registration
  if (atmNumber) {
    return <ATMNumber name={name} atmNumber={atmNumber} />;
  }

  return loading ? (
    <Loader />
  ) : (
    <div className="register-container">
      <h2>Welcome To Abhi Bank</h2>
      <form onSubmit={handleSubmit}>
        <div className="register-input-field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter Your name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="register-input-field">
          <label htmlFor="pin">PIN</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your PIN"
            required
            onChange={(e) => setPin(e.target.value)}
          />
        </div>

        <div className="register-submit-button">
          {/* <Button name={"ADD"} type="submit" /> */}
          <button type="submit">ADD</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
