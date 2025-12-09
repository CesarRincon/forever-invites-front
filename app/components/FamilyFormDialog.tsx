"use client";

import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface FamilyFormDialogProps {
    mode: "create" | "edit";
    trigger?: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    defaultValues?: { name: string; guests: string[] };
    onSubmit: (data: { name: string; guests: string[] }) => void;
}

export function FamilyFormDialog({
    mode,
    trigger,
    open,
    onOpenChange,
    defaultValues,
    onSubmit,
}: FamilyFormDialogProps) {

    const [name, setName] = useState(defaultValues?.name ?? "");
    const [guests, setGuests] = useState<string[]>(defaultValues?.guests ?? [""]);

    // actualiza si cambian los defaultValues (cuando editas otra familia)
    useEffect(() => {
        setName(defaultValues?.name ?? "");
        setGuests(defaultValues?.guests ?? [""]);
    }, [defaultValues]);

    const title = mode === "create" ? "Agregar nueva familia" : "Editar familia";
    const submitText = mode === "create" ? "Guardar" : "Actualizar";

    const handleSubmit = () => {
        onSubmit({ name, guests });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

            <DialogContent className="max-w-md bg-white rounded-md border-0">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    {/* Name */}
                    <div>
                        <Label htmlFor="familyName">Nombre de la familia</Label>
                        <Input
                            id="familyName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ej: Familia Pérez"
                            className="mt-2"
                        />
                    </div>

                    {/* Guests */}
                    <div>
                        <Label>Invitados</Label>
                        <div className="space-y-2 mt-2">
                            {guests.map((guest, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        value={guest}
                                        onChange={(e) => {
                                            const updated = [...guests];
                                            updated[index] = e.target.value;
                                            setGuests(updated);
                                        }}
                                        placeholder={`Invitado ${index + 1}`}
                                    />
                                    {guests.length > 1 && (
                                        <button
                                            onClick={() => setGuests(guests.filter((_, i) => i !== index))}
                                            className="text-red-500 hover:text-red-700 px-3"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setGuests([...guests, ""])}
                            className="w-full mt-3 py-2 border-2 border-dashed border-gray-300 rounded-md hover:border-[#e6b8a2] hover:bg-[#faf3eb] transition-all text-sm hover:cursor-pointer"
                        >
                            + Agregar invitado
                        </button>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={() => onOpenChange(false)}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 hover:cursor-pointer"
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={handleSubmit}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-[#e6b8a2] to-[#d19d86] text-white rounded-md hover:shadow-lg hover:cursor-pointer"
                        >
                            {submitText}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
