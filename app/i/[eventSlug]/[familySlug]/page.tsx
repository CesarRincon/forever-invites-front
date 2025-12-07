import { PublicInvitation } from "@/app/components/PublicInvitation";
import { supabase } from "@/app/lib/supabaseClient";

interface Props {
  params: {
    eventSlug: string;
    familySlug: string;
  };
}

export default async function InvitationPage({ params }: Props) {
  const { eventSlug, familySlug } = await params;
  console.log("🚀 ~ InvitationPage ~ eventSlug, familySlug:", eventSlug, familySlug)

  // 1. Buscar evento por slug
  const { data: event, error: eventError } = await supabase
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
    .eq("user_id", eventSlug)
    .single();
  console.log("🚀 ~ InvitationPage ~ event:", event, !event)

  if (eventError || !event) {
    return <div className="p-10 text-center">Evento no encontrado</div>;
  }

  return (
    <PublicInvitation
      eventData={event}
    />
  );
}
