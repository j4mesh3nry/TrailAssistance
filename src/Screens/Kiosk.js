import React from 'react';
import KioskView from '../components/kiosk/KioskView';
import DemoRoleSwitcher from '../components/common/DemoRoleSwitcher';
import ToastContainer from '../components/common/ToastContainer';

export const Kiosk = () => (
  <div>
    <ToastContainer />
    <DemoRoleSwitcher />
    <KioskView />
  </div>
);

export default Kiosk;
