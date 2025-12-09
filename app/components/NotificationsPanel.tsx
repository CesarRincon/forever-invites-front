'use client'
import { useNotificationStore } from "../store/useNotificationsStore";

export function NotificationsPanel() {
    const { notifications } = useNotificationStore() as any;

    return (
        <div className="space-y-4 p-4">
            <h1>Notificaciones</h1>
            {notifications.map((n: any) => (
                <div
                    key={n.id}
                    className={`p-4 rounded-xl border shadow-sm ${n.seen ? "bg-white" : "bg-blue-50"
                        }`}
                >
                    <p className="font-medium">{n.message}</p>
                    <div className="flex justify-between mt-1 text-sm text-gray-500">
                        <span>{new Date(n.created_at).toLocaleString()}</span>
                        {n.guests?.name && (
                            <span className="font-semibold">{n.guests.name}</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
