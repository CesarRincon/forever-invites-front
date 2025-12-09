import { Heart, Instagram, Facebook, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#faf3eb] to-[#f5e6d3] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-[#e6b8a2] to-[#d19d86] p-2 rounded-2xl">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-lg">ForeverInvites</span>
            </div>
            <p className="text-gray-600 text-sm mb-6">
              Crea invitaciones digitales únicas y elegantes para tu boda soñada.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#e6b8a2] hover:text-white transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#e6b8a2] hover:text-white transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#e6b8a2] hover:text-white transition-all">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Producto */}
          <div>
            <h6 className="mb-4 text-gray-800">Producto</h6>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-[#e6b8a2] transition-colors">
                  Plantillas
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#e6b8a2] transition-colors">
                  Características
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#e6b8a2] transition-colors">
                  Precios
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#e6b8a2] transition-colors">
                  Ejemplos
                </a>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h6 className="mb-4 text-gray-800">Recursos</h6>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-[#e6b8a2] transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#e6b8a2] transition-colors">
                  Guías
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#e6b8a2] transition-colors">
                  Centro de ayuda
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#e6b8a2] transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Compañía */}
          <div>
            <h6 className="mb-4 text-gray-800">Compañía</h6>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-[#e6b8a2] transition-colors">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#e6b8a2] transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#e6b8a2] transition-colors">
                  Términos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#e6b8a2] transition-colors">
                  Privacidad
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-300 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © 2025 ForeverInvites. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="w-4 h-4" />
              <a href="mailto:hola@foreverinvites.com" className="hover:text-[#e6b8a2] transition-colors">
                hola@foreverinvites.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
