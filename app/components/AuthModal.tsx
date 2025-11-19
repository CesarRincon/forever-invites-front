"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { LogIn, UserPlus, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export const AuthModal = () => {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("login"); // login | register
    const [showPassword, setShowPassword] = useState(false);

    const setUser = useAuthStore((state) => state.setUser);

    const router = useRouter()

    const isLogin = mode === "login";

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (isLogin) {
            // LOGIN
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                console.error("Error login:", error.message);
                return;
            }

            setUser(data.user);
            setOpen(false);
            console.log("Usuario logueado:", data.user);
            router.push('/dashboard')
        } else {
            // REGISTRO
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name,
                    },
                },
            });

            if (error) {
                console.error("Error registro:", error.message);
                return;
            }

            setUser(data.user);
            setOpen(false);
            router.push('/dashboard')
            console.log("Usuario registrado:", data.user);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* Trigger del modal */}
            <DialogTrigger asChild>
                <Button
                    className="flex items-center gap-2 bg-gradient-to-r from-[#e6b8a2] to-[#d19d86] text-white hover:opacity-90"
                >
                    <LogIn className="w-4 h-4" />
                    Iniciar / Registrar
                </Button>
            </DialogTrigger>

            {/* Contenido */}
            <DialogContent className="max-w-sm rounded-lg p-6 bg-white">
                <DialogHeader>
                    <DialogTitle className="text-xl text-center">
                        {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        {isLogin
                            ? "Accede con tu correo y contraseña."
                            : "Regístrate en menos de un minuto."}
                    </DialogDescription>
                </DialogHeader>

                {/* Toggle Login/Register */}
                {/* <div className="flex w-full justify-center mt-4 mb-2">
                    <div className="flex bg-gray-100 rounded-lg p-1">
                        <button
                            className={`px-4 py-2 rounded-md text-sm font-medium ${isLogin
                                ? "bg-white shadow text-gray-800"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                            onClick={() => setMode("login")}
                        >
                            Login
                        </button>

                        <button
                            className={`px-4 py-2 rounded-md text-sm font-medium ${!isLogin
                                ? "bg-white shadow text-gray-800"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                            onClick={() => setMode("register")}
                        >
                            Registro
                        </button>
                    </div>
                </div> */}

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                    {/* NOMBRE SOLO EN REGISTER */}
                    {!isLogin && (
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Tu nombre</label>
                            <Input
                                name="name"
                                type="text"
                                placeholder="María López"
                                className="h-11"
                                required
                            />
                        </div>
                    )}

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Correo</label>
                        <Input
                            name="email"
                            type="email"
                            placeholder="correo@example.com"
                            className="h-11"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-2 relative">
                        <label className="text-sm font-medium">Contraseña</label>
                        <Input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="h-11 pr-10"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        className="w-full h-11 bg-gradient-to-r from-[#e6b8a2] to-[#d19d86] text-white hover:opacity-90"
                    >
                        {isLogin ? "Entrar" : "Registrarme"}
                    </Button>
                </form>

                {/* Cambio entre modos */}
                <p className="text-sm text-center mt-4 text-gray-600">
                    {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
                    <span
                        className="text-[#d19d86] hover:underline cursor-pointer"
                        onClick={() => setMode(isLogin ? "register" : "login")}
                    >
                        {isLogin ? "Regístrate" : "Inicia sesión"}
                    </span>
                </p>
            </DialogContent>
        </Dialog>
    );
}
