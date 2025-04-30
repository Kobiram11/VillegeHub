import React, { useState } from 'react';
import axios from 'axios';
import '../../Styles/houseStyles.css'; // Import the CSS styles
import ReportGenerator from './FamilyReportGenerator'; // Import the ReportGenerator component

const GetFamilyByRef = () => {
    const [familyRef, setFamilyRef] = useState('');
    const [family, setFamily] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8070/api/family/${familyRef}`);
            setFamily(response.data);
            setError(''); // Clear error message
        } catch (err) {
            setError('Family not found');
            setFamily(null); // Clear family data if an error occurs
        }
    };

    return (
        <div className="house-details-container">
            <h2 className="page-title">Search Family Details</h2>
            <div className="fetch-house-section">
                <form onSubmit={handleSubmit} className="family-search-form">
                    <input 
                        type="text" 
                        placeholder="Enter Family Reference Number"
                        value={familyRef} 
                        onChange={(e) => setFamilyRef(e.target.value)} 
                        required 
                        className="input-house-number"
                    />
                    <button type="submit" className="fetch-button">Search Family</button>
                </form>
            </div>

            {error && <p className="error-message">{error}</p>}

            {family && (
                <div className="family-details">
                    <h3 className="section-title">👪 Family Details</h3>
                    <p><strong>Family Reference:</strong> {family.familyRef}</p>
                    <p><strong>Number of Members:</strong> {family.noOfMembers}</p>
                    <p><strong>Head of Household Name:</strong> {family.headOfHouseholdName}</p>
                    <p><strong>Head of Household NIC:</strong> {family.headOfHouseholdNIC}</p>
                    <p><strong>Head of Household Contact:</strong> {family.headOfHouseholdContact}</p>
                    <p><strong>Head of Household Email:</strong> {family.headOfHouseholdEmail}</p>
                    <p><strong>Remarks:</strong> {family.headOfHouseholdRemarks || 'None'}</p>

                    <h4 className="members-title">Members</h4>
                    {family.members && family.members.length > 0 ? (
                        <ul className="members-list">
                            {family.members.map((member) => (
                                <li key={member.memberId} className="member-card">
                                    <p><strong>Member ID:</strong> {member.memberId}</p>
                                    <p><strong>Full Name:</strong> {member.fullName}</p>
                                    <p><strong>Date of Birth:</strong> {new Date(member.dateOfBirth).toLocaleDateString()}</p>
                                    <p><strong>Age:</strong> {member.age}</p>
                                    <p><strong>Gender:</strong> {member.gender}</p>
                                    <p><strong>Educational Level:</strong> {member.educationalLevel}</p>
                                    <p><strong>NIC:</strong> {member.NIC || 'Not provided'}</p>
                                    <p><strong>Contact Number:</strong> {member.contactNumber}</p>
                                    <p><strong>Email:</strong> {member.email}</p>
                                    <p><strong>Voting Eligibility:</strong> {member.votingEligibility}</p>
                                    <p><strong>Job:</strong> {member.job || 'Not applicable'}</p>
                                    <p><strong>School Name:</strong> {member.schoolName || 'Not applicable'}</p>
                                    <p><strong>Net Income:</strong> {member.netIncome ? `$${member.netIncome}` : 'Not applicable'}</p>
                                    <p><strong>Remarks:</strong> {member.remarks || 'None'}</p>
                                    <hr />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No members found for this family.</p>
                    )}

                    {/* Add the ReportGenerator component */}
                    <ReportGenerator family={family} />
                </div>
            )}
        </div>
    );
};

export default GetFamilyByRef;
