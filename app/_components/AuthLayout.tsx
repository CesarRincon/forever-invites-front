import { createServerClient } from "@supabase/ssr";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { NotificationsListener } from "../components/NotificationsListener";

interface AuthLayoutProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    redirectIfAuth?: string;
}

export default async function AuthLayout({
    children,
    requireAuth = false,
    redirectIfAuth,
}: AuthLayoutProps) {

    const cookieStore = await cookies();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    // No-op: las cookies no se pueden modificar aquí
                    // Supabase intentará setear cookies, pero las ignoramos
                    // en Server Components de solo lectura
                },
            },
        }
    );

    const { data: { user } } = await supabase.auth.getUser();

    const pathname = (await headers()).get("x-pathname") || "";

    if (requireAuth && !user) {
        redirect("/");
    }

    if (user && redirectIfAuth) {
        redirect(redirectIfAuth);
    }

    return <>
        <NotificationsListener />
        {children}
    </>;
}