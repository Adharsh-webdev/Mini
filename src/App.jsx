import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home/Home';
import AccountCreateForm from './pages/AccountCreation/AccountCreateForm';
import Dashboard from './pages/Dashboard/Dashboard';
import UserDashBoard from './pages/UserDashBoard/userDashboard';
import History from './pages/History/History';
import Login from './pages/Login/Login';
import AccountSettings from './pages/Settings/UpdateForm';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { OrbitLoader } from 'react-loaderkit';

import BankLoader from "./components/BankLoader/BankLoader";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  if (loading) return <BankLoader />;
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<UserDashBoard />} />
          <Route path="history" element={<History />} />
          <Route path='settings' element={<AccountSettings />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/accountform' element={<AccountCreateForm />} />
      </Routes>
    </>
  )
};

const loaderStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#0f172a"
};

export default App;
