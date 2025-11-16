'use client'
import React from 'react'
import { PublicInvitation } from '../components/PublicInvitation'

const previewLayout = () => {
    return (
        <div>
            <button
                onClick={() => { }}
                className="fixed top-4 left-4 z-50 px-6 py-3 rounded-md transition-all flex items-center gap-2 text-white justify-center"
            >
                ← Volver al panel
            </button>
            <PublicInvitation />
        </div>
    )
}
export default previewLayout
