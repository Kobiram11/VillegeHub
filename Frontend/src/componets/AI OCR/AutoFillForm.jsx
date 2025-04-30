import React from 'react';
import '../../Styles/AutoFillForm.css'; // Make sure to import the CSS file

const AutoFillForm = ({ formData, onChange, onSubmit }) => {
  return (
    <form className="auto-fill-form" onSubmit={onSubmit}>
      <h2>Auto Fill Form</h2>
      
      <div className="input-container">
        <label>Name:</label>
        <input
          className="input-field"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Enter your name"
        />
      </div>

      <div className="input-container">
        <label>NIC:</label>
        <input
          className="input-field"
          name="nic"
          value={formData.nic}
          onChange={onChange}
          placeholder="Enter your NIC"
        />
      </div>

      <div className="input-container">
        <label>DOB:</label>
        <input
          className="input-field"
          name="dob"
          value={formData.dob}
          onChange={onChange}
          placeholder="Enter your date of birth"
        />
      </div>

      <button className="submit-btn" type="submit">Submit</button>
    </form>
  );
};

export default AutoFillForm;
