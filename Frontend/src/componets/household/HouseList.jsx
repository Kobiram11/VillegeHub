import React, { useState } from 'react';
import axios from 'axios';
import '../../Styles/houselist.css'; // Import external CSS

const HouseList = () => {
  const [houses, setHouses] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [confirmHouseNumber, setConfirmHouseNumber] = useState('');

  const fetchHouses = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8070/api/houses');
      setHouses(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteHouse = async (houseId) => {
    try {
      await axios.delete(`http://localhost:8070/api/houses/delete/${houseId}`);
      setHouses(houses.filter((house) => house._id !== houseId));
      setSelectedHouse(null);
      setConfirmHouseNumber('');
    } catch (err) {
      setError('Error deleting house: ' + err.message);
    }
  };

  const handleDelete = () => {
    if (confirmHouseNumber === selectedHouse.houseNumber) {
      deleteHouse(selectedHouse._id);
    } else {
      setError('House number does not match!');
    }
  };

  return (
    <div className="house-list-container">
      <h1>All Houses</h1>
      <button onClick={fetchHouses} className="fetch-button">
        Get All House Details
      </button>

      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      <ul className="house-list">
        {houses.map((house) => (
          <li key={house._id} className="house-item">
            <h2>🏡 House Number: {house.houseNumber}</h2>
            <p className ="line"><strong>Village ID:</strong> {house.villageID}</p>
            <p className ="line"><strong>Address:</strong> {house.address}</p>
            <p className ="line"><strong>Land Size:</strong> {house.landsize} sq ft</p>
            <p className ="line"><strong>Landmarks:</strong> {house.landmarks}</p>
            <p className ="line"><strong>Owner Name:</strong> {house.ownerName}</p>
            <p className ="line"><strong>Owner Contact:</strong> {house.ownerContact}</p>
            <p className ="line"><strong>Owner Email:</strong> {house.ownerEmail}</p>
            <p className ="line"><strong>Landline Telephone:</strong> {house.landlineTelephone || 'N/A'}</p>
            <p className ="line"><strong>Remarks:</strong> {house.remarks || 'No remarks'}</p>
            <p className ="line"><strong>Last Visited:</strong> {house.lastVisited ? new Date(house.lastVisited).toLocaleDateString() : 'Not visited yet'}</p>

            <h3>👪 Families in this House ({house.families.length}):</h3>
            {house.families.length > 0 ? (
              house.families.map((family, index) => (
                <div key={index} className="family-container">
                  <h4>Family {index + 1} (Ref: {family.familyRef})</h4>
                  <p className ="line"><strong>Head of Household:</strong> {family.headOfHouseholdName}</p>
                  <p className ="line"><strong>Head of Household NIC:</strong> {family.headOfHouseholdNIC}</p>
                  <p className ="line"><strong>Head of Household Contact:</strong> {family.headOfHouseholdContact}</p>
                  <p className ="line"><strong>Head of Household Email:</strong> {family.headOfHouseholdEmail}</p>
                  <p className ="line"><strong>Head of Household Remarks:</strong> {family.headOfHouseholdRemarks || 'No remarks'}</p>
                  <p className ="line"><strong>Number of Members:</strong> {family.noOfMembers}</p>

                  <h5>👤 Family Members:</h5>
                  {family.members.length > 0 ? (
                    family.members.map((member, i) => (
                      <div key={i} className="member-container">
                        <h6>Member {i + 1}</h6>
                        <p className ="line"><strong>Member ID:</strong> {member.memberId}</p>
                        <p className ="line"><strong>Member Name:</strong> {member.fullName}</p>
                        <p className ="line"><strong>Date of Birth:</strong> {new Date(member.dateOfBirth).toLocaleDateString()}</p>
                        <p className ="line"><strong>Age:</strong> {member.age}</p>
                        <p className ="line"><strong>Gender:</strong> {member.gender}</p>
                        <p className ="line"><strong>Contact:</strong> {member.contactNumber}</p>
                        <p className ="line"><strong>Email:</strong> {member.email}</p>
                        <p className ="line"><strong>Educational Level:</strong> {member.educationalLevel}</p>
                        <p className ="line"><strong>Voting Eligibility:</strong> {member.votingEligibility}</p>
                        <p className ="line"><strong>NIC:</strong> {member.NIC || 'N/A'}</p>
                        <p className ="line"><strong>Job:</strong> {member.job || 'N/A'}</p>
                        <p className ="line"><strong>Net Income:</strong> {member.netIncome ? `$${member.netIncome}` : 'N/A'}</p>
                        <p className ="line"><strong>School Name (for children):</strong> {member.schoolName || 'N/A'}</p>
                        <p className ="line"><strong>Remarks:</strong> {member.remarks || 'No remarks'}</p>
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

            <button onClick={() => setSelectedHouse(house)} className="delete-button">Delete House</button>
          </li>
        ))}
      </ul>

      {selectedHouse && (
        <div className="delete-confirmation">
          <h3>Confirm Deletion for House: {selectedHouse.houseNumber}</h3>
          <p>Please re-type the house number to confirm:</p>
          <input
            type="text"
            value={confirmHouseNumber}
            onChange={(e) => setConfirmHouseNumber(e.target.value)}
            placeholder="Re-type house number"
            className="confirm-input"
            aria-label="Re-type house number"
          />
          <button onClick={handleDelete} className="confirm-delete-button">
            Confirm Deletion
          </button>
          <button onClick={() => setSelectedHouse(null)} className="cancel-button">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default HouseList;
