import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';  // Import Toast components
import 'react-toastify/dist/ReactToastify.css';          // Import Toast CSS
import '../../Styles/procedures.css';

const CreateProcedure = () => {
  const [serviceName, setServiceName] = useState('');  // State for service name
  const [serviceDetail, setServiceDetail] = useState('');  // State for service details

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent page reload on form submission
    try {
      // Post request to the backend to create a new procedure
      await axios.post('http://localhost:8070/procedures/create', {
        ServiceName: serviceName,
        ServiceDetail: serviceDetail
      });

      // Clear input fields after successful creation
      setServiceName('');
      setServiceDetail('');

      // Show success notification using toast
      toast.success('Procedure created successfully!', {
        position: "top-right",  // Toast position on the top-right corner
        autoClose: 3000,        // Auto close after 3 seconds
        hideProgressBar: false, // Display the progress bar
        closeOnClick: true,     // Close the toast on click
        pauseOnHover: true,     // Pause the toast auto-close on hover
        draggable: true,        // Allow dragging the toast
        progress: undefined,
      });
    } catch (error) {
      console.error('Error creating procedure:', error);

      // Show error notification using toast
      toast.error('Failed to create procedure. Please try again.', {
        position: "top-right",  // Toast position on the top-right corner
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="create-procedure-container">
      <h2>Create New Procedure</h2>
      
      {/* Form for creating a procedure */}
      <form className="create-procedure-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-field"
          value={serviceName}  // Bind input field to serviceName state
          onChange={(e) => setServiceName(e.target.value)}  // Update state on input change
          placeholder="Service Name"
          required
        />
        <input
          type="text"
          className="input-field"
          value={serviceDetail}  // Bind input field to serviceDetail state
          onChange={(e) => setServiceDetail(e.target.value)}  // Update state on input change
          placeholder="Service Detail"
          required
        />
        <button type="submit" className="submit-btn">Create Procedure</button>  {/* Submit button */}
      </form>

      {/* ToastContainer to render toast notifications */}
      <ToastContainer 
        position="top-right"  // Place the ToastContainer in the top-right corner
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default CreateProcedure;
