import React from 'react';
import KioskView from '../components/kiosk/KioskView';
import ToastContainer from '../components/common/ToastContainer';

export const Kiosk = () => (
  <div>
    <ToastContainer />
    <KioskView />
  </div>
);

export default Kiosk;
