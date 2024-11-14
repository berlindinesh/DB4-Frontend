// Header.js
import React, { useState, useEffect } from 'react';
import './Header.css';
import { FaBell, FaCog } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';
import { MdLanguage } from 'react-icons/md';
 
const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
 
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
 
    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);
 
  return (
    <header className="header">
      <div className="header-left">
        <HiMenu className="menu-icon" />
        <span className="header-logo"></span>
      </div>
 
      <div className="header-center">
        <div className="time-display">{currentTime.toLocaleTimeString()}</div>
      </div>
 
      <div className="header-right">
        <FaCog className="header-icon" title="Settings" />
        <FaBell className="header-icon notification-icon" title="Notifications" />
        <MdLanguage className="header-icon" title="Language" />
        <div className="user-profile">
          <span className="user-initials">VV</span>
          <span className="user-name">Vitaliy</span>
        </div>
      </div>
    </header>
  );
};
 
export default Header;