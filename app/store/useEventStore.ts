"use client";

import { create } from "zustand";
import { supabase } from "../lib/supabaseClient";

interface EventData {
    coupleName: string;
    date: string;
    time: string;
    venue: string;
    address: string;
    color: string;
    template: string;
    music: string;
    dressCode: string;
    message: string;
    coverImage?: string;

    // Stats (opcionales, si los usarás en el panel)
    totalGuests?: number;
    confirmed?: number;
    pending?: number;
    declined?: number;
}

interface ItineraryItem {
    time: string;
    event: string;
}

interface EventStore {
    eventData: EventData;
    itinerary: ItineraryItem[];

    setEventData: (data: Partial<EventData>) => void;
    setItinerary: (list: ItineraryItem[]) => void;

    saveToSupabase: (userId: string) => Promise<{ success: boolean; error?: string }>;

    uploadCoverImage: (file: File) => Promise<string | null>;
}

export const useEventStore = create<EventStore>((set, get) => ({
    eventData: {
        coupleName: "María & Alejandro",
        date: "2025-06-15",
        time: "18:00",
        venue: "Hacienda Los Rosales",
        address: "Calle Principal 123, Ciudad",
        color: "#e6b8a2",
        template: "romantic-garden",
        music: "",
        dressCode: "Formal",
        message: "Nos encantaría que nos acompañes en este día tan especial",

        // Stats opcionales
        totalGuests: 0,
        confirmed: 0,
        pending: 0,
        declined: 0,
    },

    itinerary: [
        { time: "18:00", event: "Ceremonia" },
        { time: "19:30", event: "Cóctel" },
        { time: "21:00", event: "Recepción" },
        { time: "23:00", event: "Fiesta" },
    ],

    setEventData: (data) =>
        set((state) => ({
            eventData: { ...state.eventData, ...data },
        })),

    setItinerary: (list) => set({ itinerary: list }),

    saveToSupabase: async (userId: string) => {
        try {
            const { eventData, itinerary } = get();

            const { error } = await supabase.from("events").upsert({
                user_id: userId,
                couple_name: eventData.coupleName,
                date: eventData.date,
                time: eventData.time,
                venue: eventData.venue,
                address: eventData.address,
                color: eventData.color,
                template: eventData.template,
                music: eventData.music,
                dress_code: eventData.dressCode,
                message: eventData.message,
                cover_image: eventData.coverImage,

                // stats opcionales si las usas
                total_guests: eventData.totalGuests,
                confirmed: eventData.confirmed,
                pending: eventData.pending,
                declined: eventData.declined,

                itinerary: itinerary, // Si en DB tienes jsonb
                updated_at: new Date().toISOString(),
            });

            if (error) return { success: false, error: error.message };

            return { success: true };
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    },

    uploadCoverImage: async (file: File) => {
        const fileName = `${crypto.randomUUID()}.jpg`;

        const { data, error } = await supabase.storage
            .from("covers")
            .upload(fileName, file);

        if (error) return null;

        const publicUrl =
            supabase.storage.from("covers").getPublicUrl(fileName).data.publicUrl;

        set((state) => ({
            eventData: { ...state.eventData, coverImage: publicUrl },
        }));

        return publicUrl;
    },
}));
