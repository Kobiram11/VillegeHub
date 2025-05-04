import React from 'react';
import NavVillager from '../componets/NavVillager';

import CreateTicket from '../componets/ticket/create-ticket.component';
import RetrieveTickets from '../componets/ticket/retrieve_ticket'

const TicketVill = () => {

    return (
        <div>
            <NavVillager/>
            <div style={{ marginTop: '80px' }}>
            <CreateTicket/>
            <RetrieveTickets/>
            </div>
        </div>

);
};

export default TicketVill;