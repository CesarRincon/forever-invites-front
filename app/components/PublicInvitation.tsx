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
import { useParams, useRouter } from "next/navigation";
import Lottie from "lottie-react";
import church from "../icons/LottieIcons/church.json";
import loveHeart from "../icons/LottieIcons/love-hearts.json"
import cheers from "../icons/LottieIcons/cheers.json"
import location from "../icons/LottieIcons/location.json"
import separator from "../icons/LottieIcons/separator.json"
import calendar from "../icons/LottieIcons/calendar.json"
import camera from "../icons/LottieIcons/camera.json"
import sobre from "../icons/LottieIcons/sobre.json"
import gift from "../icons/LottieIcons/gift.json"
import pinterest from "../icons/LottieIcons/pinterest.json"
import gifCard from "../icons/LottieIcons/gif-card.json"


interface Guest {
  id: string;
  name: string;
  status: "confirmed" | "pending" | "declined";
}

export function PublicInvitation({
  eventData,
}: any) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  useReveal(); // ← ACTIVA ANIMACIONES
  const { familySlug } = useParams()
  const family = eventData.families.find(f => f.family_slug === familySlug);
  console.log("🚀 ~ PublicInvitation ~ family:", family)
  const [guestsState, setGuestsState] = useState<Guest[]>(family.guests ?? []);
  const lottieRef = useRef(null);

  useEffect(() => {
    lottieRef.current?.setSpeed(0.8); // Reduce la velocidad
  }, []);


  useEffect(() => {
    setGuestsState(family.guests)
  }, [family])

  // const eventData? = {
  //   coupleName: "Alex & Lina",
  //   bride: "Lina Castañeda",
  //   groom: "Alexander Daza",
  //   date: new Date("2026-03-05T18:00:00"),
  //   venue: "Hacienda Los Rosales",
  //   address: "Calle Principal 123, Bogotá",
  //   message:
  //     "Con la bendición de Dios y la alegría en nuestros corazones, queremos compartir con ustedes el día más especial de nuestras vidas",
  //   dressCode: "Formal / Vestido largo",
  //   dressCodeDescription: "Te pedimos evitar el color blanco",
  //   itinerary: [
  //     { time: "18:00", event: "Ceremonia civil", location: "Jardín principal" },
  //     { time: "19:30", event: "Cóctel de bienvenida", location: "Terraza norte" },
  //     { time: "21:00", event: "Cena de gala", location: "Salón principal" },
  //     { time: "23:00", event: "Fiesta", location: "Pista de baile" }
  //   ],
  //   giftSuggestions: [
  //     { icon: Gift, text: "Mesa de regalos Liverpool", link: "#" },
  //     { icon: Gift, text: "Mesa de regalos Amazon", link: "#" },
  //     { icon: Heart, text: "Lluvia de sobres" }
  //   ]
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
    eventData?.address
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
        src="https://dpzjwblnfcbqalobtosg.supabase.co/storage/v1/object/public/audio/JustinBieber-Anyone.mp3"
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
        <section className="relative w-full h-dvh overflow-visible bg-white mb-[150px] md:mb-0">
          {/* IMAGEN DE FONDO */}
          <div className="absolute inset-0">
            <img
              src={eventData.cover_image}
              className="w-full h-full object-cover lg:w-[50%] object-[80%_50%] lg:object-[80%_50%]"
            />
          </div>

          {/* SVG CURVO (actúa como el panel blanco) - solo desktop */}
          <div className="hidden lg:block absolute right-0 top-0 h-full z-20">
            <svg
              className="absolute right-0 top-0 h-full w-[55vw] max-w-[900px] pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1000 1080"
              preserveAspectRatio="none"
            >
              <path
                fill="white"
                d="M59 0 C5 113 5 253 59 490 S5 1020 5 1020 L0 1080 L1000 1080 L1000 0 Z"
              />
            </svg>

            {/* CONTENIDO DENTRO DEL PANEL CURVO (se posiciona encima del SVG) */}
            <div
              className="absolute top-0 right-0 h-full flex items-center justify-start"
              style={{ width: "55vw", maxWidth: "900px", paddingLeft: "7.5rem", pointerEvents: "auto" }}
            >
              <div className="px-8 text-left">
                <h3 className="text-gray-700 tracking-widest text-xl !mb-8 text-center">¡NOS CASAMOS!</h3>
                <h1 className="font-romantic text-6xl !text-[#ae8f63] mb-3 text-center">{eventData.bride}</h1>
                <p className="font-romantic !text-6xl text-[#ae8f63] mb-3 text-center">&</p>
                <h1 className="font-romantic text-6xl !text-[#ae8f63] !mb-8 text-center">{eventData.groom}</h1>
                <p className="text-gray-600 tracking-widest text-center">TENEMOS EL HONOR<br />DE INVITARTE A NUESTRA BODA</p>
              </div>
            </div>
          </div>

          {/* MOBILE: imagen arriba + onda + contenido */}
          <div className="lg:hidden absolute bottom-[-150] w-full z-30">
            <svg viewBox="0 0 500 80" preserveAspectRatio="none" className="w-full h-[80px]">
              <path d="M0,40 C150,0 350,80 500,40 L500,100 L0,100Z" fill="#ffffff" />
            </svg>
            <div className="bg-white py-10 pt-2 px-6 text-center">
              <p className="text-gray-700 tracking-widest !text-lg !mb-8 mt-0 font-cinzel">¡NOS CASAMOS!</p>
              <h1 className="font-romantic !text-4xl !text-[#ae8f63] mb-3 text-center">{eventData.bride}</h1>
              <p className="font-romantic !text-3xl text-[#ae8f63] text-center">&</p>
              <h1 className="font-romantic text-4xl !text-[#ae8f63] mb-3 text-center">{eventData.groom}</h1>
              <p className="text-gray-600 tracking-widest text-sm !mt-6 font-cinzel">TENEMOS EL HONOR<br />DE INVITARTE A NUESTRA BODA</p>
            </div>
          </div>
        </section>

        {/* MESSAGE */}
        <section className="py-16 px-4 bg-[#f5f1ed]">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-2xl font-cinzel !text-black reveal uppercase">
              "{eventData?.message}"
            </p>
          </div>
        </section>

        {/* COUNTDOWN */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <p className="!text-2xl text-center !text-[#6b7c6a] font-cinzel tracking-[0.3em]">
              Cuenta regresiva
            </p>
            <div className="reveal">
              <CountdownTimer targetDate={eventData?.date} targetTime={eventData?.time} variant="elegant" />
            </div>
          </div>
        </section>

        {/* CAROUSEL DE IMÁGENES ROMÁNTICO */}
        <section className="py-5 sm:py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="reveal">
              <Carousel
                images={[
                  {
                    src: "https://dpzjwblnfcbqalobtosg.supabase.co/storage/v1/object/public/images/DSC02462.jpg",
                    caption: ""
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

        {/* DATE & LOCATION & PHOTOS*/}
        <section className="py-5 sm:py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto">

            {/* Religious Ceremony Card */}
            <div className="bg-[#f5f1ed] rounded-xl py-12 px-8 mb-8 shadow-lg border border-[#6b7c6a] reveal">
              <div className="flex justify-center">
                <Lottie
                  lottieRef={lottieRef}
                  animationData={calendar}
                  loop={true}
                  style={{ width: 100, height: 100 }}
                />
              </div>

              <h3 className="text-2xl font-cinzel text-center !text-[#6b7c6a] w-full tracking-[0.3em]">
                Fecha y hora
              </h3>

              <div className="flex justify-center items-center">
                <Lottie
                  lottieRef={lottieRef}
                  animationData={separator}
                  loop={true}
                  animationSpeed={0.7}
                  style={{ width: 900, height: 50 }}
                />
              </div>

              <p className="text-xl text-center mb-1 text-[#3a3a3a] font-light tracking-wide font-cinzel">
                5 de Marzo de 2026
              </p>

              <p className="text-3xl text-center font-light text-[#2f2f2f] mb-6">
                5:00 <span className="text-lg">PM</span>
              </p>
            </div>

            {/* Reception Card */}
            <div className="bg-[#f5f1ed] rounded-xl p-12 mb-8 shadow-lg border border-[#6b7c6a] reveal reveal-delay-1">
              <div className="flex justify-center">
                <Lottie
                  lottieRef={lottieRef}
                  animationData={location}
                  loop={true}
                  style={{ width: 100, height: 100 }}
                />
              </div>

              <h3
                className="text-2xl text-center !text-[#6b7c6a] font-cinzel tracking-[0.3em]"
              >
                Lugar
              </h3>
              <div className="flex justify-center items-center">
                <Lottie
                  lottieRef={lottieRef}
                  animationData={separator}
                  loop={true}
                  style={{ width: 900, height: 50 }}
                />
              </div>

              <p className="text-xl text-center mb-1 text-[#3a3a3a] font-light tracking-wide font-cinzel">
                {eventData?.venue.toUpperCase()}
              </p>
              <p className="text-sm text-center text-[#6b6b6b] mb-4 font-light">
                {eventData?.address}
              </p>

              <div className="text-center">
                <a
                  href={mapUrl}
                  target="_blank"
                  className="inline-block px-8 py-2 border border-[#8b9e8a] text-[#6b7c6a] text-sm uppercase tracking-wider transition-colors font-light rounded-md hover:bg-[#6b7c6a] hover:text-white"
                >
                  Ver ubicación
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
                    src: "https://dpzjwblnfcbqalobtosg.supabase.co/storage/v1/object/public/images/DSC02189.jpg",
                    caption: ""
                  },
                  {
                    src: "https://dpzjwblnfcbqalobtosg.supabase.co/storage/v1/object/public/images/DSC02233.jpg",
                    caption: ""
                  },
                  {
                    src: "https://dpzjwblnfcbqalobtosg.supabase.co/storage/v1/object/public/images/DSC02375.jpg",
                    caption: ""
                  },
                ]}
                autoPlayInterval={4000}
              />
            </div>
          </div>
        </section>

        {/* ITINERARY */}
        <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-8 lg:p-16">
          <div className="w-full max-w-[1400px]">
            {/* Title */}
            <h3 className="text-2xl text-center !text-[#6b7c6a] font-cinzel tracking-[0.3em] mb-10">
              Itinerary
            </h3>

            {/* Desktop Layout */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Icons Row */}
                <div className="flex justify-between items-end mb-8 relative">
                  {eventData.itinerary.map((event, index) => (
                    <div key={index} className="flex flex-col items-center justify-end" style={{ width: '16.66%' }}>
                      <div className="mb-4 flex items-center justify-center">
                        <Lottie
                          lottieRef={lottieRef}
                          animationData={church}
                          loop={true}
                          style={{ width: 200, height: 200 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Horizontal Line */}
                <div className="w-full h-[1.5px] mb-10" style={{
                  background: 'linear-gradient(90deg, rgba(201, 184, 150, 0) 0%, rgba(201, 184, 150, 1) 5%, rgba(201, 184, 150, 1) 95%, rgba(201, 184, 150, 0) 100%)'
                }}></div>

                {/* Times and Titles */}
                <div className="flex justify-between">
                  {eventData.itinerary.map((event, index) => (
                    <div key={index} className="flex flex-col items-center text-center" style={{ width: '16.66%' }}>
                      <div className="font-light mb-2" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', color: '#C9B896' }}>
                        {event.time}
                      </div>
                      <div className="font-light leading-tight" style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1.125rem)', color: '#C9B896' }}>
                        {event.event}
                      </div>
                      {event.subtitle && (
                        <div className="font-light leading-tight" style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1.125rem)', color: '#C9B896' }}>
                          {event.subtitle}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="block lg:hidden max-w-md mx-auto">
              <div className="relative">
                {/* Vertical Timeline Line */}
                {/* <div className="absolute left-1/2 transform -translate-x-1/2 w-[1.5px] h-full" style={{
                  background: 'linear-gradient(180deg, rgba(201, 184, 150, 0) 0%, rgba(201, 184, 150, 1) 3%, rgba(201, 184, 150, 1) 97%, rgba(201, 184, 150, 0) 100%)'
                }}></div> */}

                {/* Events */}
                {eventData.itinerary.map((event, index) => {
                  const isLeft = index % 2 === 0;

                  return (
                    <div key={index} className="relative flex items-center mb-20 last:mb-0">
                      {/* Dot on timeline */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full z-10"
                        style={{ backgroundColor: '#C9B896', top: '60%', marginTop: '-6px' }}></div>

                      {/* Curved connector line usando border-radius */}
                      <div
                        className="absolute"
                        style={{
                          top: '50%',
                          [isLeft ? 'right' : 'left']: '50%',
                          width: '35%',
                          height: '60px',
                          [isLeft ? 'borderRight' : 'borderLeft']: '4px solid #C9B896',
                          [isLeft ? 'borderTopRightRadius' : 'borderTopLeftRadius']: '40px',
                          transform: 'translateY(-50%)',
                          marginTop: '-30px'
                        }}
                      ></div>
                      <div
                        className="absolute"
                        style={{
                          top: '50%',
                          [isLeft ? 'left' : 'right']: '50%',
                          width: '35%',
                          height: '60px',
                          [isLeft ? 'borderLeft' : 'borderRight']: '4px solid #C9B896',
                          [isLeft ? 'borderBottomLeftRadius' : 'borderBottomRightRadius']: '40px',
                          transform: 'translateY(50%)',
                          marginTop: '-10px',
                        }}
                      ></div>

                      {isLeft ? (
                        <>
                          {/* Left side - Icon */}
                          <div className="w-1/2 flex justify-end pr-12">
                            <div className="flex items-center justify-center">
                              {/* {renderIcon(event.icon)} */}
                              <Lottie
                                lottieRef={lottieRef}
                                animationData={loveHeart}
                                loop={true}
                                style={{ width: 100, height: 100 }}
                              />
                            </div>
                          </div>
                          {/* Right side - Text */}
                          <div className="w-1/2 pl-12">
                            <div className="font-light mb-1" style={{ fontSize: '2rem', color: '#A18B78' }}>
                              {event.time}
                            </div>
                            <div className="font-light leading-tight" style={{ fontSize: '1rem', color: '#C9B896' }}>
                              {event.event}
                            </div>
                            {event.subtitle && (
                              <div className="font-light leading-tight" style={{ fontSize: '1rem', color: '#C9B896' }}>
                                {event.subtitle}
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Left side - Text */}
                          <div className="w-1/2 pr-12 text-right">
                            <div className="font-light mb-1" style={{ fontSize: '2rem', color: '#C9B896' }}>
                              {event.time}
                            </div>
                            <div className="font-light leading-tight" style={{ fontSize: '1rem', color: '#C9B896' }}>
                              {event.event}
                            </div>
                            {event.subtitle && (
                              <div className="font-light leading-tight" style={{ fontSize: '1rem', color: '#C9B896' }}>
                                {event.subtitle}
                              </div>
                            )}
                          </div>
                          {/* Right side - Icon */}
                          <div className="w-1/2 flex justify-start pl-12">
                            <div className="flex items-center justify-center">
                              <Lottie
                                lottieRef={lottieRef}
                                animationData={church}
                                loop={true}
                                style={{ width: 50, height: 50 }}
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* DRESS CODE */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto reveal">
            <div className="bg-[#faf6ef] border border-[#8b9e8a] rounded-3xl p-10 shadow-xl text-center flex flex-col items-center">
              {/* <Image src={"/dress-code.png"} alt="dress-code" width={150} height={200} /> */}
              <Lottie
                lottieRef={lottieRef}
                animationData={location}
                loop={true}
                style={{ width: 90, height: 90 }}
              />
              <h3 className="text-2xl text-center !text-[#6b7c6a] font-cinzel tracking-[0.3em] mb-4">Dress Code</h3>
              {/* <p className="text-xl text-center mb-1 text-[#3a3a3a] font-light tracking-wide font-cinzel">Elegante</p> */}
              <p className="text-xl text-center mb-1 text-[#3a3a3a] font-light tracking-wide font-cinzel">Queremos que este día se sienta tan especial para ustedes como para nosotros. Por eso escogimos una paleta de colores para vestirnos en armonía. Si quieren inspirarse, aquí les compartimos algunas ideas</p>
              <div className="flex justify-evenly w-full items-center">
                <a
                  href={'https://pin.it/1FUghdDGL'}
                  target="_blank"
                  className="px-8 py-2 border border-[#8b9e8a] text-[#6b7c6a] text-sm uppercase tracking-wider transition-colors font-light rounded-md hover:bg-[#6b7c6a] hover:text-white mt-4 flex gap-2"
                >
                  <Lottie
                    lottieRef={lottieRef}
                    animationData={pinterest}
                    loop={true}
                    style={{ width: 20, height: 20 }}
                  />
                  Damas
                </a>
                <a
                  href={'https://pin.it/5xFvcQ7Qy'}
                  target="_blank"
                  className="px-8 py-2 border border-[#8b9e8a] text-[#6b7c6a] text-sm uppercase tracking-wider transition-colors font-light rounded-md hover:bg-[#6b7c6a] hover:text-white mt-4 flex gap-2"
                >
                  <Lottie
                    lottieRef={lottieRef}
                    animationData={pinterest}
                    loop={true}
                    style={{ width: 20, height: 20, color: "#ffff" }}
                  />
                  Caballeros
                </a>
              </div>
            </div>
          </div>
        </section>

        {/*PHOTOS*/}
        <section className="py-16 px-6 bg-white">
          {/*photo*/}
          <div className="bg-[#f5f1ed] rounded-xl p-10 shadow-lg border border-[#6b7c6a] reveal reveal-delay-1">
            <div className="flex justify-center">
              <Lottie
                lottieRef={lottieRef}
                animationData={camera}
                loop={true}
                style={{ width: 90, height: 90 }}
              />
            </div>

            <div className="flex justify-center items-center">
              <Lottie
                lottieRef={lottieRef}
                animationData={separator}
                loop={true}
                animationSpeed={0.7}
                style={{ width: "100%", maxWidth: 500, height: 40 }}
              />
            </div>

            <p className="text-xl text-center mb-1 text-[#3a3a3a] font-light tracking-wide font-cinzel">
              Comparte tus fotos y momentos especiales de nuestra boda para que todos podamos revivir esta celebración tan especial una y otra vez
            </p>

            <div className="text-center">
              <a
                href={mapUrl}
                target="_blank"
                className="inline-block px-8 py-2 border border-[#8b9e8a] text-[#6b7c6a] text-sm uppercase tracking-wider transition-colors font-light rounded-md hover:bg-[#6b7c6a] hover:text-white mt-4"
              >
                Compartir fotografias
              </a>
            </div>
          </div>

        </section>

        {/* GIFT */}
        <div className="bg-[#f5f1ed] p-10 shadow-lg">
          <div className="flex justify-center">
            <Lottie
              lottieRef={lottieRef}
              animationData={gift}
              loop={true}
              style={{ width: 90, height: 90 }}
            />
          </div>

          <h3 className="text-2xl text-center !text-[#6b7c6a] font-cinzel tracking-[0.3em]">
            Sugerencias de regalo
          </h3>

          <div className="flex justify-center items-center">
            <Lottie
              lottieRef={lottieRef}
              animationData={separator}
              loop={true}
              animationSpeed={0.7}
              style={{ width: "100%", maxWidth: 500, height: 40 }}
            />
          </div>

          <div>
            <p className="text-xl text-center mb-1 text-[#3a3a3a] font-light tracking-wide font-cinzel">Tu compañía es el regalo más valioso para nosotros.</p>
            <p className="text-xl text-center mb-1 text-[#3a3a3a] font-light tracking-wide font-cinzel">Si deseas sumar un detalle especial, puedes hacerlo a través de:</p>
            <div className="flex justify-around gap-8 flex-wrap mb-4">
              <div className="flex flex-col justify-center items-center mt-4 h-[120px]">
                <Lottie
                  lottieRef={lottieRef}
                  animationData={sobre}
                  loop={true}
                  animationSpeed={0.7}
                  style={{ width: 100, height: 100 }}
                />
                <p className="font-cinzel">Sobres</p>
              </div>
              <div className="flex flex-col justify-center items-center mt-4 h-[120px]">
                <Lottie
                  lottieRef={lottieRef}
                  animationData={gifCard}
                  loop={true}
                  animationSpeed={0.7}
                  style={{ width: 100, height: 100 }}
                />
                <p className="font-cinzel">Transferencias</p>
              </div>
            </div>
            <div className="flex justify-center flex-col items-center">
              <p className="font-cinzel !text-xl">
                Cuentas bancarias
              </p>
              <p>
                Cuenta ahorros Bancolombia: 088-7790-5765
              </p>
              <p>Nombre: Giovanny Alexander Daza</p>
              <p>C.C: 1.090.476.552</p>
            </div>
          </div>
        </div>


        {/* RSVP */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl text-center !text-[#6b7c6a] font-cinzel tracking-[0.3em] mb-10 reveal">Confirma tu asistencia</h3>
            <p className="text-xl text-center text-[#3a3a3a] font-light tracking-wide font-cinzel mb-4">
              Decir «No puedo asistir» no es descortés. es honesto.
              Confirma tu asistencia antes del:
              5 de Enero
              Para mantenerte en nuestra lista de invitados y unirte a nuestra celebración.
            </p>
            <div className="bg-white rounded-3xl p-10 reveal ">
              <div className="space-y-6">
                {guestsState?.map((guest) => (
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
                      ) : null
                        // <button
                        //   onClick={() => handleConfirmation(guest.id, "pending")}
                        //   className="text-sm text-[#6b7c6a]"
                        // >
                        //   Cambiar respuesta
                        // </button>
                      }
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
                    caption: ""
                  },
                  {
                    src: "https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=1200",
                    caption: ""
                  },
                ]}
                autoPlayInterval={4000}
              />
            </div>
          </div>
        </section>

        {/* FOOTER */}
        {/* <section className="py-16 px-4 bg-gradient-to-r from-[#f5e6d3] to-[#f5f1ed] text-center reveal">
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
          <p className="text-gray-400 text-xs">{eventData?.coupleName}</p>
        </footer> */}
      </div>
    </div>
  );
}