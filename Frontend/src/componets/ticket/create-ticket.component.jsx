import React, { Component } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Styles/TicketStyle.css'; // Make sure this file uses the new class names

const categories = ['Technical', 'Billing', 'General', 'Support', 'Other'];

export default class NewTicketForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            address: '',
            phoneNumber: '',
            email: '',
            category: '',
            description: '',
            userEmail: 'user@example.com',
            isAuthenticated: false
        };
    }

    componentDidMount() {
        this.setState({ category: categories[0] });
        // Check authentication status from localStorage
        const token = localStorage.getItem('authToken');
        this.setState({ isAuthenticated: !!token });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.isAuthenticated) {
            toast.error('Please login to add tickets.', { position: 'top-right', autoClose: 3000 });
            return;
        }

        const ticket = { ...this.state };

        axios.post('http://localhost:8070/api/tickets', ticket, {
            headers: { 'user-email': this.state.userEmail }
        })
        .then(res => {
            toast.success('Ticket created successfully!', { position: 'top-right', autoClose: 3000 });
            this.setState({
                name: '',
                address: '',
                phoneNumber: '',
                email: '',
                category: categories[0],
                description: ''
            });
        })
        .catch(err => {
            toast.error('Failed to create ticket.', { position: 'top-right', autoClose: 3000 });
        });
    };

    render() {
        return (
            <div className="ticket-villeger-container">
                <ToastContainer />
                <h3 className="ticket-villeger-heading">Submit a Ticket</h3>
                {!this.state.isAuthenticated && (
                    <p style={{ color: 'red', fontWeight: 'bold' }}>
                        Please login to add tickets.
                    </p>
                )}
                <p className="ticket-villeger-subtext">Fill out the form below to raise a new ticket.</p>
                <form onSubmit={this.onSubmit}>
                    <div className="ticket-villeger-form-group">
                        <label>Name <span className="ticket-villeger-required">*</span></label>
                        <input
                            type="text"
                            name="name"
                            className="ticket-villeger-input"
                            placeholder="Enter your full name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            required
                            disabled={!this.state.isAuthenticated}
                        />
                    </div>

                    <div className="ticket-villeger-form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            name="address"
                            className="ticket-villeger-input"
                            placeholder="Enter your address"
                            value={this.state.address}
                            onChange={this.handleChange}
                            required
                            disabled={!this.state.isAuthenticated}
                        />
                    </div>

                    <div className="ticket-villeger-form-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            className="ticket-villeger-input"
                            placeholder="Enter your phone number"
                            value={this.state.phoneNumber}
                            onChange={this.handleChange}
                            required
                            disabled={!this.state.isAuthenticated}
                        />
                    </div>

                    <div className="ticket-villeger-form-group">
                        <label>Email Address <span className="ticket-villeger-required">*</span></label>
                        <input
                            type="email"
                            name="email"
                            className="ticket-villeger-input"
                            placeholder="Enter your email address"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                            disabled={!this.state.isAuthenticated}
                        />
                    </div>

                    <div className="ticket-villeger-form-group">
                        <label>Category <span className="ticket-villeger-required">*</span></label>
                        <select
                            name="category"
                            className="ticket-villeger-select"
                            value={this.state.category}
                            onChange={this.handleChange}
                            required
                            disabled={!this.state.isAuthenticated}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="ticket-villeger-form-group">
                        <label>Description <span className="ticket-villeger-required">*</span></label>
                        <textarea
                            name="description"
                            className="ticket-villeger-textarea"
                            placeholder="Please describe your issue or enquiry in detail"
                            rows="4"
                            maxLength="250"
                            value={this.state.description}
                            onChange={this.handleChange}
                            required
                            disabled={!this.state.isAuthenticated}
                        />
                    </div>

                    <div className="ticket-villeger-form-group">
                        <button type="submit" className="ticket-villeger-submit-btn" disabled={!this.state.isAuthenticated}>
                            Submit Ticket
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
