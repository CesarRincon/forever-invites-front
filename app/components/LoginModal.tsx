"use client";

import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const LoginModal = () => {
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e: any) => {
        e.preventDefault();
        // Aquí conectas Supabase o tu lógica de auth
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {/* Puedes poner un botón, un link o un icono */}
                <Button variant="default" className="flex items-center gap-2 bg-[#e6b8a2] py-3 px-4 hover:cursor-pointer hover:opacity-95">
                    <LogIn className="w-4 h-4" />
                    Iniciar sesión
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-sm rounded-xl p-6 bg-white">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-semibold">
                        Iniciar Sesión
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        Ingresa tu correo y contraseña para continuar.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-4">
                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Correo</label>
                        <Input
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
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* Submit */}
                    <Button type="submit" className="w-full h-11 mt-2 bg-gradient-to-r from-[#e6b8a2] to-[#d19d86] text-white hover:opacity-90">
                        Entrar
                    </Button>
                </form>

                {/* Optional: link de registro */}
                <p className="text-sm text-center mt-4 text-gray-600">
                    ¿No tienes cuenta?{" "}
                    <span className="text-[#d19d86] hover:underline cursor-pointer">
                        Crear cuenta
                    </span>
                </p>
            </DialogContent>
        </Dialog>
    );
}
