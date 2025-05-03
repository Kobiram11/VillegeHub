import React from "react";
import NavVillager from '../componets/NavVillager';
import RegistrationForm from "../componets/election/RegisterResident";

const ElectionVil = () => {
  return (
    <div>
      <NavVillager />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh',
        backgroundColor: '#f9f9f9', // optional light background
        padding: '20px',
      }}>
        <div style={{ maxWidth: '800px', width: '100%' }}>
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default ElectionVil;
