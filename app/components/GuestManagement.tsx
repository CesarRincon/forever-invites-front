'use client'
import { Users, Plus, Edit2, Trash2, Copy, Search, Filter, CheckCircle2, Clock, XCircle } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";

interface Guest {
  id: string;
  name: string;
  status: "confirmed" | "pending" | "declined";
}

interface Family {
  id: string;
  name: string;
  guests: Guest[];
  invitationLink: string;
}

export function GuestManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "confirmed" | "pending" | "declined">("all");
  const [isAddFamilyOpen, setIsAddFamilyOpen] = useState(false);
  const [newFamilyName, setNewFamilyName] = useState("");
  const [newGuests, setNewGuests] = useState<string[]>([""]);

  const [families, setFamilies] = useState<Family[]>([
    {
      id: "1",
      name: "Familia González",
      guests: [
        { id: "1-1", name: "Roberto González", status: "confirmed" },
        { id: "1-2", name: "Ana González", status: "confirmed" },
        { id: "1-3", name: "Luis González", status: "confirmed" }
      ],
      invitationLink: "https://foreverinvites.com/i/maria-alejandro/gonzalez"
    },
    {
      id: "2",
      name: "Familia Martínez",
      guests: [
        { id: "2-1", name: "Carlos Martínez", status: "confirmed" },
        { id: "2-2", name: "Laura Martínez", status: "confirmed" }
      ],
      invitationLink: "https://foreverinvites.com/i/maria-alejandro/martinez"
    },
    {
      id: "3",
      name: "Familia López",
      guests: [
        { id: "3-1", name: "Miguel López", status: "pending" },
        { id: "3-2", name: "Sofia López", status: "pending" },
        { id: "3-3", name: "Emma López", status: "pending" },
        { id: "3-4", name: "Lucas López", status: "pending" }
      ],
      invitationLink: "https://foreverinvites.com/i/maria-alejandro/lopez"
    },
    {
      id: "4",
      name: "Familia Rodríguez",
      guests: [
        { id: "4-1", name: "Diego Rodríguez", status: "confirmed" },
        { id: "4-2", name: "Carmen Rodríguez", status: "confirmed" }
      ],
      invitationLink: "https://foreverinvites.com/i/maria-alejandro/rodriguez"
    }
  ]);

  const getStatusIcon = (status: Guest["status"]) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-amber-600" />;
      case "declined":
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusBadge = (status: Guest["status"]) => {
    const styles = {
      confirmed: "bg-green-100 text-green-700",
      pending: "bg-amber-100 text-amber-700",
      declined: "bg-red-100 text-red-700"
    };
    const labels = {
      confirmed: "Confirmado",
      pending: "Pendiente",
      declined: "No asiste"
    };

    return (
      <span className={`px-3 py-1 rounded-md text-xs ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const copyLink = (link: string, familyName: string) => {
    navigator.clipboard.writeText(link);
    alert(`Enlace de ${familyName} copiado al portapapeles`);
  };

  const filteredFamilies = families.filter(family => {
    const matchesSearch = family.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      family.guests.some(guest => guest.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter = filterStatus === "all" ||
      family.guests.some(guest => guest.status === filterStatus);

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: families.reduce((acc, f) => acc + f.guests.length, 0),
    confirmed: families.reduce((acc, f) => acc + f.guests.filter(g => g.status === "confirmed").length, 0),
    pending: families.reduce((acc, f) => acc + f.guests.filter(g => g.status === "pending").length, 0),
    declined: families.reduce((acc, f) => acc + f.guests.filter(g => g.status === "declined").length, 0)
  };

  const handleAddFamily = () => {
    if (newFamilyName.trim() && newGuests.some(g => g.trim())) {
      const newFamily: Family = {
        id: Date.now().toString(),
        name: newFamilyName,
        guests: newGuests
          .filter(g => g.trim())
          .map((name, index) => ({
            id: `${Date.now()}-${index}`,
            name,
            status: "pending" as const
          })),
        invitationLink: `https://foreverinvites.com/i/maria-alejandro/${newFamilyName.toLowerCase().replace(/\s+/g, '-')}`
      };
      setFamilies([...families, newFamily]);
      setIsAddFamilyOpen(false);
      setNewFamilyName("");
      setNewGuests([""]);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      {/* Header */}

      <div className="mb-8">
        <h2 className="mb-2">Gestión de invitados</h2>
        <p className="text-gray-600">
          Organiza y gestiona tus invitados por grupos familiares
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-md p-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Users className="w-6 h-6 text-blue-600" />
            <span className="text-sm text-blue-700">Total</span>
          </div>
          <div className="text-3xl text-center text-blue-900">{stats.total}</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-md p-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <span className="text-sm text-green-700">Confirmados</span>
          </div>
          <div className="text-3xl text-center text-green-900">{stats.confirmed}</div>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-md p-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Clock className="w-6 h-6 text-amber-600" />
            <span className="text-sm text-amber-700">Pendientes</span>
          </div>
          <div className="text-3xl text-center text-amber-900">{stats.pending}</div>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-md p-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <XCircle className="w-6 h-6 text-red-600" />
            <span className="text-sm text-red-700">No asisten</span>
          </div>
          <div className="text-3xl text-center text-red-900">{stats.declined}</div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-md shadow-lg mb-6">
        <div className="flex flex-col md:flex-row gap-2 flex-wrap">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-4 top-4 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre de familia o invitado..."
              className="pl-12 h-13"
            />
          </div>

          {/* Filter */}
          <div className="flex gap-2">
            {(["all", "confirmed", "pending", "declined"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-2 py-2 rounded-md text-sm transition-all ${filterStatus === status
                  ? "bg-[#e6b8a2] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {status === "all" ? "Todos" :
                  status === "confirmed" ? "Confirmados" :
                    status === "pending" ? "Pendientes" : "No asisten"}
              </button>
            ))}
          </div>

          {/* Add Family Button */}
          <Dialog open={isAddFamilyOpen} onOpenChange={setIsAddFamilyOpen}>
            <DialogTrigger asChild>
              <button className="px-6 py-3 bg-gradient-to-r from-[#e6b8a2] to-[#d19d86] text-white rounded-md hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap">
                <Plus className="w-5 h-5" />
                Agregar familia
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md bg-white rounded-md border-0">
              <DialogHeader>
                <DialogTitle>Agregar nueva familia</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="familyName">Nombre de la familia</Label>
                  <Input
                    id="familyName"
                    value={newFamilyName}
                    onChange={(e) => setNewFamilyName(e.target.value)}
                    placeholder="Ej: Familia Pérez"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Invitados</Label>
                  <div className="space-y-2 mt-2">
                    {newGuests.map((guest, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={guest}
                          onChange={(e) => {
                            const updated = [...newGuests];
                            updated[index] = e.target.value;
                            setNewGuests(updated);
                          }}
                          placeholder={`Invitado ${index + 1}`}
                        />
                        {newGuests.length > 1 && (
                          <button
                            onClick={() => setNewGuests(newGuests.filter((_, i) => i !== index))}
                            className="text-red-500 hover:text-red-700 px-3"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setNewGuests([...newGuests, ""])}
                    className="w-full mt-3 py-2 border-2 border-dashed border-gray-300 rounded-md hover:border-[#e6b8a2] hover:bg-[#faf3eb] transition-all text-sm hover:cursor-pointer"
                  >
                    + Agregar invitado
                  </button>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setIsAddFamilyOpen(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 hover:cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAddFamily}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-[#e6b8a2] to-[#d19d86] text-white rounded-md hover:shadow-lg hover:cursor-pointer"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Families List */}
      <div className="space-y-4">
        {filteredFamilies.map((family) => {
          const confirmedCount = family.guests.filter(g => g.status === "confirmed").length;
          const totalCount = family.guests.length;
          const allConfirmed = confirmedCount === totalCount;
          const someConfirmed = confirmedCount > 0 && confirmedCount < totalCount;

          return (
            <div key={family.id} className="bg-white rounded-md p-6 shadow-lg hover:shadow-xl transition-all">
              {/* Family Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-md flex items-center justify-center ${allConfirmed ? "bg-green-100" :
                    someConfirmed ? "bg-amber-100" :
                      "bg-gray-100"
                    }`}>
                    <Users className={`w-7 h-7 ${allConfirmed ? "text-green-600" :
                      someConfirmed ? "text-amber-600" :
                        "text-gray-600"
                      }`} />
                  </div>
                  <div>
                    <h5>{family.name}</h5>
                    <p className="text-sm text-gray-600">
                      {confirmedCount} de {totalCount} confirmados
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => copyLink(family.invitationLink, family.name)}
                    className="px-4 py-2 bg-[#faf3eb] rounded-md hover:bg-[#f5e6d3] transition-all flex items-center gap-2 text-sm"
                  >
                    <Copy className="w-4 h-4" />
                    Copiar enlace
                  </button>
                  <button className="px-4 py-2 bg-[#faf3eb] rounded-md hover:bg-[#f5e6d3] transition-all flex items-center gap-2 text-sm">
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </button>
                  <button className="px-4 py-2 bg-red-50 rounded-md hover:bg-red-100 transition-all flex items-center gap-2 text-sm text-red-600">
                    <Trash2 className="w-4 h-4" />
                    Eliminar
                  </button>
                </div>
              </div>

              {/* Guests List */}
              <div className="space-y-2">
                {family.guests.map((guest) => (
                  <div key={guest.id} className="flex items-center justify-between p-4 bg-[#faf3eb] rounded-md">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(guest.status)}
                      <span className="text-gray-800">{guest.name}</span>
                    </div>
                    {getStatusBadge(guest.status)}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {filteredFamilies.length === 0 && (
          <div className="bg-white rounded-md p-12 text-center shadow-lg">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h5 className="mb-2 text-gray-600">No se encontraron familias</h5>
            <p className="text-gray-500">Intenta con otro término de búsqueda o filtro</p>
          </div>
        )}
      </div>
    </div>
  );
}