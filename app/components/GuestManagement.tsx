'use client'
import { Users, Plus, Edit2, Trash2, Copy, Search, Filter, CheckCircle2, Clock, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { useEventStore } from "../store/useEventStore";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "sonner";
import { FamilyFormDialog } from "./FamilyFormDialog";

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
  // const [isAddFamilyOpen, setIsAddFamilyOpen] = useState(false);
  const [newFamilyName, setNewFamilyName] = useState("");
  const [newGuests, setNewGuests] = useState<string[]>([""]);
  const families = useEventStore((state) => state.families)
  const guests = useEventStore((state) => state.guests)
  const editFamily = useEventStore((state) => state.editFamily)
  const deleteFamily = useEventStore((state) => state.deleteFamily)
  const user = useAuthStore((state) => state.user)
  const [baseUrl, setBaseUrl] = useState<any>()
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState<any>(null);
  const { loadEvent } = useEventStore();

  const componentDidMount = async () => {
    if (user?.id) {
      await loadEvent(user.id);
    }
  }

  useEffect(() => {
    componentDidMount()
  }, [user?.id])

  const addFamily = useEventStore((state) => state.addFamily);

  const handleAddFamily = async (data: any) => {
    if (!data.name.trim()) return;

    // const guests = newGuests.filter((g) => g.trim());

    await addFamily(data.name, data.guests);

    setSelectedFamily(null);
    setIsAddOpen(false)
    setNewGuests([""]);
    toast.success("Familia agregada correctamente");
  };

  const handleEditFamily = async (data: any) => {

    await editFamily(
      selectedFamily.id,
      data.name,
      data.guests
    );

    toast.success("Familia actualizada correctamente");
    setIsEditOpen(false);
    setSelectedFamily(null);
  };

  const handleDeleteFamily = async (familyId: string) => {
    try {
      const result = await deleteFamily(familyId);

      if (result?.error) {
        console.error(result.error);
        toast.error("No se pudo eliminar la familia.");
        return;
      }

      toast.success("Familia eliminada correctamente.");
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al eliminar la familia.");
    }
  };

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

  const copyLink = async (link: string) => {
    if (typeof window === "undefined") return; // Evita SSR siempre

    try {
      await navigator.clipboard.writeText(link);
      toast.success("Enlace copiado al portapapeles");
    } catch (e) {
      console.error(e);
      toast.error("No se pudo copiar el enlace");
    }
  };

  // Uníon de familias + invitados
  const familiesWithGuests = families.map((f: any) => ({
    ...f,
    guests: guests.filter((g: any) => g.family_id === f.id)
  }));

  // Search + filtro
  const filteredFamilies = familiesWithGuests.filter((family: any) => {
    const familyName = family.family_name?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();

    const matchesSearch =
      familyName.includes(term) ||
      family.guests.some((g: any) => g.name.toLowerCase().includes(term));

    const matchesFilter =
      filterStatus === "all" ||
      family.guests.some((g: any) => g.status === filterStatus);

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: families.reduce((acc: any, f: any) => acc + (f.guests?.length || 0), 0),
    confirmed: families.reduce(
      (acc: any, f: any) => acc + (f.guests?.filter((g: any) => g.status === "confirmed").length || 0),
      0
    ),
    pending: families.reduce(
      (acc: any, f: any) => acc + (f.guests?.filter((g: any) => g.status === "pending").length || 0),
      0
    ),
    declined: families.reduce(
      (acc: any, f: any) => acc + (f.guests?.filter((g: any) => g.status === "declined").length || 0),
      0
    ),
  };

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, [])


  return (
    <div className="p-4 md:p-8 w-full lg:max-w-5xl mx-auto">
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
        <div className="flex flex-col md:flex-row gap-2 flex-wrap pb-2 px-2">
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
          <FamilyFormDialog
            mode="create"
            open={isAddOpen}
            onOpenChange={setIsAddOpen}
            onSubmit={(data) => {
              handleAddFamily(data);
            }}
            trigger={
              <button className="px-6 py-3 bg-gradient-to-r from-[#e6b8a2] to-[#d19d86] text-white rounded-md flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Agregar familia
              </button>
            }
          />

          <FamilyFormDialog
            mode="edit"
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
            defaultValues={{
              name: selectedFamily?.name,
              guests: selectedFamily?.guests.map((g: any) => g.name)
            }}
            onSubmit={(data) => {
              handleEditFamily(data);
            }}
          />


        </div>
      </div>

      {/* Families List */}
      <div className="space-y-4">
        {filteredFamilies.map((family: any) => {
          console.log("🚀 ~ family:", family)
          const confirmedCount = family.guests.filter((g: any) => g.status === "confirmed").length;
          const totalCount = family.guests.length;
          const allConfirmed = confirmedCount === totalCount;
          const someConfirmed = confirmedCount > 0 && confirmedCount < totalCount;
          const familySlug = family.family_slug

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
                    <h5>{family.family_name}</h5>
                    <p className="text-sm text-gray-600">
                      {confirmedCount} de {totalCount} confirmados
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => copyLink(`${baseUrl}/i/${user.id}/${familySlug}`)}
                    className="px-4 py-2 bg-[#faf3eb] rounded-md hover:bg-[#f5e6d3] transition-all flex items-center gap-2 text-sm"
                  >
                    <Copy className="w-4 h-4" />
                    Copiar enlace
                  </button>
                  <button className="px-4 py-2 bg-[#faf3eb] rounded-md hover:bg-[#f5e6d3] transition-all flex items-center gap-2 text-sm" onClick={() => {
                    setIsEditOpen(true)
                    setSelectedFamily({
                      id: family.id,
                      name: family.family_name,
                      guests: family.guests,
                      slug: family.family_slug
                    });
                  }}>
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </button>
                  <button
                    className="px-4 py-2 bg-red-50 rounded-md hover:bg-red-100 transition-all flex items-center gap-2 text-sm text-red-600"
                    onClick={() => handleDeleteFamily(family.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                    Eliminar
                  </button>
                </div>
              </div>

              {/* Guests List */}
              <div className="space-y-2">
                {family.guests.map((guest: any) => (
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