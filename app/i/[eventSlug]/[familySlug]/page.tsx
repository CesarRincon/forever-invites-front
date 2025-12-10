import { PublicInvitation } from "@/app/components/PublicInvitation";
import StarshineGlitter from "@/app/components/StarshineGlitter";
import { supabase } from "@/app/lib/supabaseClient";
import type { Metadata, ResolvingMetadata } from "next";

interface Props {
  params: {
    eventSlug: string;
    familySlug: string;
  };
}

// export async function generateMetadata(
//   { params }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const { eventSlug } = await params;

//   const { data: event, error: eventError } = await supabase
//     .from("events")
//     .select(`
//             *,
//             families (
//                 id,
//                 family_name,
//                 family_slug,
//                 invitation_link,
//                 guests (
//                     id,
//                     name,
//                     status,
//                     family_id
//                 )
//             )
//         `)
//     .eq("user_id", eventSlug)
//     .single();

//   if (!event) {
//     return {
//       title: "Invitación",
//       description: "Invitación especial",
//     };
//   }

//   return {
//     title: event.couple_name,
//     description: event.message || "Invitación especial",
//     icons: {
//       icon: [
//         { url: "http://localhost:3000/iconInvitation.jpg", sizes: "32x32", type: "image/jpeg" }
//       ],
//       apple: "http://localhost:3000/iconInvitation.jpg",
//     },
//     openGraph: {
//       title: event.couple_name,
//       description: event.message,
//       images: event.cover_image ? [event.cover_image] : undefined,
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: event.event_name,
//       description: event.message,
//       images: event.cover_image ? [event.cover_image] : undefined,
//     },
//     // Puedes agregar aquí otras metadata (canonical, alternates, etc.)
//   };
// }

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { eventSlug } = await params;

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

  if (!event) {
    return {
      title: "Invitación",
      description: "Invitación especial",
    };
  }

  // Obtener la URL base de tu aplicación (en producción)
  const baseUrl = 'https://www.linaalexwedding.com';

  // URL de la imagen de portada
  const coverImageUrl = event.cover_image || `${baseUrl}/default-cover.jpg`;

  return {
    title: event.couple_name,
    description: event.message || "Invitación especial",
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: event.couple_name,
      description: event.message,
      type: "website",
      images: [`/opengraph-image.jpg`],
    },
    twitter: {
      card: "summary_large_image",
      title: event.event_name,
      description: event.message,
      images: [coverImageUrl],
    },
  };
}

export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  };
}


export default async function InvitationPage({ params }: Props) {
  const { eventSlug } = await params;

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
  if (eventError || !event) {
    return <div className="p-10 text-center">Evento no encontrado</div>;
  }

  return (
    <>
      <StarshineGlitter />
      <PublicInvitation
        eventData={event}
      />
    </>
  );
}
