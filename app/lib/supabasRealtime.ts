// supabaseRealtime.ts
import { createClient } from "@supabase/supabase-js";

// Cliente dedicado a Realtime / notificaciones en el navegador
export const supabaseRealtime = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
        auth: {
            persistSession: true,    // guarda la sesión en localStorage
            autoRefreshToken: true,  // refresca automáticamente
        },
        realtime: {
            params: { enable: true } // opcional, para habilitar conexiones
        }
    }
);
