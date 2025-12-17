import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { server } from "../context/config";
import "./FullStatement.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loader from "../components/Loader";

const FullStatement = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [zal, setZal] = useState(false);
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(AppContext);

  const fetchEmail = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${server}/users/myprofile`, {
        withCredentials: true,
      });

      if (res.data.email) {
        setEmail(res.data.email);
        console.log("Email set Successfully");
        console.log(res.data.email);
      }
    } catch (err) {
      console.error(err);
    }finally{
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmail();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setZal(true);
    setLoading(true);

    try {
      const res = await axios.post(
        `${server}/transactions/fullhistory`,
        {
          email,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setMessage("📧 Full statement has been sent to your email!");
      } else {
        setMessage("❌ Failed to send email. Try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ An error occurred while sending the email.");
    } finally {
        setLoading(false);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="fullstatement-container">
      <h3>Get Your Full StateMent On Your Email</h3>
      <form onSubmit={handleSubmit}>
        <div className="login-input-field">
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {zal ? (
          <div className="login-submit-button">
            {/* <Button name="Home" onClick={() => navigate("/")} /> */}
            <button onClick={() => navigate("/")}>Home</button>
          </div>
        ) : (
          <div className="login-submit-button">
            {/* <Button name="Send" type="submit" /> */}
            <button type="submit">Send</button>
          </div>
        )}

        {message && <p className="status-message">{message}</p>}
      </form>
    </div>
  );
};

export default FullStatement;
