import React, { useEffect, useState, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// Pages
import UserLogin from './componets/login/UserLogin.jsx';
import ElectionVil from './pages/electionVill.jsx';
import ElectionGrama from './pages/electionGrama.jsx';
import ProceduresGrama from './pages/ProceduresGrama.jsx';
import ProceduresVil from './pages/ProceduresVil.jsx';
import HouseholdPage from './pages/householdPage.jsx';
import Filedvisit from './pages/Filedvisit.jsx';
import NoticeResident from './pages/NoticeResident.jsx';
import NoticeGramaNiladhari from './pages/NoticeGramaNiladhari.jsx';
import TicketVill from './pages/createeticket.jsx';
import Ticket from './pages/ticket.jsx';
import DocumentScanner from './componets/AI OCR/DocumentScanner.jsx';
import Detailsappointment from './pages/ApointmentGrama.jsx';
import Userappointment from './pages/ApointmentUser.jsx';
import VillagerDashboard from './pages/VillagerDashboard.jsx';
import GramaNiladhariDashboard from './pages/GramaNiladhariDashboard.jsx';
import AddUser from './componets/login/AddUser.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Create AuthContext
export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  userRole: '',
  setUserRole: () => {},
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        setIsAuthenticated(true);
        // Map userType to roles used here
        switch (parsedUser.userType) {
          case 'Resident':
            setUserRole('resident');
            break;
          case 'Grama Niladhari':
            setUserRole('gramaNiladhari');
            break;
          case 'Divisional Secrateriat':
            setUserRole('divisionalSecrateriat');
            break;
          default:
            setUserRole('');
        }
      } catch (error) {
        console.error('Invalid user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    
    
   
  
    
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userRole, setUserRole }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
 

            {/* Public Login Route */}
            <Route path="/login" element={<UserLogin />} />

            {/* Default Landing Page */}
            <Route path="/" element={
              isAuthenticated ? (
                userRole === 'Grama Niladhari' ? <Navigate to="/gramaniladharidashboard" /> : 
                <Navigate to="/villagerDashboard" />
              ) : (
                <Navigate to="/login" />
              )
            } />

            {/* Protected Routes for Grama Niladhari */}
            <Route
              path="/gramaniladharidashboard"
              element={isAuthenticated && userRole === 'gramaNiladhari' ? <GramaNiladhariDashboard /> : <Navigate to="/login" />}
            />
               <Route path="/AddUser" element={<AddUser />} />
            <Route
              path="/election"
              element={isAuthenticated && userRole === 'gramaNiladhari' ? <ElectionGrama /> : <Navigate to="/login" />}
            />
            <Route
              path="/procedures"
              element={isAuthenticated && userRole === 'gramaNiladhari' ? <ProceduresGrama /> : <Navigate to="/login" />}
            />
            <Route
              path="/field-visits"
              element={isAuthenticated && userRole === 'gramaNiladhari' ? <Filedvisit /> : <Navigate to="/login" />}
            />
            <Route
              path="/household-data"
              element={isAuthenticated && userRole === 'gramaNiladhari' ? <HouseholdPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/gramaNotices"
              element={isAuthenticated && userRole === 'gramaNiladhari' ? <NoticeGramaNiladhari /> : <Navigate to="/login" />}
            />
            <Route
              path="/appointments"
              element={isAuthenticated && userRole === 'gramaNiladhari' ? <Detailsappointment /> : <Navigate to="/login" />}
            />
            <Route
              path="/tickets"
              element={isAuthenticated && userRole === 'gramaNiladhari' ? <Ticket /> : <Navigate to="/login" />}
            />

            {/* Protected Routes for Villagers */}
            <Route
              path="/villagerDashboard"
              element={isAuthenticated && userRole === 'resident' ? <VillagerDashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/voter-rights-request"
              element={isAuthenticated && userRole === 'resident' ? <ElectionVil /> : <Navigate to="/login" />}
            />
            <Route
              path="/villagerprocedures"
              element={isAuthenticated && userRole === 'resident' ? <ProceduresVil /> : <Navigate to="/login" />}
            />
            <Route
              path="/notices"
              element={isAuthenticated && userRole === 'resident' ? <NoticeResident /> : <Navigate to="/login" />}
            />
            <Route
              path="/villagertickets"
              element={isAuthenticated && userRole === 'resident' ? <TicketVill /> : <Navigate to="/login" />}
            />
            <Route
              path="/villagerappointments"
              element={isAuthenticated && userRole === 'resident' ? <Userappointment /> : <Navigate to="/login" />}
            />

            {/* Shared Route */}
            <Route
              path="/DocumentScanner"
              element={isAuthenticated ? <DocumentScanner /> : <Navigate to="/login" />}
            />

          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
