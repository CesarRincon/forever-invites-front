'use client'
import { Calendar, Users, CheckCircle2, XCircle, Heart, Clock, Eye, Link2, Settings } from "lucide-react";
import { CountdownTimer } from "./CountdownTimer";
import Link from "next/link";
import { useEventStore } from "../store/useEventStore";

export function Dashboard() {

  const eventData = useEventStore((state) => state.eventData)

  const stats = [
    {
      icon: Users,
      label: "Total Invitados",
      value: eventData.totalGuests,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: CheckCircle2,
      label: "Confirmados",
      value: eventData.confirmed,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Clock,
      label: "Pendientes",
      value: eventData.pending,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50"
    },
    {
      icon: XCircle,
      label: "No asisten",
      value: 0,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50"
    }
  ];

  const quickActions = [
    {
      icon: Calendar,
      title: "Editar Evento",
      description: "Actualiza detalles de tu boda",
      action: () => { },
      color: "from-[#e6b8a2] to-[#d19d86]"
    },
    {
      icon: Users,
      title: "Gestionar Invitados",
      description: "Añade o edita invitados",
      action: () => { },
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Eye,
      title: "Vista previa",
      description: "Ve cómo se ve tu invitación",
      url: '/preview',
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Link2,
      title: "Copiar enlace",
      description: "Comparte tu invitación",
      action: () => {
        navigator.clipboard.writeText("https://foreverinvites.com/i/maria-alejandro");
        alert("Enlace copiado al portapapeles");
      },
      color: "from-green-500 to-green-600"
    }
  ];

  const recentActivity = [
    { name: "Familia González", action: "confirmó asistencia", time: "Hace 2 horas", status: "confirmed" },
    { name: "Familia Martínez", action: "confirmó asistencia", time: "Hace 5 horas", status: "confirmed" },
    { name: "Familia López", action: "vio la invitación", time: "Hace 1 día", status: "viewed" },
    { name: "Familia Rodríguez", action: "confirmó asistencia", time: "Hace 2 días", status: "confirmed" },
    { name: "Familia López", action: "vio la invitación", time: "Hace 1 día", status: "viewed" },
    { name: "Familia Rodríguez", action: "confirmó asistencia", time: "Hace 2 días", status: "confirmed" },
  ];

  return (
    <div className="p-8 md:p-10 w-full mx-auto transition-all flex flex-col items-center gap-4">
      {/* Event Card */}
      <div className="bg-gradient-to-br from-[#faf3eb] to-[#f5e6d3] rounded-md p-6 md:p-10 mb-8 shadow-lg w-full">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 w-full">
          <div className="w-full">
            <div className="flex items-center gap-3 mb-3 !p-4">
              <Heart className="w-8 h-8 text-[#e6b8a2] fill-[#e6b8a2]" />
              <h3>{eventData.coupleName}</h3>
            </div>
            <div className="flex flex-col md:flex-row gap-4 text-gray-700 !pl-4 !pb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#e6b8a2]" />
                <span>15 de Junio, 2025 - 6:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#e6b8a2]" />
                <span>{eventData.venue}</span>
              </div>
              <Link
                href={'/event'}
                className="rounded-md hover:shadow-lg transition-all flex items-center absolute top-13 right-13 hover:cursor-pointer"
              >
                <Settings className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Countdown */}
      <div className="w-full mb-4">
        <p className="text-center text-gray-700 mb-4">Faltan</p>
        <CountdownTimer targetDate={eventData.date} variant="elegant" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} rounded-2xl !py-6 hover:shadow-lg transition-all text-center flex flex-col items-center justify-center gap-4`}
          >
            <div
              className={`bg-gradient-to-br ${stat.color} w-14 h-14 rounded-xl flex items-center justify-center`}
            >
              <stat.icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="text-3xl font-semibold">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="w-full flex flex-col gap-2 mt-4">
        <h4 className="mb-6">Acciones rápidas</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              href={action?.url ?? '/'}
              key={index}
              onClick={action.action}
              className="rounded-2xl !p-4 hover:shadow-xl transition-all text-center group flex bg-white items-center flex-col gap-2"
            >
              <div className={`bg-gradient-to-br ${action.color} w-14 h-18 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                <action.icon className="w-7 h-7 text-white" />
              </div>
              <div className="h-full flex flex-col items-center justify-center ">
                <h6 className="mb-2">{action.title}</h6>
                <p className="text-sm text-gray-600">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-4 flex flex-col gap-2 max-h-64 overflow-y-auto pr-2 w-full">
        <h4 className="mb-6">Actividad reciente</h4>
        <div className="space-y-4 flex flex-col gap-2 max-h-64 overflow-y-auto pr-2">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0 !pr-2 hover:shadow-xl transition-all hover:cursor-pointer">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.status === "confirmed" ? "bg-green-100" : "bg-blue-100"
                  }`}>
                  {activity.status === "confirmed" ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <Eye className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <div className="text-gray-800">{activity.name}</div>
                  <div className="text-sm text-gray-500">{activity.action}</div>
                </div>
              </div>
              <div className="text-sm text-gray-500">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
}