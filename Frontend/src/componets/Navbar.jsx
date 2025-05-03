import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faCalendarAlt,
  faClipboard,
  faTicketAlt,
  faVoteYea,
  faFileAlt,
  faBell,
   // Import the Bell icon for Notices
} from '@fortawesome/free-solid-svg-icons';
//import '../Styles/Navbar.css';
import { AuthContext } from '../App';

const NavBar = () => {
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
      <div className="top-nav">
        <Link to="/household-data">Household Data</Link>
        <Link to="/appointments">Appointments</Link>
        <Link to="/field-visits">Field Visits</Link>
        <Link to="/tickets">Tickets</Link>
        <Link to="/election">Election</Link>
        <Link to="/procedures">Procedures</Link>
        <Link to="/gramaNotices">Notices</Link>
        <button onClick={handleLogout} style={{ marginLeft: '10px', cursor: 'pointer', background: 'none', border: 'none', color: 'blue', textDecoration: 'underline' }}>
          Logout
        </button>
      </div>

      {/* Side Navigation */}
      <div
        className={`side-nav ${isSidebarOpen ? 'open' : 'collapsed'}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="nav-links">
          <Link to="/household-data" className={location.pathname === '/household-data' ? 'active' : ''}>
            <FontAwesomeIcon icon={faHouse} className="nav-icon" />
            {isSidebarOpen && <span>Household Data</span>}
          </Link>
          <Link to="/appointments" className={location.pathname === '/appointments' ? 'active' : ''}>
            <FontAwesomeIcon icon={faCalendarAlt} className="nav-icon" />
            {isSidebarOpen && <span>Appointments</span>}
          </Link>
          <Link to="/field-visits" className={location.pathname === '/field-visits' ? 'active' : ''}>
            <FontAwesomeIcon icon={faClipboard} className="nav-icon" />
            {isSidebarOpen && <span>Field Visits</span>}
          </Link>
          <Link to="/tickets" className={location.pathname === '/tickets' ? 'active' : ''}>
            <FontAwesomeIcon icon={faTicketAlt} className="nav-icon" />
            {isSidebarOpen && <span>Tickets</span>}
          </Link>
          <Link to="/election" className={location.pathname === '/election' ? 'active' : ''}>
            <FontAwesomeIcon icon={faVoteYea} className="nav-icon" />
            {isSidebarOpen && <span>Election</span>}
          </Link>
          <Link to="/gramaNotices" className={location.pathname === '/notices' ? 'active' : ''}>
            <FontAwesomeIcon icon={faBell} className="nav-icon" />
            {isSidebarOpen && <span>Notices</span>}
          </Link>
          <Link to="/procedures" className={location.pathname === '/procedures' ? 'active' : ''}>
            <FontAwesomeIcon icon={faFileAlt} className="nav-icon" />
            {isSidebarOpen && <span>Procedures</span>}
          </Link>
          {/* New Notices Link */}
        </div>
      </div>
    </>
  );
};

export default NavBar;
