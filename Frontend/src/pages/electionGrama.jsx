import React from 'react';

import GetResidents from '../componets/election/EligibleVoters';
import ViewSubmissions from '../componets/election/ViewSubmissions';
import UpdateForm from '../componets/election/EditSubmissions';
import DeleteSubmissions from '../componets/election/DeleteSubmission';
import Dashboard from '../componets/election/ElectionDashboard';
import RegistrationForm from "../componets/election/RegisterResident";


const ElectionGrama = () =>{

    return (
        <div>
        
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