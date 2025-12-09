import AuthLayout from "../_components/AuthLayout";
import { Dashboard } from "../components/Dashboard";
import { Sidebar } from "../components/Sidebar";
import { Toaster } from 'sonner';

export default function DashboardLayout() {
    return (
        <AuthLayout requireAuth>
            <div className="flex flex-col lg:flex-row">
                <Sidebar />
                <Dashboard />
                <Toaster position="top-right" richColors />
            </div>
        </AuthLayout>
    )
}