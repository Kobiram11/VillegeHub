import React from 'react';

import CreateProcedure from '../componets/procedures/CreateProcedure';
import ProceduresList from '../componets/procedures/ProceduresList'; 
import UpdateProcedure from '../componets/procedures/UpdateProcedure';
import DeleteProcedure from '../componets/procedures/DeleteProcedure';
import NavBar from '../componets/Navbar';


const ProceduresGrama = () => {

    return(
    <div>

        <NavBar/>
        <div style={{ marginTop: '80px' }}>
        <CreateProcedure/>
        <ProceduresList/>
        <UpdateProcedure/>
        <DeleteProcedure/>
        </div>
    </div>
    )
};

export default ProceduresGrama; 