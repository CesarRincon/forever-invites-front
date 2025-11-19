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
    itinerary: ItineraryItem[];
    coverImage?: string;
}

interface ItineraryItem {
    time: string;
    event: string;
}

interface Family {
    id: string;
    family_name: string;
    invitation_link: string;
}

interface Guest {
    id: string;
    name: string;
    status: string;
    family_id: string;
}

interface EventStore {
    eventId: string | null;
    eventData: EventData;
    families: Family[];
    guests: Guest[];
    itinerary: ItineraryItem[],

    setEventData: (data: Partial<EventData>) => void;
    setItinerary: (list: ItineraryItem[]) => void;

    loadEvent: (userId: string) => Promise<void>;
    saveEvent: (userId: string) => Promise<void>;

    addFamily: (familyName: string) => Promise<string>;
    addGuest: (familyId: string, name: string) => Promise<void>;
    updateGuestStatus: (guestId: string, status: string) => Promise<void>;
}

export const useEventStore = create<EventStore>((set, get) => ({
    eventId: null,

    eventData: {
        coupleName: "",
        date: "",
        time: "",
        venue: "",
        address: "",
        color: "#e6b8a2",
        template: "romantic-garden",
        music: "",
        dressCode: "Formal",
        message: "",
        itinerary: [],
    },

    families: [],
    guests: [],
    itinerary: [],

    setEventData: (data) =>
        set((state) => ({ eventData: { ...state.eventData, ...data } })),

    setItinerary: (list) =>
        set((state) => ({ eventData: { ...state.eventData, itinerary: list } })),

    // 🔥 Cargar evento + familias + invitados
    loadEvent: async (userId: string) => {
        const { data: event } = await supabase
            .from("events")
            .select("*")
            .eq("user_id", userId)
            .single();

        if (!event) return;

        const { data: families } = await supabase
            .from("families")
            .select("*")
            .eq("event_id", event.id);

        const { data: guests } = await supabase
            .from("guests")
            .select("*")
            .eq("event_id", event.id);

        set({
            eventId: event.id,
            eventData: {
                coupleName: event.couple_name,
                date: event.date,
                time: event.time,
                venue: event.venue,
                address: event.address,
                color: event.color,
                template: event.template,
                music: event.music,
                dressCode: event.dress_code,
                message: event.message,
                itinerary: event.itinerary || [],
                coverImage: event.cover_image,
            },
            families: families || [],
            guests: guests || [],
        });
    },

    // 🔥 Guardar evento (crea o actualiza)
    saveEvent: async (userId: string) => {
        const { eventId, eventData } = get();

        if (!eventId) {
            const { data, error } = await supabase.rpc("create_event", {
                p_user_id: userId,
                p_data: eventData,
                p_itinerary: eventData.itinerary,
            });

            if (data) set({ eventId: data });
            return;
        }

        await supabase.rpc("update_event", {
            p_event_id: eventId,
            p_data: eventData,
            p_itinerary: eventData.itinerary,
        });
    },

    // 🔥 Agregar familia
    addFamily: async (familyName: string) => {
        const { eventId, families } = get();

        const { data } = await supabase.rpc("create_family", {
            p_event_id: eventId,
            p_family_name: familyName,
        });

        set({
            families: [...families, { id: data, family_name: familyName, invitation_link: "" }],
        });

        return data;
    },

    // 🔥 Agregar invitado
    addGuest: async (familyId: string, name: string) => {
        const { eventId, guests } = get();

        const { data } = await supabase.rpc("add_guest", {
            p_event_id: eventId,
            p_family_id: familyId,
            p_name: name,
        });

        set({
            guests: [...guests, { id: data, name, status: "pending", family_id: familyId }],
        });
    },

    // 🔥 Actualizar estado Invitado + stats
    updateGuestStatus: async (guestId: string, status: string) => {
        const { guests, eventId } = get();

        await supabase.rpc("update_guest_status", {
            p_guest_id: guestId,
            p_status: status,
        });

        await supabase.rpc("recalc_event_stats", {
            p_event_id: eventId,
        });

        set({
            guests: guests.map((g) =>
                g.id === guestId ? { ...g, status } : g
            ),
        });
    },
}));
