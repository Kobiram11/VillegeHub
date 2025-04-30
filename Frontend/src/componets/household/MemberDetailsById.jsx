// MemberDetailsById.js
import React, { useState } from 'react';
import axios from 'axios';
import '../../Styles/houseStyles.css'; // Import the CSS file
import UpdateMember from './UpdateMember'; // Adjust the path as necessary
import { PDFDownloadLink } from '@react-pdf/renderer'; // Import PDF download link
import MemberReport from './MemberReport'; // Import the MemberReport component

const MemberDetailsById = () => {
    const [memberId, setMemberId] = useState('');
    const [memberDetails, setMemberDetails] = useState(null);
    const [error, setError] = useState(null);

    const handleFetchMember = async () => {
        try {
            const response = await axios.get(`http://localhost:8070/api/member/${memberId}`);
            setMemberDetails(response.data);
            setError(null);
        } catch (err) {
            setError(err.response ? err.response.data.error : 'Error fetching member data');
            setMemberDetails(null);
        }
    };

    return (
        <div className="member-details-container">
            <h2 className="page-title">Search Member Details by ID</h2>
            <div className="fetch-house-section">
                <input
                    type="text"
                    placeholder="Enter Member ID"
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    className="input-house-number"
                />
                <button onClick={handleFetchMember} className="fetch-button">
                    Search Member
                </button>
            </div>

            {/* Display error if any */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Display member details */}
            {memberDetails && (
                <div className="member-details">
                    <h3 className="section-title">Member Details</h3>
                    <div className="member-card">
                        <p><strong>House Number:</strong> {memberDetails.house?.houseNumber || 'N/A'}</p>
                        <p><strong>Family Ref:</strong> {memberDetails.family?.familyRef || 'N/A'}</p>
                        <p><strong>Member Name:</strong> {memberDetails.member?.fullName || 'N/A'}</p>
                        <p><strong>Member ID:</strong> {memberDetails.member?.memberId || 'N/A'}</p>
                        <p><strong>Date of Birth:</strong> {memberDetails.member?.dateOfBirth ? new Date(memberDetails.member.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
                        <p><strong>Contact:</strong> {memberDetails.member?.contactNumber || 'N/A'}</p>
                        <p><strong>Email:</strong> {memberDetails.member?.email || 'N/A'}</p>
                        <p><strong>Educational Level:</strong> {memberDetails.member?.educationalLevel || 'N/A'}</p>
                        <p><strong>Voting Eligibility:</strong> {memberDetails.member?.votingEligibility ? 'Eligible' : 'Not Eligible'}</p>
                        <p><strong>NIC:</strong> {memberDetails.member?.NIC || 'N/A'}</p>
                        <p><strong>Job:</strong> {memberDetails.member?.job || 'N/A'}</p>
                        <p><strong>Net Income:</strong> {memberDetails.member?.netIncome ? `$${memberDetails.member.netIncome}` : 'N/A'}</p>
                        <p><strong>School Name:</strong> {memberDetails.member?.schoolName || 'N/A'}</p>
                        <p><strong>Remarks:</strong> {memberDetails.member?.remarks || 'No remarks'}</p>
                    </div>

                    {/* Render the UpdateMember component */}
                    <UpdateMember memberId={memberDetails.member.memberId} />

                    {/* PDF Download Link */}
                    <PDFDownloadLink
                        document={<MemberReport member={memberDetails.member} />}
                        fileName={`Member_Report_${memberDetails.member.memberId}.pdf`}
                    >
                        {({ loading }) =>
                            loading ? 'Generating PDF...' : 'Download Member Report'
                        }
                    </PDFDownloadLink>
                </div>
            )}
        </div>
    );
};

export default MemberDetailsById;
