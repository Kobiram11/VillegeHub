import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateHouse = ({ houseData }) => {
    const [house, setHouse] = useState({});

    useEffect(() => {
        if (houseData) {
            setHouse(houseData); // Set the initial house data when the component mounts
        }
    }, [houseData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHouse((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8070/api/update/${house.houseNumber}`, house);
            alert('House updated successfully!');
        } catch (error) {
            console.error('Error updating house:', error.response?.data?.error || 'Update failed');
            alert('Failed to update house');
        }
    };

    // Check if house object is properly defined
    if (!house.houseNumber) {
        return <div>Loading...</div>; // You can show a loading state or a message if house data is not yet available
    }

    return (
        <div className="container mt-5">
  <div className="card shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
    <div className="card-body p-4">
      <h2 className="card-title text-center mb-4">Update House</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="houseNumber"
            value={house.houseNumber}
            readOnly
            placeholder="House Number"
          />
          <label>House Number (read-only)</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="address"
            value={house.address || ''} // Ensure value is always a string
            onChange={handleChange}
            required
            placeholder="Address"
          />
          <label>Address</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            name="landsize"
            value={house.landsize || ''} // Ensure value is always a string
            onChange={handleChange}
            required
            placeholder="Land Size"
          />
          <label>Land Size (in Perches)</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="landmarks"
            value={house.landmarks || ''} // Ensure value is always a string
            onChange={handleChange}
            required
            placeholder="Landmarks"
          />
          <label>Landmarks</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="remarks"
            value={house.remarks || ''} // Ensure value is always a string
            onChange={handleChange}
            placeholder="Remarks"
          />
          <label>Remarks</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            name="noOfFamilies"
            value={house.noOfFamilies || ''} // Ensure value is always a string
            onChange={handleChange}
            required
            placeholder="Number of Families"
          />
          <label>Number of Families</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="landlineTelephone"
            value={house.landlineTelephone || ''} // Ensure value is always a string
            onChange={handleChange}
            pattern="\d{10}"
            title="Please enter a valid 10-digit phone number."
            placeholder="Landline Telephone (optional)"
          />
          <label>Landline Telephone (optional)</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="ownerName"
            value={house.ownerName || ''} // Ensure value is always a string
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
            value={house.ownerContact || ''} // Ensure value is always a string
            onChange={handleChange}
            pattern="\d{10}"
            title="Please enter a valid 10-digit phone number."
            required
            placeholder="Owner Contact"
          />
          <label>Owner Contact</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            name="ownerEmail"
            value={house.ownerEmail || ''} // Ensure value is always a string
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
            value={house.lastVisited ? new Date(house.lastVisited).toISOString().substr(0, 10) : ''}
            onChange={handleChange}
            placeholder="Last Visited Date (optional)"
          />
          <label>Last Visited Date (optional)</label>
        </div>

        <button type="button" className="btn btn-primary w-100" onClick={handleUpdate}>
          Update House
        </button>
      </form>
    </div>
  </div>
</div>

    );
};

export default UpdateHouse;
