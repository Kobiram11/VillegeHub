import React from 'react';

// Import components from the components folder
import Navbar from '../components/ticket/navbar.component';
import Sidebar from '../components/ticket/sidebar.component';
import Dashboard from '../components/ticket/dashboard.component';
import CreateUser from '../components/ticket/create-user.component';
import ManageUsers from '../components/ticket/manage-users.component';
import EditTicket from '../components/ticket/edit-ticket.component';
import ManageProjects from '../components/ticket/manage-projects.component';

const Ticket = () => {
    return (
        <div>
            {/* Navbar at the top */}
            <Navbar />

            <div style={{ display: 'flex' }}>
                {/* Sidebar on the left */}
                <Sidebar />
                
                {/* Main content area */}
                <div style={{ flex: 1, padding: '20px' }}>
                    <Dashboard />
                    <CreateUser />
                    <ManageUsers />
                    <ManageProjects />
                    <EditTicket />
                </div>
            </div>
        </div>
    );
};

export default Ticket;
