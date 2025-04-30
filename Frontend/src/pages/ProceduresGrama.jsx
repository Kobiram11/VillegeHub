import React from 'react';

import CreateProcedure from '../components/procedures/CreateProcedure';
import ProceduresList from '../components/procedures/ProceduresList'; 
import UpdateProcedure from '../components/procedures/UpdateProcedure';
import DeleteProcedure from '../components/procedures/DeleteProcedure';
import Dashboard from '../components/procedures/ProceduresGramaDashboard';
import NavBar from '../components/Navbar';


const ProceduresGrama = () => {

    return(
    <div>

        <NavBar/>
        <Dashboard/>
        <CreateProcedure/>
        <ProceduresList/>
        <UpdateProcedure/>
        <DeleteProcedure/>
    </div>
    )
};

export default ProceduresGrama; 