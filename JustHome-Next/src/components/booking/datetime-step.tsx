"use client";

import { TIME_SLOTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface DateTimeStepProps {
  date: string;
  time: string;
  onDateChange: (v: string) => void;
  onTimeChange: (v: string) => void;
}

export function DateTimeStep({ date, time, onDateChange, onTimeChange }: DateTimeStepProps) {
  const minDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };

  return (
    <div className="space-y-5">
      <h2 className="font-semibold">Select date & time</h2>
      <input
        type="date"
        min={minDate()}
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
        className="w-full h-12 rounded-xl border border-border bg-card px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
      />
      <div className="grid grid-cols-3 gap-2">
        {TIME_SLOTS.map((slot) => (
          <button
            key={slot}
            onClick={() => onTimeChange(slot)}
            className={cn(
              "rounded-xl border py-2.5 text-sm font-medium transition-all duration-300",
              time === slot ? "border-accent bg-accent/10 text-accent" : "border-border hover:bg-muted"
            )}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
}
