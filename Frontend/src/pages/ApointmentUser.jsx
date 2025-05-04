import React from 'react';
import NavVillager from '../componets/NavVillager';

import AppointmentUserInterface from '../componets/appointment/AppointmentUserInterface';

const Userappointment = () => {

    return (
        <div>
           <NavVillager/>
           <div style={{ marginTop: '80px' }}>
            <AppointmentUserInterface/>
            </div>
        </div>

);
};

export default Userappointment;