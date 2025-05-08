import { configureStore } from '@reduxjs/toolkit';
import DashboardSlice from './DashboardSlice.js';

const Store = configureStore({
  reducer: {
    dashboard: DashboardSlice,
  },
});

export default Store;
