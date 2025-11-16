"use client"
import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { EventForm } from "./components/EventForm";
import { GuestManagement } from "./components/GuestManagement";
import { PublicInvitation } from "./components/PublicInvitation";
import { Sidebar } from "./components/Sidebar";
import { useRouter } from "next/navigation";

type Page = "landing" | "dashboard" | "event" | "guests" | "templates" | "settings" | "preview";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter()

  const handleGetStarted = () => {
    setIsLoggedIn(true);
    setCurrentPage("dashboard");
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  // Landing Page (no logged in)
  if (!isLoggedIn) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  // Public Invitation View (special route)
  if (currentPage === "preview") {
    return (
      <div>
        <button
          onClick={() => router.back()}
          className="fixed top-4 left-4 z-50 px-6 py-3 bg-white rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
        >
          ← Volver al panel
        </button>
        <PublicInvitation />
      </div>
    );
  }

  // Dashboard Layout (logged in)
  return (
    <div className="flex min-h-screen bg-[#faf3eb]">
      <Sidebar />

      <main className="flex-1 lg:ml-0">
        {/* {currentPage === "dashboard" && <Dashboard onNavigate={handleNavigate} />} */}
        {/* {currentPage === "event" && <EventForm />} */}
        {currentPage === "guests" && <GuestManagement />}
        {currentPage === "templates" && <TemplatesPage />}
        {currentPage === "settings" && <SettingsPage />}
      </main>
    </div>
  );
}

// Placeholder components for Templates and Settings
function TemplatesPage() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="mb-2">Plantillas</h2>
        <p className="text-gray-600">Elige y personaliza tu plantilla favorita</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            name: "Jardín Romántico",
            description: "Flores delicadas y colores suaves",
            color: "from-[#f8e8e8] to-[#f5d5c7]",
            popular: true
          },
          {
            name: "Elegancia Clásica",
            description: "Diseño atemporal y sofisticado",
            color: "from-[#f5e6d3] to-[#e8d4bb]",
            popular: true
          },
          {
            name: "Minimalista Moderno",
            description: "Líneas limpias y contemporáneo",
            color: "from-[#e8ebe7] to-[#d4d8d0]",
            popular: false
          },
          {
            name: "Encanto Rústico",
            description: "Calidez natural y acogedora",
            color: "from-[#d4d8d0] to-[#c4c9c0]",
            popular: false
          },
          {
            name: "Rosa Dorado",
            description: "Glamour y romanticismo",
            color: "from-[#f5d5c7] to-[#e6b8a2]",
            popular: true
          },
          {
            name: "Lavanda Soñadora",
            description: "Suave y etérea",
            color: "from-[#e6e6fa] to-[#d4d4f0]",
            popular: false
          }
        ].map((template, index) => (
          <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer">
            <div className={`h-48 bg-gradient-to-br ${template.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
              <div className="text-center">
                <div className="text-4xl mb-2">💐</div>
                {template.popular && (
                  <span className="bg-white px-3 py-1 rounded-full text-xs">Popular</span>
                )}
              </div>
            </div>
            <div className="p-6">
              <h5 className="mb-2">{template.name}</h5>
              <p className="text-sm text-gray-600 mb-4">{template.description}</p>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-[#e6b8a2] to-[#d19d86] text-white rounded-full hover:shadow-lg transition-all">
                Usar plantilla
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="mb-2">Configuración</h2>
        <p className="text-gray-600">Gestiona tu cuenta y preferencias</p>
      </div>

      <div className="space-y-6">
        {/* Account Settings */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h4 className="mb-6">Información de la cuenta</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2 text-gray-700">Email</label>
              <input
                type="email"
                defaultValue="maria.alejandro@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e6b8a2]"
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-700">Teléfono</label>
              <input
                type="tel"
                defaultValue="+52 55 1234 5678"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e6b8a2]"
              />
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-[#e6b8a2] to-[#d19d86] text-white rounded-full hover:shadow-lg transition-all">
              Guardar cambios
            </button>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h4 className="mb-6">Privacidad</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <p className="text-gray-800">Invitación pública</p>
                <p className="text-sm text-gray-500">Permitir que cualquiera con el enlace vea la invitación</p>
              </div>
              <button className="bg-[#e6b8a2] w-14 h-8 rounded-full relative">
                <div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full" />
              </button>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <p className="text-gray-800">Mostrar lista de invitados</p>
                <p className="text-sm text-gray-500">Los invitados pueden ver quién más está confirmado</p>
              </div>
              <button className="bg-gray-300 w-14 h-8 rounded-full relative">
                <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full" />
              </button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-gray-800">Notificaciones por email</p>
                <p className="text-sm text-gray-500">Recibir alertas cuando alguien confirma</p>
              </div>
              <button className="bg-[#e6b8a2] w-14 h-8 rounded-full relative">
                <div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full" />
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-red-200">
          <h4 className="mb-4 text-red-600">Zona de peligro</h4>
          <p className="text-gray-600 mb-4">Una vez que elimines tu evento, no hay vuelta atrás. Por favor confirma.</p>
          <button className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all">
            Eliminar evento
          </button>
        </div>
      </div>
    </div>
  );
}
