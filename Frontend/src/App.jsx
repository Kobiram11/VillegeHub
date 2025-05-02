import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import ElectionVil from './pages/electionVill.jsx'
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


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>

      <Routes>


      <Route path="/" element={<VillagerDashboard/>} />
      <Route path="/villagerDashboard" element={<VillagerDashboard/>} />
      <Route path="/gramaniladharidashboard" element={<GramaNiladhariDashboard/>} />
      <Route path="/villagerhome" element={<VillagerDashboard/>} />

      <Route path ="/voter-rights-request" element={<ElectionVil/>} />
      <Route path= "/election" element={<ElectionGrama/>} />

      <Route path= "/procedures" element={<ProceduresGrama/>} />
      <Route path= "/villagerprocedures" element={<ProceduresVil/>} />

      <Route path="/household-data" element={<HouseholdPage />} />
      <Route path="/field-visits" element={<Filedvisit />} />

      <Route path= "/notices" element= {<NoticeResident/>} />
      <Route path= "/gramaNotices" element= {<NoticeGramaNiladhari/>} />
      
      <Route path ="/villagertickets" element={<TicketVill/>} />
      <Route path= "/tickets" element={<Ticket/>} />

      <Route path= "/DocumentScanner" element={<DocumentScanner />} />

      
      <Route path= "/appointments" element={<Detailsappointment/>} />
      <Route path= "/villagerappointments" element={<Userappointment/>} />

      </Routes>

      
      
      
    </Router>
  )
}

export default App
