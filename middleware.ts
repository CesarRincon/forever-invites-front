// middleware.ts
import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const response = NextResponse.next()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name) {
                    return request.cookies.get(name)?.value
                },
                set(name, value, options) {
                    response.cookies.set(name, value, options)
                },
                remove(name, options) {
                    response.cookies.delete(name, options)
                },
            },
        }
    )

    const { data: { user } } = await supabase.auth.getUser()

    const pathname = request.nextUrl.pathname
    const protectedRoutes = ['/dashboard', '/event', '/preview']

    // 1️⃣ Si NO hay user y entra a ruta protegida → redirect a "/"
    if (!user && protectedRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // 2️⃣ Si SÍ hay user y va a "/" → mandarlo al dashboard
    if (user && pathname === '/') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return response
}

export const config = {
    matcher: ['/', '/dashboard', '/event', '/preview']
}
