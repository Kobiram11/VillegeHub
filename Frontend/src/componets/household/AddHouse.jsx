import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddHouse = () => {
    // State to store form data
    const [houseData, setHouseData] = useState({
        villageID: '',
        houseNumber: '',
        address: '',
        landsize: '',
        landmarks: '',
        remarks: '',
        noOfFamilies: '',
        landlineTelephone: '',
        ownerName: '',
        ownerContact: '',
        ownerEmail: '',
        lastVisited: '' // New field for last visited date
    });

    // State to store any errors
    const [error, setError] = useState('');

    // Handler for input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setHouseData({
            ...houseData,
            [name]: value
        });
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        // Validate form data
        if (!houseData.villageID || !houseData.houseNumber || !houseData.address ||
            !houseData.landsize || !houseData.landmarks || !houseData.remarks ||
            !houseData.noOfFamilies || !houseData.ownerName || !houseData.ownerContact || 
            !houseData.ownerEmail) {
            setError('All required fields must be provided.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8070/api/add', houseData);
            console.log('House added successfully:', response.data);
            // Show success notification
            toast.success('House added successfully!');

            // Reset form fields after successful submission
            setHouseData({
                villageID: '',
                houseNumber: '',
                address: '',
                landsize: '',
                landmarks: '',
                remarks: '',
                noOfFamilies: '',
                landlineTelephone: '',
                ownerName: '',
                ownerContact: '',
                ownerEmail: '',
                lastVisited: '' // Reset last visited date
            });
        } catch (error) {
            console.error('Error adding house:', error.response.data);
            setError(error.response.data.error || 'An error occurred while adding the house.');
            toast.error(error.response.data.error || 'An error occurred while adding the house.'); // Show error notification
        }
    };

    return (
        <div className="container mt-5">
            <ToastContainer /> {/* Add ToastContainer to your component */}
            <div className="card shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
                <div className="card-body p-4">
                    <h2 className="card-title text-center mb-4">Add House</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="villageID"
                                value={houseData.villageID}
                                onChange={handleChange}
                                required
                                placeholder="Village ID"
                            />
                            <label>Village ID</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="houseNumber"
                                value={houseData.houseNumber}
                                onChange={handleChange}
                                required
                                placeholder="House Number"
                            />
                            <label>House Number</label>
                        </div>

                        <div className="form-floating mb-3">
                            <textarea
                                className="form-control"
                                name="address"
                                value={houseData.address}
                                onChange={handleChange}
                                required
                                style={{ height: '100px' }}
                                placeholder="Address"
                            ></textarea>
                            <label>Address</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control"
                                name="landsize"
                                value={houseData.landsize}
                                onChange={handleChange}
                                min="1"
                                required
                                placeholder="Land Size (In Perches)"
                            />
                            <label>Land Size (In Perches)</label>
                        </div>

                        <div className="form-floating mb-3">
                            <textarea
                                className="form-control"
                                name="landmarks"
                                value={houseData.landmarks}
                                onChange={handleChange}
                                required
                                style={{ height: '80px' }}
                                placeholder="Landmarks"
                            ></textarea>
                            <label>Landmarks</label>
                        </div>

                        <div className="form-floating mb-3">
                            <textarea
                                className="form-control"
                                name="remarks"
                                value={houseData.remarks}
                                onChange={handleChange}
                                required
                                style={{ height: '80px' }}
                                placeholder="Remarks"
                            ></textarea>
                            <label>Remarks</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control"
                                name="noOfFamilies"
                                value={houseData.noOfFamilies}
                                onChange={handleChange}
                                required
                                min="1"
                                placeholder="Number of Families"
                            />
                            <label>Number of Families</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="landlineTelephone"
                                value={houseData.landlineTelephone}
                                onChange={handleChange}
                                placeholder="Landline Telephone (optional)"
                                maxLength={10}  // Restricts input to 10 characters
                               title="Please enter a valid 10-digit phone number."
                            />
                            <label>Landline Telephone (optional)</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="ownerName"
                                value={houseData.ownerName}
                                onChange={handleChange}
                                required
                                placeholder="Owner Name"
                            />
                            <label>Owner Name</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="ownerContact"
                                value={houseData.ownerContact}
                                onChange={handleChange}
                                required
                                placeholder="Owner Contact"
                                maxLength={10}  // Restricts input to 10 characters
                                inputMode="numeric"  // Ensures the keyboard is numeric on mobile devices
                                pattern="[0-9]*"  // Ensures only numbers are allowed
                            />
                            <label>Owner Contact</label>
                        </div>

                        

                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                name="ownerEmail"
                                value={houseData.ownerEmail}
                                onChange={handleChange}
                                required
                                placeholder="Owner Email"
                            />
                            <label>Owner Email</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="date"
                                className="form-control"
                                name="lastVisited"
                                value={houseData.lastVisited}
                                onChange={handleChange}
                                placeholder="Last Visited Date (optional)"
                            />
                            <label>Last Visited Date (optional)</label>
                        </div>

                        {error && <p className="text-danger">{error}</p>}

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">
                                Add House
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddHouse;
