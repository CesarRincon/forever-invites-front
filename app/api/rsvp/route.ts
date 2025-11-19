import { supabase } from "@/app/lib/supabaseClient";

export async function POST(req: Request) {
    try {
        const { guestId, status, familyId } = await req.json();

        if (!guestId || !familyId) {
            return Response.json(
                { success: false, error: "guestId y familyId son obligatorios" },
                { status: 400 }
            );
        }

        // 1. Validar que el invitado pertenece a esta familia
        const { data: guest, error: guestError } = await supabase
            .from("guests")
            .select("id, family_id")
            .eq("id", guestId)
            .single();

        if (guestError || !guest) {
            return Response.json(
                { success: false, error: "Invitado no encontrado" },
                { status: 404 }
            );
        }

        if (guest.family_id !== familyId) {
            return Response.json(
                { success: false, error: "No tienes permiso para actualizar este invitado" },
                { status: 403 }
            );
        }

        // 2. Actualizar el estado del invitado
        const { error } = await supabase
            .from("guests")
            .update({ status })
            .eq("id", guestId);

        if (error) {
            return Response.json(
                { success: false, error: error.message },
                { status: 500 }
            );
        }

        return Response.json({ success: true });

    } catch (error: any) {
        return Response.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
