import React, { Component } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Styles/TicketStyle.css';

const categories = ['Technical', 'Billing', 'General', 'Support', 'Other'];

export default class NewTicketForm extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            address: '',
            phoneNumber: '',
            email: '',
            category: '',
            description: '',
            userEmail: 'user@example.com' // Simulate logged-in user; replace with actual auth
        };
    }

    componentDidMount() {
        this.setState({
            category: categories[0]
        });
    }

    onChangeName(e) {
        this.setState({ name: e.target.value });
    }

    onChangeAddress(e) {
        this.setState({ address: e.target.value });
    }

    onChangePhoneNumber(e) {
        this.setState({ phoneNumber: e.target.value });
    }

    onChangeEmail(e) {
        this.setState({ email: e.target.value });
    }

    onChangeCategory(e) {
        this.setState({ category: e.target.value });
    }

    onChangeDescription(e) {
        this.setState({ description: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const ticket = {
            name: this.state.name,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            category: this.state.category,
            description: this.state.description
        };

        axios.post('http://localhost:8070/api/tickets', ticket, {
            headers: {
                'user-email': this.state.userEmail
            }
        })
            .then(res => {
                console.log(res.data);
                toast.success('Ticket created successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                });
                this.setState({
                    name: '',
                    address: '',
                    phoneNumber: '',
                    email: '',
                    category: categories[0],
                    description: ''
                });
            })
            .catch(error => {
                console.error('Error creating ticket:', error);
                toast.error('Failed to create ticket.', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            });
    }

    render() {
        return (
            <div className="ticket-form-container">
                <ToastContainer />
                <h3>Submit a Ticket</h3>
                <p>Fill out the form below to raise a new ticket.</p>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name <span className="required">*</span></label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your full name"
                            value={this.state.name}
                            onChange={this.onChangeName}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your address"
                            value={this.state.address}
                            onChange={this.onChangeAddress}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            className="form-control"
                            placeholder="Enter your phone number"
                            value={this.state.phoneNumber}
                            onChange={this.onChangePhoneNumber}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address <span className="required">*</span></label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email address"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Category <span className="required">*</span></label>
                        <select
                            className="form-control"
                            value={this.state.category}
                            onChange={this.onChangeCategory}
                        >
                            <option value="" disabled>Select issue category</option>
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description <span className="required">*</span></label>
                        <textarea
                            className="form-control"
                            placeholder="Please describe your issue or enquiry in detail"
                            rows="4"
                            maxLength="250"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn-submit">
                            Submit Ticket
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}