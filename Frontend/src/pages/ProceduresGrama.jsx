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
        <CreateProcedure/>
        <ProceduresList/>
        <UpdateProcedure/>
        <DeleteProcedure/>
    </div>
    )
};

export default ProceduresGrama; 