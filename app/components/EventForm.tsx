'use client'
import { Calendar, MapPin, Palette, Music, Shirt, Upload, Save, Image as ImageIcon, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { EventData, useEventStore } from "../store/useEventStore";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useAuthStore } from "../store/useAuthStore";

const options = {
  spellChecker: false,
  placeholder: "Detalles sobre la vestimenta…",
  autofocus: false,
  status: false,
  toolbar: [
    "bold",
    "italic",
    "heading",
    "|",
    "unordered-list",
    "ordered-list",
    "|",
    "preview"
  ]
};

export function EventForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);
  const coupleInputRef = useRef<HTMLInputElement>(null);
  const venueInputRef = useRef<HTMLInputElement>(null);
  const highlightsInputRef = useRef<HTMLInputElement>(null);
  const memoizedOptions = useMemo(() => options, []);
  const user = useAuthStore((state) => state.user)

  const { eventData, setEventData, saveEvent, loadEvent } = useEventStore();

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

  // ===== Handlers =====
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, field: keyof EventData) => {
    const files = event.target.files;
    if (!files) return;
    const urls = Array.from(files).map(f => URL.createObjectURL(f));
    setEventData({ ...eventData, [field]: [...(eventData[field] || []), ...urls] });
  };

  const removeImage = (field: keyof EventData, index: number) => {
    const newArray = [...(eventData[field] || [])];
    newArray.splice(index, 1);
    setEventData({ ...eventData, [field]: newArray });
  };

  const handleSubmit = async () => {
    try {
      await saveEvent(user.id); // Aquí usas tu store para enviar a la DB
      alert("Evento guardado correctamente 🎉");
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al guardar el evento");
    }
  };

  const addGiftSuggestion = () => {
    setEventData({ ...eventData, giftSuggestions: [...(eventData.giftSuggestions || []), { name: "" }] });
  };

  const updateGiftSuggestion = (index: number, value: string) => {
    const newGifts = [...(eventData.giftSuggestions || [])];
    newGifts[index].name = value;
    setEventData({ ...eventData, giftSuggestions: newGifts });
  };

  const removeGiftSuggestion = (index: number) => {
    setEventData({ ...eventData, giftSuggestions: eventData.giftSuggestions.filter((_, i) => i !== index) });
  };

  const [loading, setLoading] = useState(true);

  const componentDidMount = async () => {
    if (user?.id) {
      await loadEvent(user.id);
      setLoading(false);
    }
  }

  useEffect(() => {
    componentDidMount()
  }, [user?.id]);


  const renderGallery = (
    title: string,
    images: string[],
    key: keyof EventData,
    inputRef: any
  ) => (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg">
      <h4 className="mb-6 flex items-center gap-2">
        <ImageIcon className="w-5 h-5 text-[#e6b8a2]" />
        {title} (máx. 3 imágenes)
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <div key={index} className="relative rounded-2xl overflow-hidden">
            <img
              src={img}
              alt={`${title} ${index + 1}`}
              className="w-full h-48 object-cover rounded-2xl"
            />
            <button
              onClick={() => {
                const newImages = [...images];
                newImages.splice(index, 1);
                setEventData({ ...eventData, [key]: newImages });
              }}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all shadow-lg"
            >
              <X className="w-2 h-2" />
            </button>
          </div>
        ))}

        {images.length < 3 && (
          <div
            onClick={() => inputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-[#e6b8a2] hover:bg-[#faf3eb] transition-all cursor-pointer"
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Subir imagen</p>
            <p className="text-sm text-gray-500">Recomendado: 1920x1080px, máximo 5MB</p>
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onloadend = () => {
                  setEventData(prev => ({
                    ...prev,
                    [key]: [...(prev[key] || []), reader.result as string],
                  }));
                };
                reader.readAsDataURL(file);
              }}
              className="hidden"
            />
          </div>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="p-4 md:p-8 w-full mx-auto animate-pulse space-y-6">
        {/* Sección */}
        <div className="bg-white rounded-md p-6 shadow-lg space-y-4">
          <div className="h-6 w-48 bg-gray-200 rounded"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>

            <div className="col-span-2 h-10 bg-gray-200 rounded"></div>
            <div className="col-span-2 h-20 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Otra sección */}
        <div className="bg-white rounded-md p-6 shadow-lg space-y-4">
          <div className="h-6 w-56 bg-gray-200 rounded"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>

        {/* Galería */}
        <div className="bg-white rounded-md p-6 shadow-lg">
          <div className="h-6 w-40 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-48 bg-gray-200 rounded-2xl"></div>
            <div className="h-48 bg-gray-200 rounded-2xl"></div>
            <div className="h-48 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  // ===== Render =====
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="mb-2">Configuración del evento</h2>
        <p className="text-gray-600">Personaliza todos los detalles de tu invitación</p>
      </div>

      <div className="space-y-6">
        {/* Información básica */}
        <div className="bg-white rounded-md p-6 md:p-8 shadow-lg">
          <h4 className="mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#e6b8a2]" />
            Información básica
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="bride">Nombre de la novia</Label>
              <Input
                id="bride"
                value={eventData.bride}
                onChange={(e) => setEventData({ ...eventData, bride: e.target.value })}
                placeholder="María"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="groom">Nombre del novio</Label>
              <Input
                id="groom"
                value={eventData.groom}
                onChange={(e) => setEventData({ ...eventData, groom: e.target.value })}
                placeholder="Alejandro"
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
            <div className="md:col-span-2">
              <Label htmlFor="mapLink">Link de Google Maps (opcional)</Label>
              <Input
                id="mapLink"
                value={eventData.mapLink || ""}
                onChange={(e) => setEventData({ ...eventData, mapLink: e.target.value })}
                placeholder="https://goo.gl/maps/ejemplo"
                className="mt-2"
              />
            </div>
          </div>
        </div>

        {/* Diseño y estilo */}
        {/* <div className="bg-white rounded-md p-6 md:p-8 shadow-lg">
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
                    className="group relative flex flex-col items-center gap-2"
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
        </div> */}

        {/* Detalles adicionales */}
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
                <SelectContent className="bg-white">
                  <SelectItem value="Formal">Formal</SelectItem>
                  <SelectItem value="Semi-formal">Semi-formal</SelectItem>
                  <SelectItem value="Casual elegante">Casual elegante</SelectItem>
                  <SelectItem value="Cocktail">Cocktail</SelectItem>
                  <SelectItem value="Black tie">Black tie</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="dressCodeDescription">Descripción del dress code</Label>
              <SimpleMDE
                value={eventData?.dressCodeDescription}
                onChange={(value) =>
                  setEventData({ ...eventData, dressCodeDescription: value })
                }
                options={memoizedOptions}
              />
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

        <div className="bg-white rounded-md p-6 md:p-8 shadow-lg">
          <h4 className="mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#e6b8a2]" />
            Itinerario del día
          </h4>

          <div className="space-y-4">
            {eventData.itinerary.map((item, index) => (
              <div key={index} className="flex gap-4 items-center p-4 bg-[#faf3eb] rounded-md">

                {/* Hora */}
                <Input
                  type="time"
                  value={item.time}
                  onChange={(e) => {
                    const updated = [...eventData.itinerary];
                    updated[index].time = e.target.value;
                    setEventData({ ...eventData, itinerary: updated });
                  }}
                  className="w-32"
                />

                {/* Evento */}
                <Input
                  value={item.event}
                  onChange={(e) => {
                    const updated = [...eventData.itinerary];
                    updated[index].event = e.target.value;
                    setEventData({ ...eventData, itinerary: updated });
                  }}
                  placeholder="Nombre del evento"
                  className="flex-1"
                />

                {/* Eliminar */}
                <button
                  onClick={() =>
                    setEventData({
                      ...eventData,
                      itinerary: eventData.itinerary.filter((_, i) => i !== index),
                    })
                  }
                  className="text-red-500 hover:text-red-700 px-3"
                >
                  Eliminar
                </button>

              </div>
            ))}

            {/* Agregar evento */}
            <button
              onClick={() =>
                setEventData({
                  ...eventData,
                  itinerary: [...eventData.itinerary, { time: "00:00", event: "" }],
                })
              }
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-md hover:border-[#e6b8a2] hover:bg-[#faf3eb] transition-all"
            >
              + Agregar evento
            </button>
          </div>
        </div>


        {/* Galerías de imágenes */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg">
          <h4 className="mb-6 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#e6b8a2]" />
            Hero Images (3 obligatorias)
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {eventData.heroImages.map((img, index) => (
              <div key={index} className="relative rounded-2xl overflow-hidden">
                <img
                  src={img}
                  alt={`Hero ${index + 1}`}
                  className="w-full h-48 object-cover rounded-2xl"
                />
                <button
                  onClick={() => {
                    const newImages = [...eventData.heroImages];
                    newImages.splice(index, 1);
                    setEventData({ ...eventData, heroImages: newImages });
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all shadow-lg"
                >
                  <X className="w-2 h-2" />
                </button>
              </div>
            ))}

            {eventData.heroImages.length < 3 && (
              <div
                onClick={() => heroInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-[#e6b8a2] hover:bg-[#faf3eb] transition-all cursor-pointer"
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Subir imagen</p>
                <p className="text-sm text-gray-500">Recomendado: 1920x1080px, máximo 5MB</p>
                <input
                  type="file"
                  accept="image/*"
                  ref={heroInputRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setEventData({
                          heroImages: [...eventData.heroImages, reader.result as string],
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                />
              </div>
            )}
          </div>
        </div>

        {renderGallery("Galería Novios", eventData.galleryCouple, "galleryCouple", coupleInputRef)}
        {renderGallery("Galería Lugar", eventData.galleryVenue, "galleryVenue", venueInputRef)}
        {renderGallery("Galería Momentos", eventData.galleryHighlights, "galleryHighlights", highlightsInputRef)}


        {/* Gift Suggestions */}
        <div className="bg-white rounded-md p-6 md:p-8 shadow-lg">
          <h4 className="mb-6 flex items-center gap-2">🎁 Sugerencias de regalos</h4>
          <div className="space-y-2">
            {(eventData.giftSuggestions || []).map((gift, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <Input
                  value={gift.name}
                  onChange={(e) => updateGiftSuggestion(idx, e.target.value)}
                  placeholder="Nombre del regalo"
                  className="flex-1"
                />
                <button
                  onClick={() => removeGiftSuggestion(idx)}
                  className="text-red-500"
                >
                  Eliminar
                </button>
              </div>
            ))}
            <button
              onClick={addGiftSuggestion}
              className="mt-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-md hover:border-[#e6b8a2]"
            >
              + Agregar regalo
            </button>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 sticky bottom-4 bg-white/80 backdrop-blur-lg rounded-md p-4 shadow-2xl">
          <button className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-md hover:bg-gray-50 transition-all">
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-[#e6b8a2] to-[#d19d86] text-white rounded-md hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
