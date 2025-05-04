import React from 'react';

import ViewAppointments from '../componets/appointment/AppointmentForm';
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
