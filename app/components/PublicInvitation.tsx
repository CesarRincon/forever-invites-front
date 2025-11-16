"use client";

import {
  MapPin,
  Calendar,
  Clock,
  Gift,
  Shirt,
  Heart,
  CheckCircle2,
  XCircle,
  Pause,
  Play
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { CountdownTimer } from "./CountdownTimer";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useReveal } from "../hooks/useReveal";


interface Guest {
  id: string;
  name: string;
  status: "confirmed" | "pending" | "declined";
}

export function PublicInvitation() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  useReveal(); // ← ACTIVA ANIMACIONES

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
    address: "Calle Principal 123, Bogotá",
    message:
      "Con la bendición de Dios y la alegría en nuestros corazones, queremos compartir con ustedes el día más especial de nuestras vidas",
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

  const handleConfirmation = (
    guestId: string,
    status: "confirmed" | "declined" | "pending"
  ) => {
    setGuests(
      guests.map((g) => (g.id === guestId ? { ...g, status } : g))
    );
  };

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    eventData.address
  )}`;

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Auto-play music when component mounts
  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          // Auto-play might be blocked by browser, user needs to click play button
          console.log("Auto-play blocked, user needs to click play button");
        }
      }
    };

    playAudio();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf5f5] to-white">

      {/* Music Player - Fixed Button */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-br from-[#e6b8a2] to-[#d19d86] text-white rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center group"
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6" />
        ) : (
          <Play className="w-6 h-6 ml-1" />
        )}
        <span className="absolute -top-12 right-0 bg-black/80 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {isPlaying ? "Pausar" : "Reproducir"} canción
        </span>
      </button>

      {/* Audio Element - Fall in Love by Selena */}
      <audio
        ref={audioRef}
        loop
        src="https://ovyyeibklufnltbsclns.supabase.co/storage/v1/object/public/audios/negrita-linda.mp3"
      />

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#f8e8e8] rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f5e6d3] rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10">

        {/* HERO */}
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <ImageWithFallback
              src="https://i.pinimg.com/1200x/db/9a/6a/db9a6a17d13b40539714e9eb513f81ae.jpg"
              alt="Wedding"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#fdf5f5]" />
          </div>

          {/* Content */}
          <div className="z-10 text-center px-4 max-w-4xl mx-auto reveal absolute bottom-20">
            <img
              src="/decorative-icon.png"
              width={150}
              height={80}
              className="mx-auto m-4 my-0"
              style={{ filter: "invert(0) brightness(0)" }}
            />

            <h1 className="text-white text-7xl drop-shadow-2xl !font-alex reveal reveal-delay-1">
              {eventData.groom}
            </h1>

            <div className="text-black text-4xl opacity-90 reveal reveal-delay-2">
              &
            </div>

            <h1 className="text-white text-7xl drop-shadow-2xl !font-alex reveal reveal-delay-3">
              {eventData.bride}
            </h1>

            <p className="text-3xl text-black font-bold mt-6 reveal reveal-delay-4">
              5 de Marzo, 2026
            </p>
          </div>
        </section>

        {/* MESSAGE */}
        <section className="py-16 px-4 bg-blush-light">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-2xl italic text-gray-700 reveal">
              "{eventData.message}"
            </p>
          </div>
        </section>

        {/* COUNTDOWN */}
        <section className="py-16 px-4 bg-gradient-to-b from-[#faf3eb] to-white">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-alex text-4xl mb-4 reveal">Cuenta regresiva</h3>
            <div className="reveal reveal-delay-1">
              <CountdownTimer targetDate={eventData.date} variant="elegant" />
            </div>
          </div>
        </section>

        {/* DATE & LOCATION */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

            {/* Date */}
            <div className="bg-white rounded-3xl p-10 shadow-xl reveal">
              <Calendar className="w-20 h-20 mx-auto text-rose-gold-dark mb-6" />
              <p className="text-center text-lg text-gray-700 mb-2">
                Domingo, 15 de Junio de 2025
              </p>
              <div className="flex justify-center items-center gap-3 text-gray-600">
                <Clock className="w-5 h-5" /> 6:00 PM
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-3xl p-10 shadow-xl reveal reveal-delay-1">
              <MapPin className="w-20 h-20 mx-auto text-[#d19d86] mb-6" />
              <p className="text-lg text-gray-700 mb-2 text-center">
                {eventData.venue}
              </p>
              <p className="text-sm text-gray-600 mb-6 text-center">
                {eventData.address}
              </p>
              <a
                href={mapUrl}
                target="_blank"
                className="block w-[90%] mx-auto py-3 bg-gradient-to-r from-[#e6b8a2] to-[#d19d86] text-white rounded-md text-center shadow-md reveal reveal-delay-2"
              >
                Ver en Google Maps
              </a>
            </div>
          </div>
        </section>

        {/* ITINERARY */}
        <section className="py-12 px-4 bg-gradient-to-b from-white to-[#faf3eb]">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-center mb-12 reveal">Itinerario del día</h3>

            <div className="space-y-10">
              {eventData.itinerary.map((item, i) => (
                <div key={i} className="flex gap-6 reveal" style={{ transitionDelay: `${i * 0.15}s` }}>
                  <div className="bg-gradient-to-br from-[#e6b8a2] to-[#d19d86] text-white rounded-2xl px-6 py-3 text-xl shadow-md">
                    {item.time}
                  </div>

                  <div className="bg-white flex-1 rounded-2xl p-6 shadow-lg">
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
        </section>

        {/* DRESS CODE */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto reveal">
            <div className="bg-white rounded-3xl p-10 shadow-xl text-center">
              <Shirt className="w-16 h-16 mx-auto text-white bg-gradient-to-br from-[#e6b8a2] to-[#d19d86] p-4 rounded-2xl mb-6" />
              <h3 className="mb-4">Código de vestimenta</h3>
              <p className="text-xl text-gray-700 mb-3">{eventData.dressCode}</p>
              <p className="text-gray-600">{eventData.dressCodeDescription}</p>
            </div>
          </div>
        </section>

        {/* GIFTS */}
        <section className="py-16 px-4 bg-gradient-to-b from-white to-[#faf3eb]">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-center mb-12 reveal">Sugerencias de regalo</h3>

            <div className="grid md:grid-cols-3 gap-6">
              {eventData.giftSuggestions.map((s, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-8 shadow-lg text-center reveal"
                  style={{ transitionDelay: `${i * 0.15}s` }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#faf3eb] to-[#f5e6d3] flex items-center justify-center mx-auto mb-4">
                    <s.icon className="w-8 h-8 text-[#e6b8a2]" />
                  </div>
                  <p className="text-gray-800 mb-4">{s.text}</p>
                  {s.link && (
                    <a href={s.link} className="text-[#e6b8a2] hover:underline text-sm">
                      Ver más →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RSVP */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-center mb-4 reveal">Confirma tu asistencia</h3>

            <div className="bg-white rounded-3xl p-10 shadow-xl reveal reveal-delay-1">
              <div className="space-y-6">
                {guests.map((guest) => (
                  <div key={guest.id} className="bg-gradient-to-br from-[#faf3eb] to-[#f5e6d3] p-6 rounded-2xl reveal">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                      {/* Icon + Name */}
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${guest.status === "confirmed"
                            ? "bg-green-100"
                            : guest.status === "declined"
                              ? "bg-red-100"
                              : "bg-gray-100"
                            }`}
                        >
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
                        </div>
                      </div>

                      {/* Actions */}
                      {guest.status === "pending" ? (
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleConfirmation(guest.id, "confirmed")}
                            className="px-6 py-3 bg-green-600 text-white rounded-md shadow-md"
                          >
                            Sí asistiré
                          </button>

                          <button
                            onClick={() => handleConfirmation(guest.id, "declined")}
                            className="px-6 py-3 bg-white border border-gray-300 rounded-md"
                          >
                            No podré
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleConfirmation(guest.id, "pending")}
                          className="text-sm text-[#e6b8a2]"
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

        {/* FOOTER */}
        <section className="py-16 px-4 bg-gradient-to-r from-[#e6b8a2] to-[#d19d86] text-center reveal">
          <Heart className="w-16 h-16 text-white fill-white mx-auto mb-6" />
          <h3 className="text-white mb-4">¡Nos vemos pronto!</h3>
          <p className="text-white/90 text-lg">
            Esperamos con ansias compartir este día especial contigo
          </p>
        </section>

        <footer className="py-8 px-4 bg-white text-center reveal">
          <p className="text-gray-500 text-sm mb-2">
            Invitación creada con amor en ForeverInvites
          </p>
          <p className="text-gray-400 text-xs">{eventData.coupleName}</p>
        </footer>
      </div>
    </div>
  );
}
