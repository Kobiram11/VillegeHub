import React from 'react';
import NavVillager from '../componets/NavVillager';

import CreateTicket from '../componets/ticket/create-ticket.component';

const TicketVill = () => {

    return (
        <div>
            <NavVillager/>
            <div style={{ marginTop: '80px' }}>
            <CreateTicket/>
            </div>
        </div>

);
};

export default TicketVill;