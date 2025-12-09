"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "../lib/supabaseClient";
import { decodeBase64ToFile } from "../helpers/decodeBase64ToFile";
export interface EventData {
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


export const useEventStore = create(
  persist(
    (set, get) => ({
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

      // --------------------------
      setEventData: (data: any) =>
        set((state: any) => ({ eventData: { ...state.eventData, ...data } })),

      setItinerary: (list: any) =>
        set((state: any) => ({ eventData: { ...state.eventData, itinerary: list } })),

      // --------------------------
      loadEvent: async (userId: string) => {
        const { data: event } = await supabase
          .from("events")
          .select(
            `
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
            `
          )
          .eq("user_id", userId)
          .single();

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

      // --------------------------
      saveEvent: async (userId: string) => {
        const { eventData, eventId } = get();

        let coverUrl = eventData.coverImage ?? null;

        if (eventData.coverImage && eventData.coverImage.startsWith("data:image")) {
          const base64 = eventData.coverImage.split(",")[1];
          const fileName = `event-${userId}-${Date.now()}.png`;

          const { data: uploadData } = await supabase.storage
            .from("event-images")
            .upload(fileName, decodeBase64ToFile(base64, fileName), {
              contentType: "image/png",
            });

          if (uploadData) {
            coverUrl = supabase.storage
              .from("event-images")
              .getPublicUrl(uploadData.path).data.publicUrl;
          }
        }

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
          map_link: eventData.mapLink ?? '',
        };

        const { data: existingEvent } = await supabase
          .from("events")
          .select("id")
          .eq("user_id", userId)
          .single();

        if (existingEvent) {
          const { data } = await supabase
            .from("events")
            .update(payload)
            .eq("id", existingEvent.id)
            .select()
            .single();
          if (data) set({ eventId: data.id });
          return;
        }

        const { data } = await supabase
          .from("events")
          .insert(payload)
          .select()
          .single();

        if (data) set({ eventId: data.id });
      },

      // --------------------------
      addFamily: async (familyName: string, guestList: string[]) => {
        const { eventId, families, guests } = get();

        const slug = familyName
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

        const { data: newFamilyId } = await supabase.rpc("create_family", {
          event_id: eventId,
          family_name: familyName,
          family_slug: slug,
        });

        const insertedGuests: any[] = [];

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

        const fullFamily = {
          id: newFamilyId,
          family_name: familyName,
          invitation_link: "",
          family_slug: slug,
          guests: insertedGuests,
        };

        set({
          families: [...families, fullFamily],
          guests: [...guests, ...insertedGuests],
        });
        return newFamilyId;
      },

      editFamily: async (familyId: string, newFamilyName: string, updatedGuestNames: string[]) => {
        try {
          const { eventId } = get();
          if (!familyId) throw new Error("familyId is required");
          if (!eventId) throw new Error("eventId missing in store");

          // -------------------------------------------------------------
          // 1) Actualizar nombre de la familia + slug
          // -------------------------------------------------------------
          const slug = newFamilyName
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

          const { data: updatedFamily, error: familyErr } = await supabase
            .from("families")
            .update({ family_name: newFamilyName, family_slug: slug })
            .eq("id", familyId)
            .select()
            .maybeSingle();

          if (familyErr) throw familyErr;

          // -------------------------------------------------------------
          // 2) Obtener invitados actuales desde la BD
          // -------------------------------------------------------------
          const { data: currentGuests, error: fetchErr } = await supabase
            .from("guests")
            .select("id, name, status, family_id")
            .eq("family_id", familyId)
            .order("id", { ascending: true }); // mantener orden estable

          if (fetchErr) throw fetchErr;

          const current = currentGuests || [];
          const max = Math.max(current.length, updatedGuestNames.length);

          const guestsToUpdate: { id: string; name: string }[] = [];
          const guestsToInsert: string[] = [];
          const guestsToDelete: string[] = [];

          // -------------------------------------------------------------
          // 3) Comparar por índice para detectar:
          //    - Renombrar
          //    - Agregar
          //    - Eliminar
          // -------------------------------------------------------------
          for (let i = 0; i < max; i++) {
            const existing = current[i];
            const newName = updatedGuestNames[i];

            if (existing && newName) {
              // Caso: existe y sigue existiendo → comparar nombres
              if (existing.name !== newName) {
                guestsToUpdate.push({ id: existing.id, name: newName });
              }
            } else if (!existing && newName) {
              // Caso: agregar nuevo invitado
              guestsToInsert.push(newName);
            } else if (existing && !newName) {
              // Caso: eliminar invitado
              guestsToDelete.push(existing.id);
            }
          }

          // -------------------------------------------------------------
          // 4) Eliminar invitados
          // -------------------------------------------------------------
          if (guestsToDelete.length) {
            const { error } = await supabase
              .from("guests")
              .delete()
              .in("id", guestsToDelete);

            if (error) throw error;
          }

          // -------------------------------------------------------------
          // 5) Renombrar invitados existentes
          // -------------------------------------------------------------
          for (const g of guestsToUpdate) {
            const { error } = await supabase
              .from("guests")
              .update({ name: g.name })
              .eq("id", g.id);

            if (error) throw error;
          }

          // -------------------------------------------------------------
          // 6) Insertar nuevos invitados
          // -------------------------------------------------------------
          if (guestsToInsert.length) {
            const payload = guestsToInsert.map((name) => ({
              family_id: familyId,
              event_id: eventId,
              name,

              status: "pending",
            }));

            const { error } = await supabase.from("guests").insert(payload);
            if (error) throw error;
          }

          // -------------------------------------------------------------
          // 7) Refrescar familias + invitados desde Supabase
          // -------------------------------------------------------------
          const { data: familiesFresh, error: famErr } = await supabase
            .from("families")
            .select(`
        *,
        guests (
          id,
          name,
          status,
          family_id
        )
      `)
            .eq("event_id", eventId);

          if (famErr) throw famErr;

          const flattenedGuests = (familiesFresh || []).flatMap(
            (f: any) => f.guests || []
          );

          // -------------------------------------------------------------
          // 8) Guardar en Zustand
          // -------------------------------------------------------------
          set({
            families: familiesFresh || [],
            guests: flattenedGuests,
          });

          return { success: true };
        } catch (err) {
          console.error("editFamily error:", err);
          return { error: (err as any).message ?? err };
        }
      },

      deleteFamily: async (familyId: string) => {
        try {
          const { eventId } = get();

          if (!familyId) throw new Error("familyId is required");
          if (!eventId) throw new Error("eventId missing in store");

          // -------------------------------------------------------------
          // 1. Borrar la familia (Supabase se encarga de borrar invitados)
          // -------------------------------------------------------------
          const { error: deleteErr } = await supabase
            .from("families")
            .delete()
            .eq("id", familyId);

          if (deleteErr) throw deleteErr;

          // -------------------------------------------------------------
          // 2. Refrescar familias + invitados desde la BD
          // -------------------------------------------------------------
          const { data: familiesFresh, error: famErr } = await supabase
            .from("families")
            .select(`
        *,
        guests (
          id,
          name,
          status,
          family_id
        )
      `)
            .eq("event_id", eventId);

          if (famErr) throw famErr;

          const flattenedGuests = (familiesFresh || []).flatMap(
            (f: any) => f.guests || []
          );

          // -------------------------------------------------------------
          // 3. Guardar estado actualizado en Zustand
          // -------------------------------------------------------------
          set({
            families: familiesFresh || [],
            guests: flattenedGuests,
          });

          return { success: true };

        } catch (err) {
          console.error("deleteFamily error:", err);
          return { error: (err as any).message ?? err };
        }
      },

      addGuest: async (familyId: string, name: string) => {
        const { eventId, guests } = get();

        const { data } = await supabase.rpc("add_guest", {
          p_event_id: eventId,
          p_family_id: familyId,
          p_name: name,
        });

        set({
          guests: [
            ...guests,
            { id: data, name, status: "pending", family_id: familyId },
          ],
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
          guests: guests.map((g: any) =>
            g.id === guestId ? { ...g, status } : g
          ),
        });
      },
    }),

    {
      name: "event-storage", // clave de localStorage
      partialize: (state: any) => ({
        eventId: state.eventId,
        eventData: state.eventData,
        families: state.families,
        guests: state.guests,
      }),
    }
  )
);
