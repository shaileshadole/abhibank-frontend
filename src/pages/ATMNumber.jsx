import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ATMNumber.css";
import { FaCopy } from "react-icons/fa6";

const ATMNumber = ({ name, atmNumber }) => {
  const navigate = useNavigate();
  const [count, setCount] = new useState(60);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(atmNumber);
    alert("ATM Number copied to clipboard!");
  };

  //Auto-redirect after 60 seconds
  useEffect(() => {
      const timer = setTimeout(() => {
          navigate("/");
      }, 60000);

      return () => clearTimeout(timer);
  }, [navigate]);

  //Use this to update seconds
  useEffect(() => {
    //Stop when count reches 0
    if (count === 0) return;

    const timer2 = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    // Clean up the interval on unmount or before next effect run
    return () => clearInterval(timer2);
  }, [count]); // Dependency on count to re-run when count changes

  return (
    <div className="aTMNumber-container">
      <h3>🎉 Registration Successful!</h3>
      <p>
        Welcome, <strong>{name}</strong>
      </p>
      <p>Your ATM Number is: </p>
      <div className="aTMNumber-atm-number-box">
        {atmNumber}{" "}
        <FaCopy
          onClick={copyToClipboard}
          className="aTMNumber-container-copy-icon"
        />
      </div>

      <button onClick={() => navigate("/")}>Go to Home</button>

      <p>
        <span>
          You will be redirected to the home page in {count} seconds...
        </span>
      </p>
    </div>
  );
};

export default ATMNumber;
