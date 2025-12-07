"use client";

import { create } from "zustand";
import { supabase } from "../lib/supabaseClient";
import { decodeBase64ToFile } from "../helpers/decodeBase64ToFile";

interface ItineraryItem {
    time: string;
    event: string;
    location?: string;
}
export interface EventData {
    coupleName: string;
    bride: string;
    groom: string;

    date: string;
    time: string;
    venue: string;
    address: string;
    mapLink?: string;

    color: string;
    template: string;
    music: string;

    dressCode: string;
    dressCodeDescription: string;

    message: string;
    itinerary: ItineraryItem[];

    heroImages: string[];
    galleryCouple: string[];
    galleryVenue: string[];
    galleryHighlights: string[];

    giftSuggestions: any[];

    coverImage?: string;
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

    setEventData: (data: Partial<EventData>) => void;
    setItinerary: (list: ItineraryItem[]) => void;

    loadEvent: (userId: string) => Promise<void>;
    saveEvent: (userId: string) => Promise<void>;

    addFamily: (familyName: string, guestList: string[]) => Promise<string | number>;
    addGuest: (familyId: string, name: string) => Promise<void>;
    updateGuestStatus: (guestId: string, status: string) => Promise<void>;
}

export const useEventStore = create<EventStore>((set, get) => ({
    eventId: null,
    eventData: {
        coupleName: "",
        bride: "",
        groom: "",
        date: "",
        time: "",
        venue: "",
        address: "",

        color: "#e6b8a2",
        template: "romantic-garden",
        music: "",

        dressCode: "Formal",
        dressCodeDescription: "",

        message: "",
        itinerary: [],

        heroImages: [],
        galleryCouple: [],
        galleryVenue: [],
        galleryHighlights: [],

        giftSuggestions: [],

        coverImage: undefined,
    },
    families: [],
    guests: [],

    setEventData: (data) =>
        set((state) => ({ eventData: { ...state.eventData, ...data } })),

    setItinerary: (list) =>
        set((state) => ({ eventData: { ...state.eventData, itinerary: list } })),

    // -----------------------------------------------------------
    // 🔥 CARGAR EVENTO COMPLETO
    // -----------------------------------------------------------
    loadEvent: async (userId: string) => {
        const { data: event, error } = await supabase
            .from("events")
            .select(`
            *,
            families (
                id,
                family_name,
                family_slug,
                invitation_link,
                guests (
                    id,
                    name,
                    status,
                    family_id
                )
            )
        `)
            .eq("user_id", userId)
            .single();

        console.log("EVENT LOADED:", event);

        if (!event) return;

        const flattenGuests = event.families.flatMap((f: any) => f.guests || []);

        set({
            eventId: event.id,
            eventData: {
                coupleName: event.couple_name,
                bride: event.bride,
                groom: event.groom,
                date: event.date,
                time: event.time,
                venue: event.venue,
                address: event.address,
                color: event.color,
                template: event.template,
                music: event.music,
                dressCode: event.dress_code,
                dressCodeDescription: event.dress_code_description,
                message: event.message,
                itinerary: event.itinerary || [],
                heroImages: event.hero_images || [],
                galleryCouple: event.gallery_couple || [],
                galleryVenue: event.gallery_venue || [],
                galleryHighlights: event.gallery_highlights || [],
                giftSuggestions: event.gift_suggestions || [],
                coverImage: event.cover_image,
            },
            families: event.families || [],
            guests: flattenGuests,
        });
    },

    // -----------------------------------------------------------
    // 🔥 GUARDAR EVENTO COMPLETO
    // -----------------------------------------------------------
    // saveEvent: async (userId: string) => {
    //     const { eventData } = get();

    //     // 1. Subir portada si viene en base64
    //     let coverUrl = eventData.coverImage ?? null;

    //     if (eventData.coverImage && eventData.coverImage.startsWith("data:image")) {
    //         const base64 = eventData.coverImage.split(",")[1];
    //         const fileName = `event-${userId}-${Date.now()}.png`;

    //         const { data: uploadData } = await supabase
    //             .storage
    //             .from("event-images")
    //             .upload(fileName, decodeBase64ToFile(base64, fileName), {
    //                 contentType: "image/png",
    //             });

    //         if (uploadData) {
    //             coverUrl = supabase
    //                 .storage
    //                 .from("event-images")
    //                 .getPublicUrl(uploadData.path).data.publicUrl;
    //         }
    //     }

    //     // 2. Payload completo
    //     const payload = {
    //         user_id: userId,

    //         couple_name: eventData.coupleName,
    //         bride: eventData.bride,
    //         groom: eventData.groom,

    //         date: eventData.date,
    //         time: eventData.time,
    //         venue: eventData.venue,
    //         address: eventData.address,

    //         color: eventData.color,
    //         template: eventData.template,
    //         music: eventData.music,

    //         dress_code: eventData.dressCode,
    //         dress_code_description: eventData.dressCodeDescription,

    //         message: eventData.message,
    //         itinerary: eventData.itinerary,

    //         hero_images: eventData.heroImages,
    //         gallery_couple: eventData.galleryCouple,
    //         gallery_venue: eventData.galleryVenue,
    //         gallery_highlights: eventData.galleryHighlights,

    //         gift_suggestions: eventData.giftSuggestions,

    //         cover_image: coverUrl,
    //     };

    //     // 3. Insert o Update
    //     if (eventData) {
    //         const { data, error } = await supabase
    //             .from("events")
    //             .insert(payload)
    //             .select()
    //             .single();
    //         console.log("🚀 ~ data:", data, error)

    //         if (data) set({ eventId: data.id });
    //         return;
    //     }

    //     await supabase.from("events").update(payload).eq("id", eventId);
    // },
    saveEvent: async (userId: string) => {
        const { eventData, eventId } = get();

        // 1. Subir portada si viene en base64
        let coverUrl = eventData.coverImage ?? null;

        if (eventData.coverImage && eventData.coverImage.startsWith("data:image")) {
            const base64 = eventData.coverImage.split(",")[1];
            const fileName = `event-${userId}-${Date.now()}.png`;

            const { data: uploadData, error: uploadError } = await supabase
                .storage
                .from("event-images")
                .upload(fileName, decodeBase64ToFile(base64, fileName), {
                    contentType: "image/png",
                });

            if (uploadError) {
                console.error("Error subiendo imagen", uploadError);
            }

            if (uploadData) {
                coverUrl = supabase
                    .storage
                    .from("event-images")
                    .getPublicUrl(uploadData.path).data.publicUrl;
            }
        }

        // 2. Payload
        const payload = {
            user_id: userId,

            couple_name: `${eventData.groom} & ${eventData.bride}`,
            bride: eventData.bride,
            groom: eventData.groom,

            date: eventData.date,
            time: eventData.time,
            venue: eventData.venue,
            address: eventData.address,

            color: eventData.color,
            template: eventData.template,
            music: eventData.music,

            dress_code: eventData.dressCode,
            dress_code_description: eventData.dressCodeDescription,

            message: eventData.message,
            itinerary: eventData.itinerary,

            hero_images: eventData.heroImages,
            gallery_couple: eventData.galleryCouple,
            gallery_venue: eventData.galleryVenue,
            gallery_highlights: eventData.galleryHighlights,

            gift_suggestions: eventData.giftSuggestions,

            cover_image: coverUrl,

            map_link: ""
        };

        // 3. Verificar si el usuario ya tiene un evento creado
        const { data: existingEvent } = await supabase
            .from("events")
            .select("id")
            .eq("user_id", userId)
            .single();

        // 4. Si existe → UPDATE
        if (existingEvent) {
            const { data, error } = await supabase
                .from("events")
                .update(payload)
                .eq("id", existingEvent.id)
                .select()
                .single();

            console.log("✔ Evento actualizado:", data, error);

            if (data) set({ eventId: data.id });

            return;
        }

        // 5. Si no existe → INSERT
        const { data, error } = await supabase
            .from("events")
            .insert(payload)
            .select()
            .single();

        console.log("✔ Evento creado:", data, error);

        if (data) set({ eventId: data.id });
    },


    // -----------------------------------------------------------
    // FAMILIAS / INVITADOS
    // -----------------------------------------------------------
    addFamily: async (familyName: string, guestList: string[]) => {
        const { eventId, families, guests, eventData } = get();
        console.log("🚀 ~ eventId:", eventId, eventData)

        const slug = familyName
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");


        // 1. Crear familia
        const { data: newFamilyId, error: familyError } = await supabase.rpc(
            "create_family",
            {
                event_id: eventId,
                family_name: familyName,
                family_slug: slug
            }
        );
        if (familyError) throw familyError;

        // 2. Insertar invitados
        const insertedGuests: Guest[] = [];

        for (const name of guestList) {
            const { data: guestId } = await supabase.rpc("add_guest", {
                p_event_id: eventId,
                p_family_id: newFamilyId,
                p_name: name,
            });

            insertedGuests.push({
                id: guestId,
                name,
                status: "pending",
                family_id: newFamilyId,
            });
        }

        // 3. Armar familia completa para React
        const fullFamily = {
            id: newFamilyId,
            family_name: familyName,
            invitation_link: "",
            guests: insertedGuests,
        };

        // 4. Actualizar Zustand
        set({
            families: [...families, fullFamily],
            guests: [...guests, ...insertedGuests],
        });

        return newFamilyId;
    },

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
            guests: guests.map((g) => (g.id === guestId ? { ...g, status } : g)),
        });
    },
}));
