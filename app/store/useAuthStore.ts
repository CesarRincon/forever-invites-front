import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabaseBrowser } from "../lib/supabaseBrowserClient";

interface AuthState {
    user: any | null;
    loading: boolean;
    fetchUser: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => {
            const supabase = supabaseBrowser();

            // Listener global: login / logout / token refresh
            supabase.auth.onAuthStateChange((_event, session) => {
                console.log("🔵 Auth changed:", _event, session?.user);
                set({ user: session?.user ?? null, loading: false });
            });

            return {
                user: null,
                loading: true,

                fetchUser: async () => {
                    const { data } = await supabase.auth.getUser();
                    set({ user: data.user ?? null, loading: false });
                },

                logout: async () => {
                    await supabaseBrowser().auth.signOut();
                    set({ user: null });
                },
            };
        },
        {
            name: "auth-store", // localStorage key
            partialize: (state) => ({ user: state.user }),
        }
    )
);
