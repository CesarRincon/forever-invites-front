import { PublicInvitation } from "@/app/components/PublicInvitation";
import { supabase } from "@/app/lib/supabaseClient";

interface Props {
    params: {
        eventSlug: string;
        familySlug: string;
    };
}

export default async function InvitationPage({ params }: Props) {
    const { eventSlug, familySlug } = params;

    // 1. Buscar evento por slug
    const { data: event, error: eventError } = await supabase
        .from("events")
        .select("*")
        .eq("slug", eventSlug)
        .single();

    if (eventError || !event) {
        return <div className="p-10 text-center">Evento no encontrado</div>;
    }

    // 2. Buscar familia por slug y por evento
    const { data: family, error: familyError } = await supabase
        .from("families")
        .select("*")
        .eq("slug", familySlug)
        .eq("event_id", event.id)
        .single();

    if (familyError || !family) {
        return <div className="p-10 text-center">Familia no encontrada</div>;
    }

    // 3. Buscar invitados de esa familia
    const { data: guests, error: guestsError } = await supabase
        .from("guests")
        .select("*")
        .eq("family_id", family.id);

    if (guestsError) {
        return <div className="p-10 text-center">Error cargando invitados</div>;
    }

    return (
        <PublicInvitation
            eventData={event.data}
            itinerary={event.itinerary}
            family={family}
            guests={guests}
        />
    );
}
