

import AuthLayout from '../_components/AuthLayout';
import { GuestManagement } from '../components/GuestManagement';
import { Sidebar } from '../components/Sidebar';
import { Toaster } from "sonner";


const guestLayout = () => {
    return (
        <AuthLayout requireAuth>
            <div className='flex flex-col lg:flex-row'>
                <Sidebar />
                <GuestManagement />
                <Toaster position="top-right" richColors />
            </div>
        </AuthLayout>
    )
}

export default guestLayout