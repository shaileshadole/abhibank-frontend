import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import "./ATMMachine.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

const ATMMachine = () => {
  return (
    <div className="atm-body">
      <div className="brand-header">/// ABHI BANK ///</div>
      <div className="screen-container">
        <div className="crt-screen">
          <div className="screen-content">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users/register" element={<Register />} /> 
                <Route path="/users/login" element={<Login />} /> 
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATMMachine;
