import Navbar from '../componets/Navbar'
import AdminTickets from '../componets/ticket/AdminTicket'

const Ticket = () => {

    return(
    <div>
        <Navbar/>
        <div style={{ marginTop: '80px' }}>
        <AdminTickets/>
        </div>
    
    </div>
    )
};

export default Ticket;