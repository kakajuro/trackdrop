import React from "react";

import Spacer from "react-spacer";

import Logo from "./logo";

import "../styles/Navbar.scss";

export default function Navbar({ setAuth }) {
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth(false);
  };

  return (
    <nav className='navbar'>
      <div className='title-section'>
        <Spacer width='5px' />
        <Logo width='50px' height='50px' />
        <Spacer width='10px' />
        <h1 className='site-title'>trackdrop</h1>
      </div>
      <div className='end-section'>
        <button className='logout-button' onClick={(e) => logout(e)}>
          Sign Out
        </button>
      </div>
    </nav>
  );
}
