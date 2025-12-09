'use client'
import { PublicInvitation } from '../components/PublicInvitation'
import { useRouter } from 'next/navigation'
import { useEventStore } from '../store/useEventStore'

const previewLayout = () => {
    const router = useRouter()
    const event = useEventStore((state) => state.eventData)

    return (
        <div>
            <button
                onClick={() => router.back()}
                className="fixed top-4 left-4 z-50 px-6 py-3 rounded-md transition-all flex items-center gap-2 text-white justify-center hover:cursor-pointer"
            >
                ← Volver al panel
            </button>
            <PublicInvitation eventData={event} />
        </div>
    )
}
export default previewLayout
