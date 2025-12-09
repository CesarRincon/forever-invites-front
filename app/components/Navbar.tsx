import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  variant?: "transparent" | "solid";
}

export function Navbar({ variant = "solid" }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const bgClass = variant === "transparent"
    ? "bg-transparent absolute top-0 left-0 right-0 z-50"
    : "bg-white shadow-sm";

  const textClass = variant === "transparent"
    ? "text-white"
    : "text-gray-800";

  return (
    <nav className={`${bgClass} transition-all duration-300 px-4`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-[#e6b8a2] to-[#d19d86] p-2 rounded-2xl">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <span className={`${textClass} text-xl tracking-tight`}>
              ForeverInvites
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* <a href="#" className={`${textClass} hover:text-[#e6b8a2] transition-colors`}>
              Plantillas
            </a> */}
            <a href="#" className={`${textClass} hover:text-[#e6b8a2] transition-colors`}>
              Cómo funciona
            </a>
            <a href="#" className={`${textClass} hover:text-[#e6b8a2] transition-colors`}>
              Precios
            </a>
            <a href="#" className={`${textClass} hover:text-[#e6b8a2] transition-colors`}>
              Iniciar sesión
            </a>
            <button className="px-6 py-3 bg-gradient-to-r from-[#e6b8a2] to-[#d19d86] text-white rounded-md hover:shadow-lg transition-all duration-300 hover:scale-105">
              Comenzar gratis
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden ${textClass} p-2`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-md mt-4 p-6 space-y-4 mb-4">
            {/* <a href="#" className="block text-gray-800 hover:text-[#e6b8a2] transition-colors py-2">
              Plantillas
            </a> */}
            <a href="#" className="block text-gray-800 hover:text-[#e6b8a2] transition-colors py-2">
              Cómo funciona
            </a>
            <a href="#" className="block text-gray-800 hover:text-[#e6b8a2] transition-colors py-2">
              Precios
            </a>
            <a href="#" className="block text-gray-800 hover:text-[#e6b8a2] transition-colors py-2">
              Iniciar sesión
            </a>
            <button className="w-full px-6 py-3 bg-gradient-to-r from-[#e6b8a2] to-[#d19d86] text-white rounded-md hover:shadow-lg transition-all">
              Comenzar gratis
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
