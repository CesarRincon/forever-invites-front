
import { GuestManagement } from '../components/GuestManagement'
import { Sidebar } from '../components/Sidebar';

const guestLayout = () => {
    return (
        <div className='flex flex-col sm:flex-row'>
            <Sidebar />
            <GuestManagement />
        </div>
    )
}

export default guestLayout