import Navbar from '../componets/Navbar'
import AdminTickets from '../componets/ticket/AdminTicket'
import RetrieveTickets from '../componets/ticket/retrieve_ticket'

const Ticket = () => {

    return(
    <div>
        <Navbar/>
        <AdminTickets/>
        <RetrieveTickets/>

    
    </div>
    )
};

export default Ticket;