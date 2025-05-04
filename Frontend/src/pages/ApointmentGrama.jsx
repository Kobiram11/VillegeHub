import React from 'react';

import ViewAppointments from '../componets/appointment/AppointmentDetails';
import NavBar from '../componets/Navbar';

const Detailsappointment = () => {
  return (
    <div>
      <NavBar />
      <div style={{ marginTop: '80px' }}>
        <ViewAppointments />
      </div>
    </div>
  );
};

export default Detailsappointment;
