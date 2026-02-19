import React from 'react'
import './Dashboard.css'
import Sidebar from '../../components/Sidebar/Sidebar'

import { Outlet } from 'react-router-dom'


const Dashboard = () => {
  return (
    <>
      <div className="dash-container">
        <div className="side">
          <Sidebar />

        </div>
        <div className="outlet">
          <Outlet />

        </div>

      </div>
    </>
  )
}

export default Dashboard;
