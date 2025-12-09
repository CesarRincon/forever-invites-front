import AuthLayout from "../_components/AuthLayout";
import { EventForm } from "../components/EventForm"
import { Sidebar } from '../components/Sidebar';

const eventLayout = () => {
    return (
        <AuthLayout requireAuth>
            <div className="flex flex-col lg:flex-row">
                <Sidebar />
                <EventForm />
            </div>
        </AuthLayout>
    )
}

export default eventLayout