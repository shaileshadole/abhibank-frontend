import React from 'react';
import "./MainMenu.css";
import { Link } from 'react-router-dom';

const MainMenu = () => {
  return (
    <div className='main-menu-container'>
      <div>
        <Link to="/users/withdraw"><h4>Withdraw</h4></Link> 
        <Link to="/users/deposit"><h4>Deposit</h4></Link> 
        <Link to="/transactions/ministatement"><h4>Mini Statement</h4></Link> 
      </div>
      <div>
        <Link to="/users/change-pin" ><h4>Change PIN</h4></Link>
        <Link to="/users/check-balance" ><h4>Check Balance</h4></Link>
        <Link to="/transactions/fullhistory" ><h4>Email Statement</h4></Link>
      </div>
    </div>
  )
}

export default MainMenu;