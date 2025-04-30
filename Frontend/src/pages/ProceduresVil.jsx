//import React, { component } from 'react';
import NavVillager from '../components/NavVillager';

import VillagerDashboard from '../components/procedures/ProcedureVillagerDashboard';
import ProceduresList from '../components/procedures/ProceduresList';

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