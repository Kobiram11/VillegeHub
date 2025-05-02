import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Styles/procedures.css';

const CreateProcedure = () => {
  const [serviceName, setServiceName] = useState('');
  const [serviceDetail, setServiceDetail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8070/procedures/create', {
        ServiceName: serviceName,
        ServiceDetail: serviceDetail
      });

      setServiceName('');
      setServiceDetail('');

      toast.success('Procedure created successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Error creating procedure:', error);
      toast.error('Failed to create procedure. Please try again.', {
        position: "top-right",
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
    <div className="procedure-create-grama-container">
      <h2 className="procedure-create-grama-title">Create New Procedure</h2>
      
      <form className="procedure-create-grama-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="procedure-create-grama-input"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          placeholder="Service Name"
          required
        />
        <input
          type="text"
          className="procedure-create-grama-input"
          value={serviceDetail}
          onChange={(e) => setServiceDetail(e.target.value)}
          placeholder="Service Detail"
          required
        />
        <button type="submit" className="procedure-create-grama-submit">Create Procedure</button>
      </form>

      <ToastContainer 
        position="top-right"
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
