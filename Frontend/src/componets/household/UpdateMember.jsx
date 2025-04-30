import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateMember = ({ memberId }) => {
    const [member, setMember] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMemberDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/api/member/${memberId}`);
                setMember(response.data.member);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching member details:', error);
                setLoading(false);
            }
        };

        if (memberId) {
            fetchMemberDetails();
        }
    }, [memberId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMember((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8070/api/members/update/${memberId}`, member);
            alert('Member updated successfully!');
        } catch (error) {
            console.error('Error updating member:', error.response?.data?.error || 'Update failed');
            alert('Failed to update member');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
                <div className="card-body p-4">
                    <h2 className="card-title text-center mb-4">Update Member</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="memberId"
                                value={member.memberId}
                                readOnly
                                placeholder="Member ID"
                            />
                            <label>Member ID (read-only)</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="fullName"
                                value={member.fullName || ''}
                                onChange={handleChange}
                                readOnly
                                placeholder="Full Name"
                            />
                            <label>Full Name</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="date"
                                className="form-control"
                                name="dateOfBirth"
                                value={member.dateOfBirth ? new Date(member.dateOfBirth).toISOString().substr(0, 10) : ''}
                                onChange={handleChange}
                                required
                                placeholder="Date of Birth"
                            />
                            <label>Date of Birth</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="contactNumber"
                                value={member.contactNumber || ''}
                                onChange={handleChange}
                                required
                                placeholder="Contact Number"
                            />
                            <label>Contact Number</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={member.email || ''}
                                onChange={handleChange}
                                required
                                placeholder="Email"
                            />
                            <label>Email</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="educationalLevel"
                                value={member.educationalLevel || ''}
                                onChange={handleChange}
                                required
                                placeholder="Educational Level"
                            />
                            <label>Educational Level</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="job"
                                value={member.job || ''}
                                onChange={handleChange}
                                placeholder="Job (optional)"
                            />
                            <label>Job (optional)</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control"
                                name="netIncome"
                                value={member.netIncome || ''}
                                onChange={handleChange}
                                placeholder="Net Income (optional)"
                            />
                            <label>Net Income (optional)</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="schoolName"
                                value={member.schoolName || ''}
                                onChange={handleChange}
                                placeholder="School Name (optional)"
                            />
                            <label>School Name (optional)</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="remarks"
                                value={member.remarks || ''}
                                onChange={handleChange}
                                placeholder="Remarks (optional)"
                            />
                            <label>Remarks (optional)</label>
                        </div>

                        <button type="button" className="btn btn-primary w-100" onClick={handleUpdate}>
                            Update Member
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateMember;
