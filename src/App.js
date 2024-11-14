import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './sidebar';
import Dashboard from './pages/Dashboard';
import Employee from './pages/Employee';
import Attendance from './pages/Attendance';
import Employees from './pages/Employees';
import Profile from './pages/Profile';
import AssetView from './pages/AssetView';
import AssetBatch from './pages/AssetBatch';
import Header from './Header';
import AssetHistory from './pages/AssetHistory';
import AssetDashboard from './pages/AssetDashboard';
import Holidays from './pages/Holidays';
import CompanyHolidays from './pages/CompanyHolidays';
import RestrictLeaves from './pages/RestrictLeaves';
import FaqCategory from './pages/FaqCategory';
import FaqPage from './pages/FaqPage';
import './Styles.css';
import './pages/AssetView.css';


function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        
        <div className="content">
        <Header />
          <Routes>          
            <Route path="/" element={<Dashboard />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/employee/profile" element={<Profile />} />
            <Route path="/employee/employees" element={<Employees />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/Assets/AssetView" element={<AssetView />} />
            <Route path="/Assets/AssetBatch" element={<AssetBatch />} />
            <Route path="/Assets/AssetHistory" element={<AssetHistory />} />
            <Route path="/Assets/Dashboard" element={<AssetDashboard />} />
            <Route path="/Configuration/Holidays" element={<Holidays />} />
            <Route path="/Configuration/CompanyLeaves" element={<CompanyHolidays />} />
            <Route path="/Configuration/RestrictLeaves" element={<RestrictLeaves />} />
            <Route path="/Helpdesk/FaqCategory" element={<FaqCategory />} />
            <Route path="/faq/:categoryId" element={FaqPage} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
