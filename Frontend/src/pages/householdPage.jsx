import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

import AddHouse from '../componets/household/AddHouse.jsx';
import AddFamily from '../componets/household/AddFamily.jsx';
import AddMember from '../componets/household/AddMember.jsx';
import HouseList from '../componets/household/HouseList.jsx';
import HouseDetailsById from '../componets/household/HouseDetailsById.jsx';
import MemberDetailsById from '../componets/household/MemberDetailsById.jsx';
import GetFamilyByRef from '../componets/household/GetFamilyByRef.jsx';
import StatsDisplay from '../componets/household/StatsDisplay.jsx';
import '../Styles/houseStyles.css';
import NavBar from '../componets/Navbar.jsx'; 

const HouseholdPage = () => {
  const [activeForm, setActiveForm] = useState(null); // State to track which form to display
  const [activeDetails, setActiveDetails] = useState(''); // State to track selected dropdown value

  const handleShowForm = (form) => {
    setActiveForm(form);
  };

  const handleDropdownChange = (event) => {
    setActiveDetails(event.target.value); // Update state with selected dropdown value
  };

  return (
    <div className="householdpage">
       {/* Add the NavBar here */}
       <NavBar />
   
       {/* Form Section */}
       {/* Statistics Display Section */}
       <div className="pagesec">
        <StatsDisplay />
      </div> 

      {activeForm === 'addHouse' && <AddHouse />}
      {activeForm === 'addFamily' && <AddFamily />}
      {activeForm === 'addMember' && <AddMember />}

      {/* Sidebar with Buttons */}
      <div className="sidebar">
        <div className="button-container">
          <button className="btn btn-primary" onClick={() => handleShowForm('addHouse')}>
            Add House
          </button>
          <button className="btn btn-primary mt-2" onClick={() => handleShowForm('addFamily')}>
            Add Family
          </button>
          <button className="btn btn-primary mt-2" onClick={() => handleShowForm('addMember')}>
            Add Member
          </button>
        </div>
      </div>

      {/* House List Section */}
      <div className="listpagesec">
        <HouseList />
      </div>

   

      {/* Display Component Based on Dropdown Selection */}
      <div className="details-display">
       
          <div className="pagesec">
            <HouseDetailsById />
          </div>
        
        
          <div className="pagesec">
            <GetFamilyByRef />
          </div>
        
       
          <div className="pagesec">
            <MemberDetailsById />
          </div>
        
      </div>

      {/* Button for Departure Letter Request */}
      <div className="button-container-bottom">
        <Link to="/departurelettersGrama">
          <button className="btn btn-primary mt-4">
            Request Departure Letter
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HouseholdPage;
