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
  Play,
  Church,
  Music
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { CountdownTimer } from "./CountdownTimer";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useReveal } from "../hooks/useReveal";
import { Carousel } from "./Carousel";
import Image from "next/image";

interface Guest {
  id: string;
  name: string;
  status: "confirmed" | "pending" | "declined";
}

export function PublicInvitation({
  // eventData,
  itinerary,
  family,
  // guests
}: any) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  useReveal(); // ← ACTIVA ANIMACIONES

  const [guestsState, setGuestsState] = useState<Guest[]>([
    { id: "1", name: "Roberto González", status: "pending" },
    { id: "2", name: "Ana González", status: "pending" },
    { id: "3", name: "Luis González", status: "pending" }
  ]);
  // const [guestsState, setGuestsState] = useState<Guest[]>(guests);

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

  // const handleConfirmation = (
  //   guestId: string,
  //   status: "confirmed" | "declined" | "pending"
  // ) => {
  //   setGuestsState(
  //     guestsState.map((g) => (g.id === guestId ? { ...g, status } : g))
  //   );
  // };

  const handleConfirmation = async (
    guestId: string,
    status: "confirmed" | "declined" | "pending"
  ) => {
    // 1. Update UI instantly
    setGuestsState(prev =>
      prev.map(g => g.id === guestId ? { ...g, status } : g)
    );

    // 2. Update DB
    await fetch("/api/rsvp", {
      method: "POST",
      body: JSON.stringify({
        guestId,
        status,
        familyId: family.id,   // <- necesario
      }),
    });
  }

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

  const galleryImages = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800",
    "https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=800"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf5f5] to-white">

      {/* Music Player - Fixed Button */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 
             bg-gradient-to-br from-[#8b9e8a] to-[#6b7c6a] 
             text-white rounded-full shadow-2xl 
             hover:scale-110 transition-all flex items-center justify-center group"
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6" />
        ) : (
          <Play className="w-6 h-6 ml-1" />
        )}

        {/* Tooltip */}
        <span className="absolute -top-12 right-0 
                   bg-[#6b7c6a]/90 text-white text-xs 
                   px-3 py-2 rounded-lg opacity-0 
                   group-hover:opacity-100 transition-opacity whitespace-nowrap">
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
        <div className="absolute top-0 left-0 w-96 h-96 
                  bg-[#f5f1ed] rounded-full blur-3xl opacity-40 
                  -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 
                  bg-[#d9cec3] rounded-full blur-3xl opacity-40 
                  translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10">

        {/* HERO */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#f5f1ed]">

          {/* Contenedor de las 3 columnas más pequeñas */}
          <div className="absolute top-0 inset-0 flex justify-center gap-2 px-6 items-center">

            {/* Columna izquierda (misma altura que la derecha) */}
            <div
              className="relative w-1/3 h-[60vh] overflow-hidden rounded-md -translate-y-[140px] reveal"
            >
              <img
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800"
                className="w-full h-full object-cover"
                style={{ objectPosition: "left center" }}
              />
            </div>

            {/* Columna central (más baja, como en el video) */}
            <div
              className="relative w-1/3 h-[60vh] overflow-hidden rounded-md -translate-y-[90px] reveal"
            >
              <img
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center center" }}
              />
            </div>

            {/* Columna derecha */}
            <div
              className="relative w-1/3 h-[60vh] overflow-hidden rounded-md -translate-y-[140px] reveal"
            >
              <img
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800"
                className="w-full h-full object-cover"
                style={{ objectPosition: "right center" }}
              />
            </div>
          </div>

          {/* Sombra suave encima */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-transparent" />

          {/* Contenido del hero (nombres, fecha, etc.) */}
          <div className="absolute bottom-16 z-10 text-center px-6">
            <h1 className="text-black text-6xl md:text-7xl font-alex italic drop-shadow-xl mb-2">
              {eventData.bride}
            </h1>
            <p className="text-black !text-5xl font-alex drop-shadow-xl">&</p>
            <h1 className="text-black text-6xl md:text-7xl font-alex italic drop-shadow-xl">
              {eventData.groom}
            </h1>
            <p className="mt-1 text-black font-cinzel tracking-[0.3em] text-xl drop-shadow-xl">
              05/03/2026
              {/* {eventData.date} */}
            </p>
          </div>
        </section>

        {/* MESSAGE */}
        <section className="py-16 px-4 bg-[#f5f1ed]">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-2xl font-cinzel !text-black reveal uppercase">
              "{eventData.message}"
            </p>
          </div>
        </section>

        {/* COUNTDOWN */}
        <section className="py-16 px-4 bg-[#e8e4df]">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="!font-cinzel text-2xl mb-4 reveal uppercase !text-black !font-bold">
              Cuenta regresiva
            </h3>
            <div className="reveal">
              <CountdownTimer targetDate={eventData.date} variant="elegant" />
            </div>
          </div>
        </section>


        {/* CAROUSEL DE IMÁGENES ROMÁNTICO */}
        <section className="py-5 sm:py-20 px-4 bg-[#f5f1ed]">
          <div className="max-w-6xl mx-auto">
            <div className="reveal">
              <Carousel
                images={[
                  {
                    src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200",
                    caption: "El día que nos conocimos"
                  },
                  {
                    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200",
                    caption: "Nuestro primer viaje juntos"
                  }
                ]}
                autoPlayInterval={4000}
              />
            </div>
          </div>
        </section>

        {/* DATE & LOCATION */}
        <section className="py-5 sm:py-16 px-4 bg-gradient-to-b from-[#f5f1ed] to-[#e8e4df]">
          <div className="max-w-3xl mx-auto">

            {/* Religious Ceremony Card */}
            <div className="bg-[#f5f1ed] rounded-xl py-12 px-8 mb-8 shadow-lg border border-[#d9cec3] reveal">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 border-2 border-[#c4b8ad] rounded-xl flex items-center justify-center bg-[#e8e4df]">
                  <Calendar className="w-8 h-8 text-[#6b7c6a]" />
                </div>
              </div>

              <h3 className="text-2xl font-cinzel text-center mb-2 text-[#2a2a2a] w-full">
                Ceremonia Religiosa
              </h3>

              <div className="w-16 h-px bg-[#c4b8ad] mx-auto my-4"></div>

              <p className="text-xl text-center mb-1 text-[#3a3a3a] font-light tracking-wide">
                PARROQUIA DEL CARMEN
              </p>
              <p className="text-sm text-center text-[#6b6b6b] mb-4 font-light">
                Av. Cura Gálvez 49, Rímac, Rafael Narváez, San Martín, Cúcuta
              </p>

              <p className="text-3xl text-center font-light text-[#2f2f2f] mb-6">
                5:00 <span className="text-lg">PM</span>
              </p>
            </div>

            {/* Reception Card */}
            <div className="bg-[#f5f1ed] rounded-xl p-12 shadow-lg border border-[#d9cec3] reveal reveal-delay-1">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 border-2 border-[#c4b8ad] rounded-xl flex items-center justify-center bg-[#e8e4df]">
                  <div className="text-3xl">🥂</div>
                </div>
              </div>

              <h3
                className="text-2xl text-center mb-2 text-[#2a2a2a] italic"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Recepción
              </h3>

              <div className="w-16 h-px bg-[#c4b8ad] mx-auto my-4"></div>

              <p className="text-xl text-center mb-1 text-[#3a3a3a] font-light tracking-wide">
                {eventData.venue.toUpperCase()}
              </p>
              <p className="text-sm text-center text-[#6b6b6b] mb-4 font-light">
                {eventData.address}
              </p>

              <p className="text-3xl text-center font-light text-[#2f2f2f] mb-8">
                7:00 <span className="text-lg">PM</span>
              </p>

              <div className="text-center">
                <p className="text-xs text-[#6b7c6a] mb-3 uppercase tracking-widest font-light">
                  Ver ubicación
                </p>
                <a
                  href={mapUrl}
                  target="_blank"
                  className="inline-block px-8 py-2 border border-[#8b9e8a] text-[#6b7c6a] text-sm uppercase tracking-wider hover:bg-[#e8e4df] transition-colors font-light rounded-md"
                >
                  Google Maps
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* CAROUSEL DE IMÁGENES ROMÁNTICO */}
        <section className="py-5 sm:py-20 px-4 bg-[#f5f1ed]">
          <div className="max-w-6xl mx-auto">
            <div className="reveal">
              <Carousel
                images={[
                  {
                    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200",
                    caption: "El día que nos conocimos"
                  },
                  {
                    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200",
                    caption: "Nuestro primer viaje juntos"
                  },
                ]}
                autoPlayInterval={4000}
              />
            </div>
          </div>
        </section>

        {/* ITINERARY */}
        <section className="py-5 sm:py-16 px-4 bg-gradient-to-b from-[#f5f1ed] to-[#e8e4df]">
          <div className="max-w-2xl mx-auto">
            <h2
              className="font-serif text-5xl text-center mb-16 reveal"
              style={{ fontFamily: "'Great Vibes', cursive", color: "#6b7c6a" }}
            >
              Itinerario
            </h2>

            <div className="relative">
              {/* Línea central en musgo suave */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#6b7c6a] transform -translate-x-1/2"></div>

              {eventData.itinerary.map((item, i) => (
                <div
                  key={i}
                  className={`relative mb-12 reveal flex items-center ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    }`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  {/* Texto izquierdo / derecho */}
                  <div
                    className={`w-5/12 ${i % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                      }`}
                  >
                    <div
                      className="text-2xl font-serif mb-1"
                      style={{ fontFamily: "'Great Vibes', cursive", color: "#6b7c6a" }}
                    >
                      {item.time}
                    </div>
                    <div className="text-sm uppercase tracking-wider" style={{ color: "#8b9e8a" }}>
                      {item.event}
                    </div>
                  </div>

                  {/* Icono central estilizado */}
                  <div className="w-2/12 flex justify-center relative z-10">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-[#f5f1ed]"
                      style={{
                        border: "2px solid #6b7c6a",
                      }}
                    >
                      {i === 0 && <Church className="w-6 h-6" style={{ color: "#6b7c6a" }} />}
                      {i === 1 && <Church className="w-6 h-6" style={{ color: "#6b7c6a" }} />}
                      {i === 2 && <span className="text-2xl">💍</span>}
                      {i === 3 && <span className="text-2xl">🎵</span>}
                      {i === 4 && <Heart className="w-6 h-6" style={{ color: "#6b7c6a" }} />}
                      {i === 5 && <span className="text-2xl">🍽️</span>}
                      {i === 6 && <Music className="w-6 h-6" style={{ color: "#6b7c6a" }} />}
                    </div>
                  </div>

                  {/* Ubicación */}
                  <div
                    className={`w-5/12 ${i % 2 === 0 ? "text-left pl-8" : "text-right pr-8"
                      }`}
                  >
                    <div className="text-sm" style={{ color: "#444" }}>
                      {item.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DRESS CODE */}
        <section className="py-12 px-4 bg-[#efe9dd]">
          <div className="max-w-4xl mx-auto reveal">
            <div className="bg-[#faf6ef] border border-[#8b9e8a] rounded-3xl p-10 shadow-xl text-center flex flex-col items-center">
              <Image src={"/dress-code.png"} alt="dress-code" width={150} height={200} />

              <div className="my-2 font-cinzel">
                <h3 className="mb-4 text-[#6b7c6a]">Código de vestimenta</h3>

                <p className="!text-xl text-[#6b7c6a] mb-1 font-bold">
                  {eventData.dressCode}
                </p>

                <p className="text-[#8b9e8a] font-bold">
                  {eventData.dressCodeDescription}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* GIFTS */}
        <section className="py-16 px-4 bg-gradient-to-b from-white to-[#faf3eb]">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-center mb-12 reveal text-[#6b7c6a]">Sugerencias de regalo</h3>

            <div className="grid md:grid-cols-3 gap-6">
              {eventData.giftSuggestions.map((s, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-8 shadow-lg text-center reveal border border-[#d9e2d5]"
                  style={{ transitionDelay: `${i * 0.15}s` }}
                >
                  {/* icon container */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#faf3eb] to-[#f5e6d3] flex items-center justify-center mx-auto mb-4">
                    <s.icon className="w-8 h-8 text-[#6b7c6a]" />
                  </div>

                  <p className="text-[#4a4a4a] mb-4">{s.text}</p>

                  {s.link && (
                    <a
                      href={s.link}
                      className="text-[#8b9e8a] hover:underline text-sm"
                    >
                      Ver más →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RSVP */}
        <section className="py-16 px-4 bg-[#f5f1ed]">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-center mb-4 reveal text-[#6b7c6a]">Confirma tu asistencia</h3>

            <div className="bg-white rounded-3xl p-10 shadow-xl reveal border border-[#8b9e8a]">
              <div className="space-y-6">
                {guestsState.map((guest) => (
                  <div key={guest.id} className="bg-[#efe9dd] p-6 rounded-2xl reveal border border-[#8b9e8a]">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                      {/* Icon + Name */}
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${guest.status === "confirmed"
                            ? "bg-[#6b7c6a]"
                            : guest.status === "declined"
                              ? "bg-red-300"
                              : "bg-[#8b9e8a]/20"
                            }`}
                        >
                          {guest.status === "confirmed" ? (
                            <CheckCircle2 className="w-6 h-6 text-white" />
                          ) : guest.status === "declined" ? (
                            <XCircle className="w-6 h-6 text-white" />
                          ) : (
                            <span className="text-[#6b7c6a]">?</span>
                          )}
                        </div>

                        <div>
                          <p className="text-[#6b7c6a]">{guest.name}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      {guest.status === "pending" ? (
                        <div className="flex gap-3 justify-center">
                          <button
                            onClick={() => handleConfirmation(guest.id, "confirmed")}
                            className="px-4 py-3 bg-[#6b7c6a] text-white rounded-md shadow-md"
                          >
                            Sí asistiré
                          </button>

                          <button
                            onClick={() => handleConfirmation(guest.id, "declined")}
                            className="px-4 py-3 bg-white border border-[#8b9e8a] text-[#6b7c6a] rounded-md"
                          >
                            No podré
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleConfirmation(guest.id, "pending")}
                          className="text-sm text-[#6b7c6a]"
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

        {/* CAROUSEL DE IMÁGENES ROMÁNTICO */}
        <section className="py-5 sm:py-20 px-4 bg-[#f5f1ed]">
          <div className="max-w-6xl mx-auto">
            <div className="reveal">
              <Carousel
                images={[
                  {
                    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200",
                    caption: "El día que nos conocimos"
                  },
                  {
                    src: "https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=1200",
                    caption: "Nuestro primer viaje juntos"
                  },
                ]}
                autoPlayInterval={4000}
              />
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <section className="py-16 px-4 bg-gradient-to-r from-[#f5e6d3] to-[#f5f1ed] text-center reveal">
          <Heart className="w-16 h-16 text-[#6b7c6a] fill-[#6b7c6a] mx-auto mb-6" />
          <h3 className="text-[#6b7c6a] mb-4">¡Nos vemos pronto!</h3>
          <p className="text-[#8b9e8a] text-lg">
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