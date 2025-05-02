//import React, { component } from 'react';
import NavVillager from '../componets/NavVillager';

import VillagerDashboard from '../componets/procedures/ProcedureVillagerDashboard';
import ProceduresList from '../componets/procedures/ProceduresList';

const ProceduresVil = () => {

    return(
    <div>
        <NavVillager/>
        <VillagerDashboard/>
        <ProceduresList/>
    
    </div>
    )
};

export default ProceduresVil;