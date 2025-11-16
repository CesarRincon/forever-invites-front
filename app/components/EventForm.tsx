'use client'
import { Calendar, MapPin, Palette, Music, Shirt, Upload, Save, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function EventForm() {
  const [eventData, setEventData] = useState({
    coupleName: "María & Alejandro",
    date: "2025-06-15",
    time: "18:00",
    venue: "Hacienda Los Rosales",
    address: "Calle Principal 123, Ciudad",
    color: "#e6b8a2",
    template: "romantic-garden",
    music: "",
    dressCode: "Formal",
    message: "Nos encantaría que nos acompañes en este día tan especial"
  });

  const templates = [
    { id: "romantic-garden", name: "Jardín Romántico", color: "#f8e8e8" },
    { id: "classic-elegance", name: "Elegancia Clásica", color: "#f5e6d3" },
    { id: "modern-minimal", name: "Minimalista Moderno", color: "#e8ebe7" },
    { id: "rustic-charm", name: "Encanto Rústico", color: "#d4d8d0" }
  ];

  const colors = [
    { name: "Rose Gold", value: "#e6b8a2" },
    { name: "Blush Pink", value: "#f8e8e8" },
    { name: "Nude", value: "#f5e6d3" },
    { name: "Sage Green", value: "#d4d8d0" },
    { name: "Champagne", value: "#f7e7ce" },
    { name: "Lavender", value: "#e6e6fa" }
  ];

  const [itinerary, setItinerary] = useState([
    { time: "18:00", event: "Ceremonia" },
    { time: "19:30", event: "Cóctel" },
    { time: "21:00", event: "Recepción" },
    { time: "23:00", event: "Fiesta" }
  ]);

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="mb-2">Configuración del evento</h2>
        <p className="text-gray-600">
          Personaliza todos los detalles de tu invitación
        </p>
      </div>

      <div className="space-y-6">
        {/* Basic Info Card */}
        <div className="bg-white rounded-md p-6 md:p-8 shadow-lg">
          <h4 className="mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#e6b8a2]" />
            Información básica
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="coupleName">Nombres de los novios</Label>
              <Input
                id="coupleName"
                value={eventData.coupleName}
                onChange={(e) => setEventData({ ...eventData, coupleName: e.target.value })}
                placeholder="María & Alejandro"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="date">Fecha del evento</Label>
              <Input
                id="date"
                type="date"
                value={eventData.date}
                onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="time">Hora</Label>
              <Input
                id="time"
                type="time"
                value={eventData.time}
                onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="venue">Lugar del evento</Label>
              <Input
                id="venue"
                value={eventData.venue}
                onChange={(e) => setEventData({ ...eventData, venue: e.target.value })}
                placeholder="Hacienda Los Rosales"
                className="mt-2"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="address">Dirección completa</Label>
              <Input
                id="address"
                value={eventData.address}
                onChange={(e) => setEventData({ ...eventData, address: e.target.value })}
                placeholder="Calle Principal 123, Ciudad"
                className="mt-2"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="message">Mensaje de bienvenida</Label>
              <Textarea
                id="message"
                value={eventData.message}
                onChange={(e) => setEventData({ ...eventData, message: e.target.value })}
                placeholder="Escribe un mensaje especial para tus invitados"
                className="mt-2"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Design Card */}
        <div className="bg-white rounded-md p-6 md:p-8 shadow-lg">
          <h4 className="mb-6 flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#e6b8a2]" />
            Diseño y estilo
          </h4>

          <div className="space-y-6">
            <div>
              <Label>Plantilla</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setEventData({ ...eventData, template: template.id })}
                    className={`p-4 rounded-2xl border-2 transition-all ${eventData.template === template.id
                      ? "border-[#e6b8a2] shadow-lg"
                      : "border-gray-200 hover:border-[#e6b8a2]/50"
                      }`}
                  >
                    <div
                      className="w-full h-24 rounded-xl mb-3"
                      style={{ backgroundColor: template.color }}
                    />
                    <div className="text-sm text-center">{template.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label>Color principal</Label>
              <div className="flex flex-wrap gap-4 mt-3 justify-center md:justify-start">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setEventData({ ...eventData, color: color.value })}
                    className={`group relative flex flex-col items-center gap-2`}
                  >
                    <div
                      className={`w-14 h-14 rounded-full border-4 transition-all shadow-md ${eventData.color === color.value
                        ? "border-gray-800 scale-110 shadow-lg"
                        : "border-white hover:scale-105"
                        }`}
                      style={{ backgroundColor: color.value }}
                    />
                    <span className="text-xs text-gray-600 text-center whitespace-nowrap">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details Card */}
        <div className="bg-white rounded-md p-6 md:p-8 shadow-lg">
          <h4 className="mb-6 flex items-center gap-2">
            <Shirt className="w-5 h-5 text-[#e6b8a2]" />
            Detalles adicionales
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="dressCode">Código de vestimenta</Label>
              <Select value={eventData.dressCode} onValueChange={(value) => setEventData({ ...eventData, dressCode: value })}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Formal">Formal</SelectItem>
                  <SelectItem value="Semi-formal">Semi-formal</SelectItem>
                  <SelectItem value="Casual elegante">Casual elegante</SelectItem>
                  <SelectItem value="Cocktail">Cocktail</SelectItem>
                  <SelectItem value="Black tie">Black tie</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="music">Canción especial (opcional)</Label>
              <Input
                id="music"
                value={eventData.music}
                onChange={(e) => setEventData({ ...eventData, music: e.target.value })}
                placeholder="URL de Spotify o YouTube"
                className="mt-2"
              />
            </div>
          </div>
        </div>

        {/* Itinerary Card */}
        <div className="bg-white rounded-md p-6 md:p-8 shadow-lg">
          <h4 className="mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#e6b8a2]" />
            Itinerario del día
          </h4>

          <div className="space-y-4">
            {itinerary.map((item, index) => (
              <div key={index} className="flex gap-4 items-center p-4 bg-[#faf3eb] rounded-md">
                <Input
                  type="time"
                  value={item.time}
                  onChange={(e) => {
                    const newItinerary = [...itinerary];
                    newItinerary[index].time = e.target.value;
                    setItinerary(newItinerary);
                  }}
                  className="w-32"
                />
                <Input
                  value={item.event}
                  onChange={(e) => {
                    const newItinerary = [...itinerary];
                    newItinerary[index].event = e.target.value;
                    setItinerary(newItinerary);
                  }}
                  placeholder="Nombre del evento"
                  className="flex-1"
                />
                <button
                  onClick={() => setItinerary(itinerary.filter((_, i) => i !== index))}
                  className="text-red-500 hover:text-red-700 px-3"
                >
                  Eliminar
                </button>
              </div>
            ))}
            <button
              onClick={() => setItinerary([...itinerary, { time: "00:00", event: "" }])}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-md hover:border-[#e6b8a2] hover:bg-[#faf3eb] transition-all"
            >
              + Agregar evento
            </button>
          </div>
        </div>

        {/* Cover Image Card */}
        <div className="bg-white rounded-md p-6 md:p-8 shadow-lg">
          <h4 className="mb-6 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#e6b8a2]" />
            Imagen de portada
          </h4>

          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-[#e6b8a2] hover:bg-[#faf3eb] transition-all cursor-pointer">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Haz clic para subir o arrastra una imagen</p>
            <p className="text-sm text-gray-500">Recomendado: 1920x1080px, máximo 5MB</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sticky bottom-4 bg-white/80 backdrop-blur-lg rounded-md p-4 shadow-2xl">
          <button className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-md hover:bg-gray-50 transition-all">
            Cancelar
          </button>
          <button className="flex-1 px-6 py-4 bg-gradient-to-r from-[#e6b8a2] to-[#d19d86] text-white rounded-md hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2">
            <Save className="w-5 h-5" />
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}