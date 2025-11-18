import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CarouselProps {
  images: Array<{ src: string; caption: string }>;
  autoPlayInterval?: number;
}

export function Carousel({ images, autoPlayInterval = 4000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // --- TOUCH SWIPE ---
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;

    // sensibilidad del swipe
    if (distance > 50) goToNext(); // swipe left
    if (distance < -50) goToPrev(); // swipe right

    touchStartX.current = null;
    touchEndX.current = null;
  };
  // ---------------------

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    if (autoPlayInterval) {
      timeoutRef.current = setTimeout(() => {
        goToNext();
      }, autoPlayInterval);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, autoPlayInterval]);

  return (
    <div
      className="relative group"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main Carousel */}
      <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-800 ease-in-out ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
          >
            <ImageWithFallback
              src={image.src}
              alt={image.caption}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-[#f5f1ed]/40" />

            <div className="absolute bottom-8 left-0 right-0 text-center z-20">
              <p className="text-white text-2xl !font-alex px-4 drop-shadow-lg">
                {image.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 
          w-12 h-12 bg-[#f5f1ed]/80 hover:bg-[#f5f1ed] border border-[#8b9e8a]/40 
          rounded-full shadow-xl opacity-0 group-hover:opacity-100 
          transition-all flex items-center justify-center"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-[#6b7c6a]" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 
          w-12 h-12 bg-[#f5f1ed]/80 hover:bg-[#f5f1ed] border border-[#8b9e8a]/40 
          rounded-full shadow-xl opacity-0 group-hover:opacity-100 
          transition-all flex items-center justify-center"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-[#6b7c6a]" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex items-center justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${index === currentIndex
              ? "w-8 h-2 bg-[#8b9e8a]"
              : "w-2 h-2 bg-[#f5f1ed]/50 hover:bg-[#f5f1ed]/80"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
