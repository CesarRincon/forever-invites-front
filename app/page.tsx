"use client"
import { useEffect, useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { EventForm } from "./components/EventForm";
import { GuestManagement } from "./components/GuestManagement";
import { PublicInvitation } from "./components/PublicInvitation";
import { Sidebar } from "./components/Sidebar";
import { useRouter } from "next/navigation";
import { useAuthStore } from "./store/useAuthStore";
import { useEventStore } from "./store/useEventStore";
import { Toaster, toast } from "sonner";
import { useNotificationStore } from "./store/useNotificationsStore";
import { supabaseRealtime } from "./lib/supabasRealtime";

type Page = "landing" | "dashboard" | "event" | "guests" | "templates" | "settings" | "preview";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter()
  const fetchUser = useAuthStore((state) => state.fetchUser)
  const user = useAuthStore((state) => state.user)
  const loadEvent = useEventStore((state) => state.loadEvent)
  const { addNotification } = useNotificationStore() as any;

  useEffect(() => {
    fetchUser();

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
          toast.success(`${notif.message}`);
          addNotification(notif); // Zustand
        }
      )
      .subscribe();

    return () => {
      supabaseRealtime.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (user?.id) loadEvent(user?.id)
  }, [user?.id])

  const handleGetStarted = () => {
    setIsLoggedIn(true);
    setCurrentPage("dashboard");
  };

  useEffect(() => {
    if (user?.id) {
      router.push("/dashboard");
    }
  }, [user?.id, router]);


  return (
    <LandingPage onGetStarted={handleGetStarted} />
  );
}

