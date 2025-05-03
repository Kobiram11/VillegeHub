import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHouse, 
  faCalendarAlt, 
  faTicketAlt, 
  faFileAlt,
  faVoteYea, 
  faClipboardList // New icon for Notices
} from '@fortawesome/free-solid-svg-icons';
import '../Styles/NavVillager.css';
import { AuthContext } from '../App.jsx';

const NavVillager = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation(); // to track the selected item
  const navigate = useNavigate();
  const { setIsAuthenticated, setUserRole } = useContext(AuthContext);

  // Function to detect hover and expand the sidebar
  const handleMouseEnter = () => {
    setIsSidebarOpen(true);
  };

  // Function to detect when hover ends and collapse the sidebar
  const handleMouseLeave = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUserRole('');
    navigate('/login');
  };

  return (
    <>
      {/* Top Navigation */}
      <div className="villager-top-nav">
        <Link to="/villagerDashboard" className="vnav-item">Home</Link>
        <Link to="/villagerappointments" className="vnav-item">Appointments</Link>
        <Link to="/villagertickets" className="vnav-item">Tickets</Link>
        <Link to="/villagerprocedures" className="vnav-item">Procedures</Link>
        <Link to="/notices" className="vnav-item">Notices</Link>
        <Link to="/voter-rights-request" className="vnav-item">Election</Link>
        <button onClick={handleLogout} style={{ marginLeft: '10px', cursor: 'pointer', background: 'none', border: 'none', color: 'blue', textDecoration: 'underline' }}>
          Logout
        </button>
      </div>

      {/* Side Navigation */}
      <div
        className={`villager-side-nav ${isSidebarOpen ? 'open' : 'collapsed'}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="villager-nav-links">
          <Link to="/villagerDashboard" className={`nav-link ${location.pathname === '/villagerhome' ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faHouse} className="nav-icon" />
            {isSidebarOpen && <span>Home</span>}
          </Link>
          <Link to="/villagerappointments" className={`nav-link ${location.pathname === '/villagerappointments' ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faCalendarAlt} className="nav-icon" />
            {isSidebarOpen && <span>Appointments</span>}
          </Link>
          <Link to="/villagertickets" className={`nav-link ${location.pathname === '/villagertickets' ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faTicketAlt} className="nav-icon" />
            {isSidebarOpen && <span>Tickets</span>}
          </Link>
          <Link to="/villagerprocedures" className={`nav-link ${location.pathname === '/villagerprocedures' ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faFileAlt} className="nav-icon" />
            {isSidebarOpen && <span>Procedures</span>}
          </Link>
          <Link to="/notices" className={`nav-link ${location.pathname === '/notices' ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faClipboardList} className="nav-icon" /> {/* Changed icon for Notices */}
            {isSidebarOpen && <span>Notices</span>}
          </Link>
          <Link to="/voter-rights-request" className={`nav-link ${location.pathname === '/voter-rights-request' ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faVoteYea} className="nav-icon" />
            {isSidebarOpen && <span>Election</span>}
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavVillager;
