import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddMember = () => {
    const [memberData, setMemberData] = useState({
        houseNumber: '',
        familyRef: '',
        memberId: '',
        fullName: '',
        dateOfBirth: '',
        educationalLevel: '',
        gender: '',
        NIC: '',
        contactNumber: '',
        votingEligibility: 'Not Eligible', // default value should be a string
        email: '',
        remarks: '',
        netIncome: '',
        job: '',
        schoolName: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMemberData({ ...memberData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8070/api/addMember', memberData);
            setMessage('Member added successfully!');
            setMemberData({
                houseNumber: '',
                familyRef: '',
                memberId: '',
                fullName: '',
                dateOfBirth: '',
                educationalLevel: '',
                gender: '',
                NIC: '',
                contactNumber: '',
                votingEligibility: 'Not Eligible',
                email: '',
                remarks: '',
                netIncome: '',
                job: '',
                schoolName: '',
            });
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert('Error adding member. Please check your input and try again.');
            }
        }
    };

    return (
        <div className="container mt-5">
  <div className="card shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
    <div className="card-body p-4">
      <h2 className="card-title text-center mb-4">Add a New Member</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="houseNumber"
            name="houseNumber"
            value={memberData.houseNumber}
            onChange={handleChange}
            required
            placeholder="House Number"
          />
          <label htmlFor="houseNumber">House Number</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="familyRef"
            name="familyRef"
            value={memberData.familyRef}
            onChange={handleChange}
            required
            placeholder="Family Reference"
          />
          <label htmlFor="familyRef">Family Reference</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="memberId"
            name="memberId"
            value={memberData.memberId}
            onChange={handleChange}
            required
            placeholder="Member ID"
          />
          <label htmlFor="memberId">Member ID</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            value={memberData.fullName}
            onChange={handleChange}
            required
            placeholder="Full Name"
          />
          <label htmlFor="fullName">Full Name</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="date"
            className="form-control"
            id="dateOfBirth"
            name="dateOfBirth"
            value={memberData.dateOfBirth}
            onChange={handleChange}
            required
            placeholder="Date of Birth"
          />
          <label htmlFor="dateOfBirth">Date of Birth</label>
        </div>

        <div className="form-floating mb-3">
          <select
            className="form-select"
            id="gender"
            name="gender"
            value={memberData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <label htmlFor="gender">Gender</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="NIC"
            name="NIC"
            value={memberData.NIC}
            onChange={handleChange}
            placeholder="NIC"
          />
          <label htmlFor="NIC">NIC</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="contactNumber"
            name="contactNumber"
            value={memberData.contactNumber}
            onChange={handleChange}
            required
            pattern="\d{10}"
            title="Please enter a valid 10-digit phone number."
            placeholder="Contact Number"
          />
          <label htmlFor="contactNumber">Contact Number</label>
        </div>

        <div className="form-floating mb-3">
          <select
            className="form-select"
            id="votingEligibility"
            name="votingEligibility"
            value={memberData.votingEligibility}
            onChange={handleChange}
          >
            <option value="Eligible">Eligible</option>
            <option value="Not Eligible">Not Eligible</option>
          </select>
          <label htmlFor="votingEligibility">Voting Eligibility</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={memberData.email}
            onChange={handleChange}
            required
            placeholder="Email"
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="job"
            name="job"
            value={memberData.job}
            onChange={handleChange}
            placeholder="Job"
          />
          <label htmlFor="job">Job</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="netIncome"
            name="netIncome"
            value={memberData.netIncome}
            onChange={handleChange}
            min="1"
            placeholder="Net Income"
          />
          <label htmlFor="netIncome">Net Income</label>
        </div>

        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            id="educationalLevel"
            name="educationalLevel"
            value={memberData.educationalLevel}
            onChange={handleChange}
            required
            rows="3"
            placeholder="Educational Level"
          ></textarea>
          <label htmlFor="educationalLevel">Educational Level</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="schoolName"
            name="schoolName"
            value={memberData.schoolName}
            onChange={handleChange}
            placeholder="School Name"
          />
          <label htmlFor="schoolName">School Name</label>
        </div>

        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            id="remarks"
            name="remarks"
            value={memberData.remarks}
            onChange={handleChange}
            rows="3"
            placeholder="Remarks"
          ></textarea>
          <label htmlFor="remarks">Remarks</label>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>

        {message && <p className="text-success mt-3">{message}</p>}
        
      </form>
    </div>
  </div>
</div>

      
    );
};

export default AddMember;