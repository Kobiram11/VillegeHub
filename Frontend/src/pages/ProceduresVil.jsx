//import React, { component } from 'react';
import NavVillager from '../componets/NavVillager';
import ProceduresList from '../componets/procedures/ProceduresList';

const ProceduresVil = () => {

    return(
    <div>
        <NavVillager/>
        <div style={{ marginTop: '80px' }}>
        <ProceduresList/>
        </div>
    </div>
    )
};

export default ProceduresVil;