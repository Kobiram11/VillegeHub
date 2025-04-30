import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import ElectionVil from './pages/electionVill.jsx'
import ElectionGrama from './pages/electionGrama.jsx';
import ProceduresGrama from './pages/ProceduresGrama.jsx';
import ProceduresVil from './pages/ProceduresVil.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>

      <Routes>
      <Route path ="/voter-rights-request" element={<ElectionVil/>} />
      <Route path= "/election" element={<ElectionGrama/>} />

      <Route path= "/procedures" element={<ProceduresGrama/>} />
      <Route path= "/villagerprocedures" element={<ProceduresVil/>} />





      </Routes>

      
      
      
    </Router>
  )
}

export default App
