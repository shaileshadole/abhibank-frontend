import React, { useContext, useState } from "react";
import "./ChangePin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../context/config";
import { AppContext } from "../context/AppContext";
import Loader from "../components/Loader";

const ChangePin = () => {
  const [newPin, setNewPin] = useState();
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const { loading } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch(
        `${server}/users/change-pin`,
        {
          newPin: parseInt(newPin, 10),
        },
        {
          withCredentials: true,
        }
      );

      alert(res.data.message);
      setFlag(true);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "PIN did not changed");
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="changePin-container">
      <h1>Change Your PIN</h1>
      <form onSubmit={handleSubmit}>
        <div className="login-input-field">
          <label htmlFor="newPin">New Pin</label>
          <input
            type="password"
            placeholder="Enter your new Pin here"
            value={newPin}
            id="newPin"
            required
            maxLength={4}
            onChange={(e) => setNewPin(e.target.value)}
          />
        </div>

        {flag == false ? (
          <div className="login-submit-button">
            {/* <Button name={"Submit"} type="submit" /> */}
            <button type="submit">Submit</button>
          </div>
        ) : (
          <div className="login-submit-button">
            {/* <Button name={"Home"} onClick={() => navigate("/")} /> */}
            <button onClick={() => navigate("/")}>Home</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ChangePin;
