import React from 'react';
import FrontFvisit from '../componets/fieldvisit/frontFvisit';
import NavBar from '../componets/Navbar';

const Filedvisit = () => {
    return (
        <div className="form-container">
          <NavBar/>
          <div style={{ marginTop: '80px' }}>
        <FrontFvisit/>
        </div>
      </div>
    );


};

export default Filedvisit;
