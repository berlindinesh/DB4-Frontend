import React, { useState } from 'react';
import { Link } from 'react-router-dom';



const Sidebar = () => {
  const [openTab, setOpenTab] = useState(null);

  const toggleTab = (tab) => {
    setOpenTab((prev) => (prev === tab ? null : tab));
  };

  return (
        <div className="sidebar">
          {/* logo*/}
        <div className='company-header'>
          <img src='logo.png' alt='logo' className='company-logo' />
          <h2 className='company-name'> Db4 Clouds </h2>
          <hr/>
        </div>
        {/* sidebar*/}
      <div className="sidebar-item" onClick={() => toggleTab('dashboard')}>
        <span>Dashboard</span>
      </div>

      <div className="sidebar-item" onClick={() => toggleTab('employee')}>
        <span>Employee</span>
      </div>
      {openTab === 'employee' && (
        <div className="sub-menu">
          <Link to="/employee/profile">Profile</Link>
          <Link to="/employee/employees">employees</Link>
        </div>
      )}

      <div className="sidebar-item" onClick={() => toggleTab('attendance')}>
        <span>Attendance</span>
      </div>
      {openTab === 'attendance' && (
        <div className="sub-menu">
          <Link to="/attendance">View Attendance</Link>
        </div>      
      )}

      <div className="sidebar-item" onClick={() => toggleTab('Assets')}>
        <span>Assets</span>
      </div>
      {openTab === 'Assets' && (
        <div className="sub-menu">
          <Link to="/Assets/Dashboard">Dashboard</Link>
          <Link to="/Assets/AssetView">Asset View</Link>
          <Link to="/Assets/AssetHistory">Asset History</Link>
          <Link to="/Assets/AssetBatch">Asset Batch</Link>
        </div>
      )}

        <div className="sidebar-item" onClick={() => toggleTab('Helpdesk')}>
          <span>Helpdesk</span>
        </div>
        {openTab === 'Helpdesk' && (
          <div className="sub-menu">
            <Link to="/Helpdesk/FaqCategory">FAQ</Link>
            <Link to="/Helpdask/Tickets">Tickets</Link>            
          </div>
      )}

        <div className="sidebar-item" onClick={() => toggleTab('Configuration')}>
          <span>Configuration</span>
        </div>
        {openTab === 'Configuration' && (
          <div className="sub-menu">
            <Link to="/Configuration/Holidays">Holidays</Link>
            <Link to="/Configuration/CompanyLeaves">Company Leaves</Link>
            <Link to="/Configuration/RestrictLeaves">Restrict Leaves</Link>
          </div>
      )}
      
    </div>
  );
};

export default Sidebar;
