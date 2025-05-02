import React, { Component } from 'react';
import axios from 'axios';
import './Admin_Ticket.css';

const statuses = ['Open', 'In Progress', 'Closed'];

export default class AdminTickets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            adminEmail: 'admin@example.com', // Simulate admin user; replace with actual auth
            error: null
        };
    }

    componentDidMount() {
        this.fetchTickets();
    }

    fetchTickets = async () => {
        try {
            const response = await axios.get('http://localhost:8070/api/tickets', {
                headers: {
                    'user-email': this.state.adminEmail
                }
            });
            this.setState({ tickets: response.data, error: null });
        } catch (error) {
            console.error('Error fetching tickets:', error);
            this.setState({ error: 'Failed to fetch tickets. Please try again later.' });
        }
    };

    updateTicketStatus = async (ticketId, newStatus) => {
        try {
            await axios.put(`http://localhost:8070/api/tickets/${ticketId}`, { status: newStatus }, {
                headers: {
                    'user-email': this.state.adminEmail
                }
            });
            alert('Ticket status updated successfully.');
            this.fetchTickets(); // Refresh the ticket list
        } catch (error) {
            console.error('Error updating ticket status:', error);
            alert('Failed to update ticket status.');
        }
    };

    render() {
        const { tickets, error } = this.state;

        return (
            <div className="admin-tickets-container">
                <h3>Admin Ticket Management</h3>
                {error && <p className="error-message">{error}</p>}
                {tickets.length === 0 && !error ? (
                    <p className="no-tickets">No tickets found.</p>
                ) : (
                    <div className="tickets-list">
                        {tickets.map(ticket => (
                            <div key={ticket._id} className="ticket-card">
                                <div className="ticket-details">
                                    <p><strong>Name:</strong> {ticket.name}</p>
                                    <p><strong>Email:</strong> {ticket.email}</p>
                                    <p><strong>Category:</strong> {ticket.category}</p>
                                    <p><strong>Description:</strong> {ticket.description}</p>
                                    <p><strong>Created At:</strong> {new Date(ticket.createdAt).toLocaleDateString()}</p>
                                    <div className="status-section">
                                        <label>Status:</label>
                                        <select
                                            value={ticket.status}
                                            onChange={(e) => this.updateTicketStatus(ticket._id, e.target.value)}
                                            className="status-select"
                                        >
                                            {statuses.map(status => (
                                                <option key={status} value={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}