import React, { Component } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './retrieve_ticket.css';

const categories = ['Technical', 'Billing', 'General', 'Support', 'Other'];

export default class RetrieveTickets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            filteredTickets: [],
            userEmail: 'user@example.com', // Simulate logged-in user; replace with actual auth
            error: null,
            showModal: false,
            selectedTicket: null,
            formData: {
                name: '',
                address: '',
                phoneNumber: '',
                email: '',
                category: '',
                description: ''
            },
            searchQuery: ''
        };
    }

    componentDidMount() {
        this.fetchTickets();
    }

    fetchTickets = async () => {
        try {
            const response = await axios.get('http://localhost:8070/api/tickets', {
                headers: {
                    'user-email': this.state.userEmail
                }
            });
            this.setState({ tickets: response.data, filteredTickets: response.data, error: null });
        } catch (error) {
            console.error('Error fetching tickets:', error);
            this.setState({ error: 'Failed to fetch tickets. Please try again later.' });
        }
    };

    handleSearch = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        const { tickets } = this.state;
        const filteredTickets = tickets.filter(ticket =>
            ticket.name.toLowerCase().includes(searchQuery) ||
            ticket.email.toLowerCase().includes(searchQuery) ||
            ticket.category.toLowerCase().includes(searchQuery) ||
            ticket.description.toLowerCase().includes(searchQuery)
        );
        this.setState({ searchQuery, filteredTickets });
    };

    generatePDF = () => {
        const { filteredTickets } = this.state;
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('Your Tickets', 14, 22);

        const tableColumn = ["Name", "Email", "Category", "Description", "Status", "Created At"];
        const tableRows = [];

        filteredTickets.forEach(ticket => {
            const ticketData = [
                ticket.name,
                ticket.email,
                ticket.category,
                ticket.description,
                ticket.status,
                new Date(ticket.createdAt).toLocaleDateString()
            ];
            tableRows.push(ticketData);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 30,
            styles: { fontSize: 10 },
            headStyles: { fillColor: [31, 41, 55] },
            bodyStyles: { fillColor: [249, 250, 251] },
            alternateRowStyles: { fillColor: [255, 255, 255] }
        });

        doc.save('tickets.pdf');
    };

    openEditModal = (ticket) => {
        this.setState({
            showModal: true,
            selectedTicket: ticket,
            formData: {
                name: ticket.name,
                address: ticket.address,
                phoneNumber: ticket.phoneNumber,
                email: ticket.email,
                category: ticket.category,
                description: ticket.description
            }
        });
    };

    closeModal = () => {
        this.setState({
            showModal: false,
            selectedTicket: null,
            formData: {
                name: '',
                address: '',
                phoneNumber: '',
                email: '',
                category: '',
                description: ''
            }
        });
    };

    handleFormChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [name]: value
            }
        }));
    };

    updateTicket = async (e) => {
        e.preventDefault();
        const { selectedTicket, formData, userEmail } = this.state;

        try {
            await axios.put(`http://localhost:8070/api/tickets/${selectedTicket._id}`, formData, {
                headers: {
                    'user-email': userEmail
                }
            });
            toast.success('Ticket updated successfully!', {
                position: 'top-right',
                autoClose: 3000,
            });
            this.closeModal();
            this.fetchTickets();
        } catch (error) {
            console.error('Error updating ticket:', error);
            toast.error('Failed to update ticket.', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    deleteTicket = async (ticketId) => {
        toast(
            <div>
                <p>Are you sure you want to delete this ticket?</p>
                <button
                    className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                    onClick={async () => {
                        try {
                            await axios.delete(`http://localhost:8070/api/tickets/${ticketId}`, {
                                headers: {
                                    'user-email': this.state.userEmail
                                }
                            });
                            toast.dismiss(); // Dismiss the confirmation toast
                            toast.success('Ticket deleted successfully!', {
                                position: 'top-right',
                                autoClose: 3000,
                            });
                            this.fetchTickets();
                        } catch (error) {
                            console.error('Error deleting ticket:', error);
                            toast.dismiss(); // Dismiss the confirmation toast
                            toast.error('Failed to delete ticket.', {
                                position: 'top-right',
                                autoClose: 3000,
                            });
                        }
                    }}
                >
                    Confirm
                </button>
                <button
                    className="bg-gray-500 text-white px-2 py-1 rounded"
                    onClick={() => toast.dismiss()}
                >
                    Cancel
                </button>
            </div>,
            {
                position: 'top-center',
                autoClose: false,
                closeOnClick: false,
                draggable: false,
            }
        );
    };

    render() {
        const { filteredTickets, error, showModal, formData, searchQuery } = this.state;

        return (
            <div className="retrieve-tickets-container">
                <ToastContainer />
                <h3>Your Tickets</h3>
                <div className="controls">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search tickets..."
                        value={searchQuery}
                        onChange={this.handleSearch}
                    />
                    <button className="pdf-btn" onClick={this.generatePDF}>
                        Generate PDF
                    </button>
                </div>
                {error && <p className="error-message">{error}</p>}
                {filteredTickets.length === 0 && !error ? (
                    <p className="no-tickets">No tickets found.</p>
                ) : (
                    <table className="tickets-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTickets.map(ticket => (
                                <tr key={ticket._id}>
                                    <td>{ticket.name}</td>
                                    <td>{ticket.email}</td>
                                    <td>{ticket.category}</td>
                                    <td>{ticket.description}</td>
                                    <td>{ticket.status}</td>
                                    <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            className="action-btn update-btn"
                                            onClick={() => this.openEditModal(ticket)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="action-btn delete-btn"
                                            onClick={() => this.deleteTicket(ticket._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* Edit Modal */}
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h4>Edit Ticket Details</h4>
                            <form onSubmit={this.updateTicket}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={formData.name}
                                        onChange={this.handleFormChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        className="form-control"
                                        value={formData.address}
                                        onChange={this.handleFormChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        className="form-control"
                                        value={formData.phoneNumber}
                                        onChange={this.handleFormChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={this.handleFormChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <select
                                        name="category"
                                        className="form-control"
                                        value={formData.category}
                                        onChange={this.handleFormChange}
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        name="description"
                                        className="form-control"
                                        rows="3"
                                        maxLength="250"
                                        value={formData.description}
                                        onChange={this.handleFormChange}
                                        required
                                    ></textarea>
                                </div>
                                <div className="modal-actions">
                                    <button type="submit" className="btn-save">
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-cancel"
                                        onClick={this.closeModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}