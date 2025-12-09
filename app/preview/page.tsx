'use client'
import { PublicInvitation } from '../components/PublicInvitation'
import { useRouter } from 'next/navigation'

const previewLayout = () => {
    const router = useRouter()
    const eventData = {
        "id": "66cd7ec3-0fe6-4052-a6ec-1c2661f2a8fa",
        "user_id": "6429881f-af1c-4fea-93c6-dae48e90322d",
        "couple_name": "Alex Daza & Lina Castañeda",
        "bride": "Lina Castañeda",
        "groom": "Alex Daza",
        "date": "2026-03-05",
        "time": "22:20:00",
        "venue": "Hacienda San Sebastian",
        "address": "Subachoque, El Rosal Km 3, Cundinamarca",
        "map_link": "",
        "color": "#e6b8a2",
        "template": "romantic-garden",
        "music": "",
        "dress_code": "Formal",
        "dress_code_description": "asdmaskldnaskdaskd",
        "message": "Nos llena de alegría compartir con ustedes este día tan especial en nuestras vidas. Será un honor contar con su presencia y celebrar juntos este momento único. Por favor, no olviden confirmar su asistencia para poder recibirlos como se lo merecen. ¡Los esperamos con todo nuestro cariño!",
        "itinerary": [
            {
                "icon": "car",
                "time": "15:00",
                "event": "Llegada de Invitados"
            },
            {
                "icon": "church",
                "time": "16:00",
                "event": "Ceremonia"
            },
            {
                "icon": "cheers",
                "time": "18:00",
                "event": "Brindis"
            },
            {
                "icon": "dinner",
                "time": "19:00",
                "event": "Cena"
            }
        ],
        "hero_images": [],
        "gallery_couple": [],
        "gallery_venue": [],
        "gallery_highlights": [],
        "gift_suggestions": [],
        "cover_image": "https://dpzjwblnfcbqalobtosg.supabase.co/storage/v1/object/public/images/DSC02091.jpg",
        "total_guests": 16,
        "confirmed_guests": 0,
        "pending_guests": 16,
        "declined_guests": 0,
        "created_at": "2025-12-04T18:21:00.733566+00:00",
        "updated_at": "2025-12-04T18:21:00.733566+00:00",
        "families": [
            {
                "id": "39e277fb-4475-4364-b87f-d080233be3d6",
                "guests": [
                    {
                        "id": "4577fa2a-ed6b-4e68-bc53-40dc6ecc6713",
                        "name": "César Rincon",
                        "status": "confirmed",
                        "family_id": "39e277fb-4475-4364-b87f-d080233be3d6"
                    },
                    {
                        "id": "13da7b59-0dd9-4442-b78f-b8ea5558d7da",
                        "name": "Nathalia Patiño",
                        "status": "confirmed",
                        "family_id": "39e277fb-4475-4364-b87f-d080233be3d6"
                    }
                ],
                "family_name": "Rincón Patiño",
                "family_slug": "rincon-patino",
                "invitation_link": "/invite/rincon-patino"
            },
            {
                "id": "ecec22dc-cb47-4b26-9a51-80b529e1942d",
                "guests": [
                    {
                        "id": "0dc45b30-dae1-4637-bd23-cade3a6d9112",
                        "name": "Chilindrina",
                        "status": "confirmed",
                        "family_id": "ecec22dc-cb47-4b26-9a51-80b529e1942d"
                    },
                    {
                        "id": "c2c5bacd-1d4f-4d93-b859-224386fde2cb",
                        "name": "Felix Rivas",
                        "status": "declined",
                        "family_id": "ecec22dc-cb47-4b26-9a51-80b529e1942d"
                    }
                ],
                "family_name": "Familia Perez",
                "family_slug": "familia-perez",
                "invitation_link": "/invite/familia-perez"
            },
            {
                "id": "0e039c61-3275-4c6f-b1bd-3839ed833b31",
                "guests": [
                    {
                        "id": "5bbc03da-84bb-4518-8e29-b71aa6e82365",
                        "name": "Familia 1",
                        "status": "confirmed",
                        "family_id": "0e039c61-3275-4c6f-b1bd-3839ed833b31"
                    }
                ],
                "family_name": "Test Familia",
                "family_slug": "test-familia",
                "invitation_link": "/invite/test-familia"
            }
        ]
    }

    return (
        <div>
            <button
                onClick={() => router.back()}
                className="fixed top-4 left-4 z-50 px-6 py-3 rounded-md transition-all flex items-center gap-2 text-white justify-center hover:cursor-pointer"
            >
                ← Volver al panel
            </button>
            <PublicInvitation eventData={eventData} />
        </div>
    )
}
export default previewLayout
