import { EventForm } from "../components/EventForm"
import { Sidebar } from '../components/Sidebar';

const eventLayout = () => {
    return (
        <div className="flex flex-col sm:flex-row">
            <Sidebar />
            <EventForm />
        </div>
    )
}

export default eventLayout