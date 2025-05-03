import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/houseStyles.css';

const AddFamily = () => {
    const [familyData, setFamilyData] = useState({
        houseNumber: '',
        familyRef: '',
        noOfMembers: 0,
        headOfHouseholdName: '',
        headOfHouseholdNIC: '',
        headOfHouseholdContact: '',
        headOfHouseholdEmail: '',
        headOfHouseholdRemarks: '',
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFamilyData({ ...familyData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Post family data to the backend
            await axios.post('http://localhost:8070/api/addFamily', familyData);
            
            // Show success alert
            window.alert('Family added successfully!');
            
            // Set the success message for UI display
            setMessage('Family added successfully!');
            
            // Reset the form fields
            setFamilyData({
                houseNumber: '',
                familyRef: '',
                noOfMembers: 0,
                headOfHouseholdName: '',
                headOfHouseholdNIC: '',
                headOfHouseholdContact: '',
                headOfHouseholdEmail: '',
                headOfHouseholdRemarks: '',
            });
    
            // Clear any previous errors
            setError('');
        } catch (error) {
            // Check if error response exists from backend
            if (error.response && error.response.data && error.response.data.error) {
                // Display the backend error message as an alert
                window.alert(error.response.data.error);
                
                // Set the error message for UI display
                setError(error.response.data.error);
            } else {
                // Fallback error message if backend doesn't provide a specific error
                window.alert('Error adding family. Please check your input and try again.');
                
                // Set a generic error message
                setError('Error adding family. Please check your input and try again.');
            }
        }
    }
    

    return (
        <div className="container mt-5">
  <div className="card shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
    <div className="card-body p-4">
      <h2 className="text-center mb-4">Add a New Family</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="houseNumber"
            value={familyData.houseNumber}
            onChange={handleChange}
            required
            placeholder="House Number"
          />
          <label>House Number</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="familyRef"
            value={familyData.familyRef}
            onChange={handleChange}
            required
            placeholder="Family Reference"
          />
          <label>Family Reference</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            name="noOfMembers"
            value={familyData.noOfMembers}
            onChange={handleChange}
            min="1"
            required
            placeholder="Number of Members"
          />
          <label>Number of Members</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="headOfHouseholdName"
            value={familyData.headOfHouseholdName}
            onChange={handleChange}
            required
            placeholder="Head of Household Name"
          />
          <label>Head of Household Name</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="headOfHouseholdNIC"
            value={familyData.headOfHouseholdNIC}
            onChange={handleChange}
            required
            placeholder="Head of Household NIC"
          />
          <label>Head of Household NIC</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="headOfHouseholdContact"
            value={familyData.headOfHouseholdContact}
            onChange={handleChange}
            required
            pattern="\d{10}"
            title="Please enter a valid 10-digit phone number."
            placeholder="Head of Household Contact"
          />
          <label>Head of Household Contact</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            name="headOfHouseholdEmail"
            value={familyData.headOfHouseholdEmail}
            onChange={handleChange}
            required
            placeholder="Head of Household Email"
          />
          <label>Head of Household Email</label>
        </div>

        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            name="headOfHouseholdRemarks"
            value={familyData.headOfHouseholdRemarks}
            onChange={handleChange}
            style={{ height: '100px' }}
            placeholder="Head of Household Remarks"
          ></textarea>
          <label>Head of Household Remarks</label>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>

        {message && <p className="text-success mt-3">{message}</p>}
        {error && <p className="text-danger mt-3">{error}</p>}
      </form>
    </div>
  </div>
</div>

    );
};

export default AddFamily;