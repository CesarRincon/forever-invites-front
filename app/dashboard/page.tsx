import { Dashboard } from "../components/Dashboard";
import { Sidebar } from "../components/Sidebar";

export default function DashboardLayout() {
    return (
        <div className="flex flex-col sm:flex-row">
            <Sidebar />
            <Dashboard />
        </div>
    )
}