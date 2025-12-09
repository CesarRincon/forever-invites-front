import { create } from "zustand";

export const useNotificationStore = create((set) => ({
    notifications: [],

    setNotifications: (list: any) => set({ notifications: list }),

    addNotification: (notif: any) =>
        set((state: any) => ({
            notifications: [notif, ...state.notifications]
        })),

    markAsSeen: (id: any) =>
        set((state: any) => ({
            notifications: state.notifications.map((n: any) =>
                n.id === id ? { ...n, seen: true } : n
            )
        }))
}));
