import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HeroPage, Login, VerifyEmail } from './components';
import { dashboardMenuState } from './app/DashboardSlice';
import { isUserLoggedIn } from './app/DashboardSlice';

import NavBar from './components/protected/Dashboard/NavBar';
import Sidebar from './components/utils/Sidebar';
import Dashboard from './components/protected/Dashboard/Dashboard';

const RoutesConfig = () => {
  const isLoggedIn = useSelector(isUserLoggedIn);
  const ifDMenuState = useSelector(dashboardMenuState);
  if (!isLoggedIn) {
    return (
      <Routes>
        <Route
          path="/"
          key={'home'}
          className="transition-all scrollbar-hide"
          element={[<HeroPage key={'HeroPage'} />]}
        />
        <Route
          path="/login"
          className="transition-all scrollbar-hide"
          element={[<Login />]}
        />
        <Route
          path="/verify-email"
          className="transition-all scrollbar-hide"
          element={[<VerifyEmail />]}
        />
      </Routes>
    );
  } else {
    return (
      <div
        className={`w-full h-[100vh] bg-[#121212] flex flex-col overflow-y-auto scrollbar-hide`}
      >
        <Sidebar isOpen={ifDMenuState} />
        <NavBar />
        <div className={`${ifDMenuState && 'pl-[4rem]'} `}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <div className="bg-gray-900 b-2 pr-2 text-sm pb-1 flex justify-end items-center">
            <p className="text-white">
              Designed and Developed with ❤️ by{' '}
              <a
                href="https://hareshkurade.netlify.app"
                className="text-green-400"
              >
                quikfrontend
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default RoutesConfig;
