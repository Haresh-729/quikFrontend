import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  dashboardFeature,
  dashboardMenuState,
  setCloseDMenu,
  setDFeature,
} from '../../app/DashboardSlice.js';
import { features } from '../data/dynamic.js';
import { useNavigate } from 'react-router-dom';

import { Feather, X } from 'lucide-react';

const Sidebar = ({ isOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const ifDMenuState = useSelector(dashboardMenuState);
  const dashboardFeatures = useSelector(dashboardFeature);

  const onCartToggler = () => {
    dispatch(setCloseDMenu({ dashboardMenuState: !ifDMenuState }));
  };

  return (
    <div
      className={`
        fixed h-full
        ${isOpen ? 'visible' : 'invisible'}
        transition-all duration-300 ease-in-out
        ${isHovered ? 'w-64' : 'w-16'}
        bg-[#1A2F23] text-white
        flex flex-col gap-4
        shadow-lg z-50
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <X
        className={`absolute right-2 top-2 w-6 h-6 cursor-pointer text-white hover:text-yellow ${
          isHovered ? 'opacity-100' : 'opacity-0 w-0'
        }`}
        onClick={onCartToggler}
      />
      <div className="flex flex-row gap-2 items-center mb-4 pt-3 px-2">
        <Feather className="w-[2rem] sm:w-[2.5rem]" />
        <p
          className={`h-[1.8rem] ${
            isHovered ? 'opacity-100' : 'opacity-0 w-0'
          }`}
          alt="logo"
        >
          quikfrontend
        </p>
      </div>
      <div className="flex flex-col gap-2 px-2">
        {features.map((item, index) => (
          <div
            key={index}
            className={`flex items-center cursor-pointer rounded-xl transition-all duration-200
                ${isHovered ? 'px-4' : ' px-2'}
                 h-12 ${
                   dashboardFeatures == item.featureName
                     ? 'bg-yellow text-green-700'
                     : 'hover:bg-yellow/20 bg-none text-white'
                 }`}
            onClick={() => {
              dispatch(setDFeature({ dashboardFeature: item.featureName }));
              navigate(item.route);
            }}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <item.logoUsed
                className={`w-6 h-6 ${
                  dashboardFeatures == item.featureName ? '' : 'text-white'
                } `}
              />
            </div>
            <span
              className={`ml-4 whitespace-nowrap font-medium transition-opacity duration-200 ${
                isHovered ? 'opacity-100' : 'opacity-0 w-0'
              }`}
            >
              {item.displayName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
