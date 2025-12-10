'use client'
import {
  Heart,
  LayoutDashboard,
  Calendar,
  Users,
  Palette,
  Settings,
  LogOut,
  Menu,
  X,
  Bell
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useEventStore } from "../store/useEventStore";


export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const EventData = useEventStore((state) => state.eventData)

  const menuItems = [
    { id: "dashboard", label: "Panel de control", icon: LayoutDashboard },
    { id: "event", label: "Mi Evento", icon: Calendar },
    { id: "guests", label: "Invitados", icon: Users },
    // { id: "notifications", label: "Notificaciones", icon: Bell },
    // { id: "templates", label: "Plantillas", icon: Palette },
    // { id: "settings", label: "Configuración", icon: Settings },
  ];

  const MenuItem = ({ item }: { item: typeof menuItems[0] }) => {
    const isActive = item.id === pathname.split('/')[1]
    const Icon = item.icon;

    return (
      <Link
        href={`/${item.id}`}
        onClick={() => {
          setIsOpen(false);
        }}
        className={`w-full flex items-center gap-3 !px-4 !py-2 hover:opacity-85 rounded-md transition-all ${isActive
          ? "bg-gradient-to-r from-[#e6b8a2] to-[#d19d86] text-white shadow-lg"
          : "text-gray-700 hover:bg-[#faf3eb]"
          }`}
      >
        <Icon className="w-5 h-5" />
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full p-3 shadow-lg"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/30 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 z-50 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          } w-72`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 !m-4">
            <div className="bg-gradient-to-br from-[#e6b8a2] to-[#d19d86] p-2.5 rounded-2xl">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <div className="tracking-tight">ForeverInvites</div>
              <div className="text-xs text-gray-500">Panel de control</div>
            </div>
          </div>

          {/* User Info */}
          {
            EventData.bride &&
            <div className="bg-gradient-to-br from-[#faf3eb] to-[#f5e6d3] rounded-md !p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#e6b8a2] to-[#d19d86] rounded-full flex items-center justify-center text-white">
                  {EventData?.groom[0]}{EventData?.bride[0]}
                </div>
                <div>
                  <div className="text-sm text-gray-800">{EventData?.groom} & {EventData?.bride}</div>
                  <div className="text-xs text-gray-600">{EventData?.date}</div>
                </div>
              </div>
            </div>
          }

          {/* Menu Items */}
          <nav className="flex-1 space-y-2 flex flex-col gap-2 !mt-4 !mx-2">
            {menuItems.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </nav>

          {/* Logout */}
          <button className="flex items-center gap-3 !px-4 !py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all w-full hover:cursor-pointer">
            <LogOut className="w-5 h-5" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
}
