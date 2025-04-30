import React from 'react';

import GetResidents from '../components/election/EligibleVoters';
import ViewSubmissions from '../components/election/ViewSubmissions';
import UpdateForm from '../components/election/EditSubmissions';
import DeleteSubmissions from '../components/election/DeleteSubmission';
import Dashboard from '../components/election/ElectionDashboard';
import RegistrationForm from "../components/election/RegisterResident";
import NavBar from '../components/Navbar';

const ElectionGrama = () =>{

    return (
        <div>
            <NavBar />
           <Dashboard/>
           <RegistrationForm/>
           <GetResidents/>
           <UpdateForm/>
           <ViewSubmissions/>
           <DeleteSubmissions/>
            
        </div>
    )
};

export default ElectionGrama;