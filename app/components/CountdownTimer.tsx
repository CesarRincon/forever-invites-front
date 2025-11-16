import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: Date;
  variant?: "default" | "elegant";
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ targetDate, variant = "default" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (variant === "elegant") {
    return (
      <div className="flex justify-center gap-4 md:gap-8">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-md p-4 md:p-6 shadow-lg border border-[#e6b8a2]/20 min-w-[70px] md:min-w-[90px]">
              <div className="text-3xl md:text-5xl text-[#e6b8a2] mb-1">
                {value.toString().padStart(2, '0')}
              </div>
              <div className="text-xs md:text-sm text-gray-600 uppercase tracking-wider">
                {unit === "days" ? "Días" : unit === "hours" ? "Horas" : unit === "minutes" ? "Min" : "Seg"}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-3 md:gap-6">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="bg-gradient-to-br from-[#e6b8a2] to-[#d19d86] text-white rounded-xl p-3 md:p-4 min-w-[60px] md:min-w-[80px]">
            <div className="text-2xl md:text-4xl mb-1">
              {value.toString().padStart(2, '0')}
            </div>
            <div className="text-[10px] md:text-xs uppercase tracking-wide opacity-90">
              {unit === "days" ? "Días" : unit === "hours" ? "Hrs" : unit === "minutes" ? "Min" : "Seg"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
