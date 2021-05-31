import React, { useState } from "react";

import { BsSearch } from 'react-icons/bs';
import Spacer from "react-spacer";

import Logo from "./logo";

import "../styles/Navbar.scss";

export default function Navbar({ setAuth }) {
  const [search, setSearch] = useState('');

  const navLinkSpacing = 100;

  const handleSearch = (e) => {
    e.preventDefault();

    console.log(search);
  }

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
        <div className='logo'>
          <Logo width='50px' height='50px' />
        </div>
        <Spacer width='10px' />
        <h1 className='site-title'>trackdrop</h1>
      </div>
      <div className='main-section'>
        <div className='nav-link-section'>
          <h3 className="nav-link-txt">Home</h3>
          <Spacer width={`${navLinkSpacing}px`}/>
        </div>
        <div className='nav-link-section'>
          <h3 className="nav-link-txt">Explore</h3>
          <Spacer width={`${navLinkSpacing}px`}/>
        </div>
        <div className='nav-link-section'>
          <h3 className="nav-link-txt">New</h3>
          <Spacer width={`${navLinkSpacing}px`}/>
        </div>
      </div>
      <div className='end-section'>
        <div className='searcharea'>
          <Spacer height='3px'/>
          <form onSubmit={e => handleSearch(e)}>
            <input
              className='searchbar'
              autoComplete='off'
              type='text'
              name='text'
              value={search}
              placeholder='Search...'
              onChange={e => setSearch(e.target.value)}
              />
          </form>
        </div>
        <Spacer width='50px' />
        <p>*USERICONHERE*</p>
      </div>
    </nav>
  );
}
