// src/components/HouseDetailsByNumber.js
import React, { useState } from 'react';
import axios from 'axios';
import '../../Styles/houseStyles.css';
import UpdateHouse from './UpdateHouse';
import ReportGenerator from './ReportGenerator'; // Import the ReportGenerator

const HouseDetailsByNumber = () => {
  const [houseNumber, setHouseNumber] = useState('');
  const [house, setHouse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchHouse = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8070/api/byNumber', {
        params: { houseNumber }
      });
      setHouse(response.data);
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Error fetching house data');
      setHouse(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHouse = async (houseId) => {
    if (window.confirm('Are you sure you want to delete this house?')) {
      try {
        await axios.delete(`http://localhost:8070/api/delete/${houseId}`);
        alert('House deleted successfully!');
        setHouse(null);
        setHouseNumber('');
      } catch (err) {
        setError(err.response ? err.response.data.error : 'Error deleting house');
      }
    }
  };

  return (
    <div className="house-details-container">
      <h2 className="page-title">Search House Details by Number</h2>
      <div className="fetch-house-section">
        <input
          type="text"
          placeholder="Enter House Number"
          value={houseNumber}
          onChange={(e) => setHouseNumber(e.target.value)}
          className="input-house-number"
        />
        <button onClick={handleFetchHouse} className="fetch-button">Search House</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {house && (
        <div className="house-details">
          <h3 className="section-title">House Details</h3>
          <div className="house-card">
            <p><strong>House Number:</strong> {house.houseNumber}</p>
            <p><strong>Village ID:</strong> {house.villageID}</p>
            <p><strong>Address:</strong> {house.address}</p>
            <p><strong>Land Size:</strong> {house.landsize} sq ft</p>
            <p><strong>Owner Name:</strong> {house.ownerName}</p>
            <p><strong>Owner Contact:</strong> {house.ownerContact}</p>
            <p><strong>Owner Email:</strong> {house.ownerEmail}</p>
            <p><strong>Landline Telephone:</strong> {house.landlineTelephone || 'N/A'}</p>
            <p><strong>Remarks:</strong> {house.remarks || 'No remarks'}</p>

            <button
              onClick={() => handleDeleteHouse(house.houseNumber)}
              className="delete-button"
              style={{ backgroundColor: 'red', color: 'white' }}
            >
              Delete House
            </button>
          </div>

          {/* Render families and members */}
          <h4 className="families-header">Families in this House:</h4>
          {house.families.length > 0 ? (
            house.families.map((family, index) => (
              <div key={index} className="family-card">
                <h5 className="family-title">Family {index + 1} (Ref: {family.familyRef})</h5>
                <p><strong>Head of Household:</strong> {family.headOfHouseholdName}</p>
                <p><strong>Head of Household NIC:</strong> {family.headOfHouseholdNIC}</p>
                <p><strong>Head of Household Contact:</strong> {family.headOfHouseholdContact}</p>
                <h6 className="members-header">Members:</h6>
                {family.members.length > 0 ? (
                  family.members.map((member, i) => (
                    <div key={i} className="member-card">
                      <p><strong>Member Name:</strong> {member.fullName}</p>
                      <p><strong>Member ID:</strong> {member.memberId}</p>
                      <p><strong>Age:</strong> {member.age}</p>
                      <p><strong>Gender:</strong> {member.gender}</p>
                    </div>
                  ))
                ) : (
                  <p>No members found for this family.</p>
                )}
              </div>
            ))
          ) : (
            <p>No families found for this house.</p>
          )}

          {/* Render the UpdateHouse component */}
          <UpdateHouse houseData={house} />

          {/* Render the PDF Report Generator */}
          <h4 className="families-header">Generate Report:</h4>
          <ReportGenerator house={house} />
        </div>
      )}
    </div>
  );
};

export default HouseDetailsByNumber;
