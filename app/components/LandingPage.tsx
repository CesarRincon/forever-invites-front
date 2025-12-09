import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Heart, Sparkles, Users, Share2, Star, CheckCircle2, ChevronLeft, ChevronRight, Palette } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginModal } from "./LoginModal";
import { AuthModal } from "./AuthModal";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [currentTemplate, setCurrentTemplate] = useState(0);
  const router = useRouter()

  const templates = [
    {
      name: "Jardín Romántico",
      image: "https://images.unsplash.com/photo-1692167900605-e02666cadb6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZmxvd2VycyUyMGJvdXF1ZXR8ZW58MXx8fHwxNzYzMTIyNTI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "bg-[#f8e8e8]"
    },
    {
      name: "Elegancia Clásica",
      image: "https://images.unsplash.com/photo-1738694242379-ef21044985bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmluZ3MlMjBlbGVnYW50fGVufDF8fHx8MTc2MzE0MzkwNHww&ixlib=rb-4.1.0&q=80&w=1080",
      color: "bg-[#f5e6d3]"
    },
    {
      name: "Minimalista Moderno",
      image: "https://images.unsplash.com/photo-1646075514021-398d0925d4a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdGFibGUlMjBkZWNvcmF0aW9ufGVufDF8fHx8MTc2MzEyMTI5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      color: "bg-[#e8ebe7]"
    }
  ];

  const testimonials = [
    {
      name: "Sofía & Diego",
      text: "La mejor decisión para nuestra boda. Todos nuestros invitados pudieron confirmar fácilmente y el diseño era precioso.",
      rating: 5,
      date: "Junio 2024"
    },
    {
      name: "Laura & Carlos",
      text: "Súper fácil de usar y el resultado fue increíble. Ahorramos tiempo y dinero, y quedó más elegante que las invitaciones tradicionales.",
      rating: 5,
      date: "Agosto 2024"
    },
    {
      name: "Ana & Miguel",
      text: "El sistema de confirmación en tiempo real fue perfecto. Pudimos organizar todo mucho mejor y el diseño era justo lo que queríamos.",
      rating: 5,
      date: "Octubre 2024"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen min-h-[600px] overflow-hidden">
        <Navbar variant="transparent" />

        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1762941744800-385b067dff21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMGNvdXBsZXxlbnwxfHx8fDE3NjMxMTQ1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Wedding couple"
            className="w-full h-full object-cover md:object-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-2 text-center flex flex-col items-center justify-center">
            <div className="inline-flex items-center gap-2 backdrop-blur-md !px-4 py-2 rounded-md mb-6">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-white text-sm">Más de 10,000 parejas felices</span>
            </div>

            <h1 className="!text-white mb-6 max-w-4xl mx-auto">
              Invitaciones de boda digitales premium
            </h1>

            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 text-center">
              Crea invitaciones elegantes y personalizadas en minutos.
              Gestiona confirmaciones, comparte con tus invitados y haz tu boda inolvidable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center !mt-2">
              <AuthModal />
              {/* <button className="!px-8 !py-4 bg-white/10 backdrop-blur-md text-white rounded-md hover:bg-white/20 transition-all border border-white/30">
                Ver ejemplos
              </button> */}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 !mt-16">
              <div className="text-center">
                <div className="text-3xl md:text-4xl text-white mb-2">10,000+</div>
                <div className="text-white/80 text-sm">Bodas creadas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl text-white mb-2">98%</div>
                <div className="text-white/80 text-sm">Satisfacción</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl text-white mb-2">24h</div>
                <div className="text-white/80 text-sm">Soporte</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <section className="!py-20 bg-white">
        <div className="max-w-7xl mx-auto !px-4 !sm:px-6 !lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4">Cómo funciona</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Tres simples pasos para crear la invitación perfecta
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                step: "01",
                icon: Palette,
                title: "Elige tu plantilla",
                description: "Selecciona entre nuestras plantillas premium diseñadas profesionalmente"
              },
              {
                step: "02",
                icon: Heart,
                title: "Personaliza",
                description: "Añade tus detalles, fotos, colores y haz que sea única"
              },
              {
                step: "03",
                icon: Share2,
                title: "Comparte",
                description: "Envía tu invitación y gestiona confirmaciones en tiempo real"
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-[#faf3eb] to-[#f5e6d3] rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 h-full flex flex-col">
                  <div className="text-6xl text-[#e6b8a2]/20 mb-4 text-center">
                    {item.step}
                  </div>
                  <div className="bg-gradient-to-br from-[#e6b8a2] to-[#d19d86] w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="mb-3 text-center">{item.title}</h4>
                  <p className="text-gray-600 text-center">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
                    <ChevronRight className="w-8 h-8 text-[#e6b8a2]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Carousel */}
      <section className="py-20 bg-gradient-to-b from-[#faf3eb] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4">Plantillas diseñadas con amor</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Elige entre nuestras plantillas elegantes y personalízalas a tu gusto
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentTemplate * 100}%)` }}
              >
                {templates.map((template, index) => (
                  <div key={index} className="min-w-full">
                    <div className={`${template.color} p-8 md:p-16 min-h-[500px] flex items-center justify-center`}>
                      <div className="max-w-2xl">
                        <ImageWithFallback
                          src={template.image}
                          alt={template.name}
                          className="w-full h-96 object-cover rounded-3xl shadow-xl mb-6"
                        />
                        <h3 className="text-center">{template.name}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <button
              onClick={() => setCurrentTemplate((prev) => (prev - 1 + templates.length) % templates.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentTemplate((prev) => (prev + 1) % templates.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {templates.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTemplate(index)}
                  className={`w-3 h-3 rounded-full transition-all ${currentTemplate === index
                    ? "bg-[#e6b8a2] w-8"
                    : "bg-gray-300"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4">Todo lo que necesitas</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Herramientas profesionales para gestionar tu boda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: CheckCircle2, title: "Confirmaciones en tiempo real", desc: "Recibe respuestas al instante" },
              { icon: Users, title: "Gestión de invitados", desc: "Organiza por grupos y familias" },
              { icon: Heart, title: "Diseño personalizado", desc: "100% adaptable a tu estilo" },
              { icon: Share2, title: "Fácil de compartir", desc: "Link único para cada familia" },
              { icon: Sparkles, title: "Sin límite de invitados", desc: "Invita a todos sin restricciones" },
              { icon: Star, title: "Soporte premium", desc: "Te ayudamos en todo momento" }
            ].map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-[#faf3eb] to-[#f5e6d3] rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#e6b8a2]" />
                </div>
                <h5 className="mb-2">{feature.title}</h5>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-[#faf3eb] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4">Parejas felices</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Lee las experiencias de quienes ya confiaron en nosotros
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#e6b8a2] fill-[#e6b8a2]" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.date}</div>
                  </div>
                  <Heart className="w-6 h-6 text-[#e6b8a2] fill-[#e6b8a2]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#e6b8a2] to-[#d19d86]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-6">
            Comienza a crear tu invitación hoy
          </h2>
          <p className="text-white/90 text-lg mb-10">
            Únete a miles de parejas que ya han creado su invitación perfecta
          </p>
          <button
            onClick={onGetStarted}
            className="px-10 py-5 bg-white text-[#e6b8a2] rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg"
          >
            Crear mi invitación gratis
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}