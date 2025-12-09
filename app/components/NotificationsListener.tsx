'use client'
import { useEffect } from "react";
import { useNotificationStore } from "../store/useNotificationsStore";
import { supabaseRealtime } from "../lib/supabasRealtime";
import { toast } from "sonner";

export function NotificationsListener() {
    const addNotification = useNotificationStore((state: any) => state.addNotification);

    useEffect(() => {
        const channel = supabaseRealtime
            .channel("notifications")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "notifications",
                },
                (payload: any) => {
                    const notif = payload.new;
                    toast.success(notif.message);
                    addNotification(notif);
                }
            )
            .subscribe();

        return () => {
            supabaseRealtime.removeChannel(channel);
        };
    }, [addNotification]);

    return null; // no renderiza nada
}
