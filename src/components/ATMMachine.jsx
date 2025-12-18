import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ChangePin from "../pages/ChangePin";
import CheckBalance from "../pages/CheckBalance";
import Deposite from "../pages/Deposite";
import Withdraw from "../pages/Withdraw";
import MainMenu from "../pages/MainMenu";
import Receipt from "../components/Receipts/Receipt";
import MiniStatement from "../pages/MiniStatement";
import FullStatement from "../pages/FullStatement";


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
                <Route path="/users/change-pin" element={<ChangePin />} />
                <Route path="/users/check-balance" element={<CheckBalance />} />
                <Route path="/users/deposit" element={<Deposite />} />
                <Route path="/users/withdraw" element={<Withdraw />} />
                <Route path="/users/main-menu" element={<MainMenu />} />
                <Route path="/transactions/ministatement" element={<MiniStatement />} />
                <Route path="/transactions/fullstatement" element={<FullStatement />} />
                <Route path="/receipt" element={<Receipt />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATMMachine;
