import { MapPin, Calendar, Clock, Gift, Shirt, Heart, CheckCircle2, XCircle, Music } from "lucide-react";
import { useState } from "react";
import { CountdownTimer } from "./CountdownTimer";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import Image from "next/image";

interface Guest {
  id: string;
  name: string;
  status: "confirmed" | "pending" | "declined";
}

export function PublicInvitation() {
  const [guests, setGuests] = useState<Guest[]>([
    { id: "1", name: "Roberto González", status: "pending" },
    { id: "2", name: "Ana González", status: "pending" },
    { id: "3", name: "Luis González", status: "pending" }
  ]);

  const eventData = {
    coupleName: "Alex & Lina",
    bride: "Lina Castañeda",
    groom: "Alexander Daza",
    date: new Date("2026-03-05T18:00:00"),
    venue: "Hacienda Los Rosales",
    address: "Calle Principal 123, Bogota",
    message: "Con la bendición de Dios y la alegría en nuestros corazones, queremos compartir con ustedes el día más especial de nuestras vidas",
    dressCode: "Formal / Vestido largo",
    dressCodeDescription: "Te pedimos evitar el color blanco",
    itinerary: [
      { time: "18:00", event: "Ceremonia civil", location: "Jardín principal" },
      { time: "19:30", event: "Cóctel de bienvenida", location: "Terraza norte" },
      { time: "21:00", event: "Cena de gala", location: "Salón principal" },
      { time: "23:00", event: "Fiesta", location: "Pista de baile" }
    ],
    giftSuggestions: [
      { icon: Gift, text: "Mesa de regalos Liverpool", link: "#" },
      { icon: Gift, text: "Mesa de regalos Amazon", link: "#" },
      { icon: Heart, text: "Lluvia de sobres" }
    ]
  };

  const handleConfirmation = (guestId: string, status: "confirmed" | "declined") => {
    setGuests(guests.map(g =>
      g.id === guestId ? { ...g, status } : g
    ));
  };

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(eventData.address)}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf5f5] via-white to-[#fdf5f5]">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#f8e8e8] rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f5e6d3] rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden max-h-">
          {/* Background Image */}
          <div className="absolute inset-0">
            <ImageWithFallback
              src="https://i.pinimg.com/1200x/db/9a/6a/db9a6a17d13b40539714e9eb513f81ae.jpg"
              alt="Wedding"
              className="w-full h-full object-cover md:object-center"
            />
            <div className="absolute bottom-14 inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#fdf5f5] h-[100%]" />
          </div>

          {/* Hero Content */}
          <div className="z-10 text-center px-4 max-w-4xl mx-auto absolute bottom-20">
            {/* Decorative element */}
            <div className="mb-3 flex items-center justify-center">
              <img
                src="/decorative-icon.png"
                alt=""
                width={200}
                height={100}
                className="absolute bottom-[140] md:bottom-[200]"
                style={{ filter: "invert(0) brightness(0)" }}
              />
            </div>
            {/* Names */}
            <h1 className="text-white text-5xl md:text-7xl drop-shadow-2xl !font-alex">
              {eventData.groom}
            </h1>
            <div className="text-black text-3xl md:text-4xl opacity-90">&</div>
            <h1 className="text-white text-5xl md:text-7xl mb-4 drop-shadow-2xl !font-alex">
              {eventData.bride}
            </h1>

            {/* Date */}
            <div className="rounded-md px-8 py-2 inline-block">
              <p className="text-2xl md:text-3xl text-black font-bold">
                5 de Marzo, 2026
              </p>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-15 right-10 -translate-x-1/2 animate-bounce">
            <div className="w-8 h-12 border-2 border-black rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-black rounded-full" />
            </div>
          </div>
        </section>

        {/* Message Section */}
        <section className="py-16 px-4 w-full bg-blush-light">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-block w-1 h-16 bg-gradient-to-b from-transparent via-[#e6b8a2] to-transparent" />
            </div>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed italic">
              "{eventData.message}"
            </p>
            <div className="mt-8">
              <div className="inline-block w-1 h-16 bg-gradient-to-b from-[#e6b8a2] via-[#e6b8a2] to-transparent" />
            </div>
          </div>
        </section>

        {/* Countdown */}
        <section className="!py-16 px-4 bg-gradient-to-b from-[#faf3eb] to-bg-blush-light">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="!mb-4 !font-alex !text-4xl">Cuenta regresiva</h3>
            <CountdownTimer targetDate={eventData.date} variant="elegant" />
          </div>
        </section>

        {/* Date & Location */}
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Date Card */}
              <div className="bg-white rounded-md p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Calendar className="w-20 h-20 text-rose-gold-dark" />
                </div>
                <p className="text-center text-gray-700 text-lg mb-2">
                  Domingo, 15 de Junio de 2025
                </p>
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>6:00 PM</span>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-white rounded-md p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <MapPin className="w-20 h-20 text-[#d19d86]" />
                </div>
                <p className="text-center text-gray-700 text-lg mb-2">
                  {eventData.venue}
                </p>
                <p className="text-center text-gray-600 text-sm mb-6">
                  {eventData.address}
                </p>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-[90%] px-6 !py-3 bg-gradient-to-r from-[#e6b8a2] to-[#d19d86] text-white rounded-md text-center hover:shadow-lg transition-all"
                >
                  Ver en Google Maps
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Itinerary */}
        <section className="!py-8 px-4 bg-gradient-to-b from-white to-[#faf3eb]">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-center mb-12">Itinerario del día</h3>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#e6b8a2] to-[#d19d86] hidden md:block" />

              <div className="space-y-8">
                {eventData.itinerary.map((item, index) => (
                  <div key={index} className="relative flex gap-6 items-start">
                    {/* Time badge */}
                    <div className="bg-gradient-to-br from-[#e6b8a2] to-[#d19d86] text-white rounded-2xl px-6 py-3 min-w-[100px] text-center shadow-lg z-10">
                      <div className="text-xl">{item.time}</div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                      <h5 className="mb-2">{item.event}</h5>
                      <p className="text-gray-600 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {item.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Dress Code */}
        <section className="!py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl text-center">
              <div className="bg-gradient-to-br from-[#e6b8a2] to-[#d19d86] w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Shirt className="w-10 h-10 text-white" />
              </div>
              <h3 className="mb-4">Código de vestimenta</h3>
              <p className="text-xl text-gray-700 mb-3">{eventData.dressCode}</p>
              <p className="text-gray-600">{eventData.dressCodeDescription}</p>
            </div>
          </div>
        </section>

        {/* Gift Suggestions */}
        <section className="py-16 px-4 bg-gradient-to-b from-white to-[#faf3eb]">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-center mb-12">Sugerencias de regalo</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {eventData.giftSuggestions.map((suggestion, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all text-center group">
                  <div className="bg-gradient-to-br from-[#faf3eb] to-[#f5e6d3] w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <suggestion.icon className="w-8 h-8 text-[#e6b8a2]" />
                  </div>
                  <p className="text-gray-800 mb-4">{suggestion.text}</p>
                  {suggestion.link && (
                    <a
                      href={suggestion.link}
                      className="text-[#e6b8a2] hover:text-[#d19d86] text-sm"
                    >
                      Ver más →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RSVP Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-center mb-4">Confirma tu asistencia</h3>
            <p className="text-center text-gray-600 mb-12">
              Por favor confirma antes del 1 de Mayo de 2025
            </p>

            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl">
              <div className="space-y-6">
                {guests.map((guest) => (
                  <div key={guest.id} className="bg-gradient-to-br from-[#faf3eb] to-[#f5e6d3] rounded-2xl p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${guest.status === "confirmed" ? "bg-green-100" :
                          guest.status === "declined" ? "bg-red-100" :
                            "bg-gray-100"
                          }`}>
                          {guest.status === "confirmed" ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                          ) : guest.status === "declined" ? (
                            <XCircle className="w-6 h-6 text-red-600" />
                          ) : (
                            <span className="text-gray-600">?</span>
                          )}
                        </div>
                        <div>
                          <p className="text-gray-800">{guest.name}</p>
                          {guest.status === "confirmed" && (
                            <p className="text-sm text-green-600">Confirmado</p>
                          )}
                          {guest.status === "declined" && (
                            <p className="text-sm text-red-600">No asistirá</p>
                          )}
                          {guest.status === "pending" && (
                            <p className="text-sm text-gray-500">Pendiente</p>
                          )}
                        </div>
                      </div>

                      {guest.status === "pending" && (
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleConfirmation(guest.id, "confirmed")}
                            className="flex-1 md:flex-none px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                          >
                            <CheckCircle2 className="w-5 h-5" />
                            Sí asistiré
                          </button>
                          <button
                            onClick={() => handleConfirmation(guest.id, "declined")}
                            className="flex-1 md:flex-none px-6 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-md hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                          >
                            <XCircle className="w-5 h-5" />
                            No podré
                          </button>
                        </div>
                      )}

                      {guest.status !== "pending" && (
                        <button
                          onClick={() => handleConfirmation(guest.id, "pending")}
                          className="text-sm text-[#e6b8a2] hover:text-[#d19d86]"
                        >
                          Cambiar respuesta
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer Message */}
        <section className="py-16 px-4 bg-gradient-to-r from-[#e6b8a2] to-[#d19d86]">
          <div className="max-w-4xl mx-auto text-center">
            <Heart className="w-16 h-16 text-white fill-white mx-auto mb-6" />
            <h3 className="text-white mb-4">¡Nos vemos pronto!</h3>
            <p className="text-white/90 text-lg">
              Esperamos con ansias compartir este día especial contigo
            </p>
          </div>
        </section>

        {/* Footer Info */}
        <footer className="py-8 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-500 text-sm mb-2">
              Invitación creada con amor en ForeverInvites
            </p>
            <p className="text-gray-400 text-xs">
              {eventData.coupleName} • 15.06.2025
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}