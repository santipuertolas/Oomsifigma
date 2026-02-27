import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface Booking {
  id: string;
  guest: string;
  property: string;
  startDay: number;
  endDay: number;
  source: "airbnb" | "booking" | "direct";
  color: string;
  nights: number;
  revenue: string;
}

const bookings: Booking[] = [
  { id: "1", guest: "Marco R.", property: "Seaside Villa", startDay: 1, endDay: 5, source: "airbnb", color: "#FF5A5F", nights: 4, revenue: "$1,200" },
  { id: "2", guest: "Yuki T.", property: "Mountain Cabin", startDay: 3, endDay: 8, source: "booking", color: "#003580", nights: 5, revenue: "$875" },
  { id: "3", guest: "Emma L.", property: "Beach House", startDay: 7, endDay: 12, source: "direct", color: "#2A9D8F", nights: 5, revenue: "$1,500" },
  { id: "4", guest: "James W.", property: "Seaside Villa", startDay: 10, endDay: 15, source: "airbnb", color: "#FF5A5F", nights: 5, revenue: "$1,500" },
  { id: "5", guest: "Sofia P.", property: "Beach House", startDay: 15, endDay: 20, source: "booking", color: "#003580", nights: 5, revenue: "$1,250" },
  { id: "6", guest: "Chen W.", property: "Mountain Cabin", startDay: 12, endDay: 18, source: "direct", color: "#2A9D8F", nights: 6, revenue: "$1,050" },
  { id: "7", guest: "Aisha K.", property: "Tropical Resort", startDay: 5, endDay: 11, source: "airbnb", color: "#FF5A5F", nights: 6, revenue: "$2,100" },
  { id: "8", guest: "Hans M.", property: "City Apartment", startDay: 8, endDay: 14, source: "booking", color: "#003580", nights: 6, revenue: "$900" },
  { id: "9", guest: "Olivia J.", property: "Lakeside Cottage", startDay: 18, endDay: 25, source: "direct", color: "#2A9D8F", nights: 7, revenue: "$1,400" },
  { id: "10", guest: "Liam B.", property: "Tropical Resort", startDay: 14, endDay: 21, source: "booking", color: "#003580", nights: 7, revenue: "$2,450" },
];

const properties = ["Seaside Villa", "Mountain Cabin", "Beach House", "Tropical Resort", "City Apartment", "Lakeside Cottage"];
const days = Array.from({ length: 28 }, (_, i) => i + 1);
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Nightly pricing per property
const nightlyPrices: Record<string, number[]> = {
  "Seaside Villa": days.map((d) => { const base = 280; const wknd = (d + 5) % 7 >= 5 ? 60 : 0; return base + wknd + Math.round(Math.sin(d / 4) * 30); }),
  "Mountain Cabin": days.map((d) => { const base = 165; const wknd = (d + 5) % 7 >= 5 ? 35 : 0; return base + wknd + Math.round(Math.sin(d / 5) * 20); }),
  "Beach House": days.map((d) => { const base = 250; const wknd = (d + 5) % 7 >= 5 ? 50 : 0; return base + wknd + Math.round(Math.cos(d / 3) * 25); }),
  "Tropical Resort": days.map((d) => { const base = 350; const wknd = (d + 5) % 7 >= 5 ? 80 : 0; return base + wknd + Math.round(Math.sin(d / 6) * 40); }),
  "City Apartment": days.map((d) => { const base = 120; const wknd = (d + 5) % 7 >= 5 ? 25 : 0; return base + wknd + Math.round(Math.cos(d / 4) * 15); }),
  "Lakeside Cottage": days.map((d) => { const base = 195; const wknd = (d + 5) % 7 >= 5 ? 40 : 0; return base + wknd + Math.round(Math.sin(d / 3) * 20); }),
};

const sourceFilters = [
  { key: "all", label: "All Sources" },
  { key: "airbnb", label: "Airbnb", color: "#FF5A5F" },
  { key: "booking", label: "Booking.com", color: "#003580" },
  { key: "direct", label: "Direct", color: "#2A9D8F" },
];

// Feb 2026 starts on Sunday — perfect 4-week grid
const weeks = [
  [1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21],
  [22, 23, 24, 25, 26, 27, 28],
];

export function CalendarPage() {
  const [activeSource, setActiveSource] = useState("all");
  const [expandedProperty, setExpandedProperty] = useState<string | null>(null);

  const filteredBookings = activeSource === "all"
    ? bookings
    : bookings.filter((b) => b.source === activeSource);

  return (
    <div>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "1.5rem", fontWeight: 700 }}>
            Calendar
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "#2D3436", opacity: 0.5 }}>
            Unified view across all booking channels
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {sourceFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveSource(f.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${activeSource === f.key ? "shadow-sm" : ""}`}
              style={{
                fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 500,
                backgroundColor: activeSource === f.key ? "white" : "transparent",
                color: activeSource === f.key ? (f.color || "#264653") : "#2D343680",
                border: activeSource === f.key ? `1px solid ${f.color || "#26465320"}` : "1px solid transparent",
              }}
            >
              {f.color && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: f.color }} />}
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar timeline */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.06)" }}>
        {/* Month nav */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <button className="p-1.5 rounded-lg hover:bg-gray-50 transition-colors text-gray-400">
            <ChevronLeft size={18} />
          </button>
          <span style={{ fontFamily: "Nunito, sans-serif", fontSize: "1rem", color: "#264653", fontWeight: 700 }}>
            February 2026
          </span>
          <button className="p-1.5 rounded-lg hover:bg-gray-50 transition-colors text-gray-400">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Timeline */}
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Day headers */}
            <div className="flex border-b border-gray-50">
              <div className="w-[160px] shrink-0" />
              <div className="flex-1 flex">
                {days.map((day) => (
                  <div key={day} className="flex-1 text-center py-2">
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5625rem", color: "#2D3436", opacity: 0.35 }}>
                      {dayNames[(day + 5) % 7]}
                    </span>
                    <br />
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif", fontSize: "0.6875rem",
                        color: day === 27 ? "#2A9D8F" : "#2D3436",
                        opacity: day === 27 ? 1 : 0.4,
                        fontWeight: day === 27 ? 700 : 500,
                      }}
                    >
                      {day}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Property rows */}
            {properties.map((property, pi) => {
              const propertyBookings = filteredBookings.filter((b) => b.property === property);
              const isExpanded = expandedProperty === property;
              return (
                <div key={property} className={pi < properties.length - 1 ? "border-b border-gray-50" : ""}>
                  <div className="flex items-center" style={{ minHeight: "60px" }}>
                    <div
                      className="w-[160px] shrink-0 px-5 cursor-pointer group"
                      onClick={() => setExpandedProperty(isExpanded ? null : property)}
                    >
                      <p style={{
                        fontFamily: "Inter, sans-serif", fontSize: "0.8125rem",
                        color: isExpanded ? "#2A9D8F" : "#264653",
                        fontWeight: isExpanded ? 600 : 500,
                        transition: "color 0.15s",
                      }}>
                        {property}
                      </p>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5625rem", color: "#2A9D8F", opacity: 0, transition: "opacity 0.15s" }}
                        className="group-hover:!opacity-60"
                      >
                        {isExpanded ? "Close calendar" : "Open calendar"}
                      </p>
                    </div>
                    <div className="flex-1 relative" style={{ height: "52px" }}>
                      <div className="absolute inset-0 flex">
                        {days.map((day) => (
                          <div key={day} className="flex-1" style={{ borderLeft: "1px solid #F3F4F6", backgroundColor: day === 27 ? "#2A9D8F08" : "transparent" }} />
                        ))}
                      </div>
                      {propertyBookings.map((booking) => {
                        const left = `${((booking.startDay - 1) / 28) * 100}%`;
                        const width = `${((booking.endDay - booking.startDay) / 28) * 100}%`;
                        return (
                          <div key={booking.id}
                            className="absolute top-2.5 rounded-lg px-2 py-1 flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
                            style={{ left, width, backgroundColor: booking.color + "18", borderLeft: `3px solid ${booking.color}`, height: "30px" }}
                          >
                            <span className="truncate" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: booking.color, fontWeight: 500 }}>
                              {booking.guest}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Expanded property month grid calendar */}
      {expandedProperty && (
        <PropertyMonthCalendar
          property={expandedProperty}
          bookings={filteredBookings.filter((b) => b.property === expandedProperty)}
          prices={nightlyPrices[expandedProperty]}
          onClose={() => setExpandedProperty(null)}
        />
      )}
    </div>
  );
}

/* ─── Month grid calendar for a single property ─── */

function PropertyMonthCalendar({
  property,
  bookings: propBookings,
  prices,
  onClose,
}: {
  property: string;
  bookings: Booking[];
  prices: number[];
  onClose: () => void;
}) {
  const colDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // For each booking, compute which cells it occupies per week row
  // so we can render spanning bars within the grid
  function getBookingSegments(booking: Booking) {
    const segments: { weekIdx: number; startCol: number; endCol: number }[] = [];
    for (let wi = 0; wi < weeks.length; wi++) {
      const weekStart = weeks[wi][0];
      const weekEnd = weeks[wi][6];
      // Does this booking overlap this week?
      if (booking.startDay <= weekEnd && booking.endDay > weekStart) {
        const startCol = Math.max(0, booking.startDay - weekStart);
        const endCol = Math.min(7, booking.endDay - weekStart);
        segments.push({ weekIdx: wi, startCol, endCol });
      }
    }
    return segments;
  }

  // Collect all segments grouped by week for layering
  const weekSegments: { weekIdx: number; startCol: number; endCol: number; booking: Booking }[][] =
    weeks.map(() => []);

  propBookings.forEach((b) => {
    const segs = getBookingSegments(b);
    segs.forEach((s) => {
      weekSegments[s.weekIdx].push({ ...s, booking: b });
    });
  });

  return (
    <div className="mt-6 bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.06)" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <h2 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "1.125rem", fontWeight: 700 }}>
            {property}
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#2D3436", opacity: 0.5 }}>
            February 2026 — {propBookings.length} booking{propBookings.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <X size={16} style={{ color: "#264653" }} />
        </button>
      </div>

      {/* Day-of-week header */}
      <div className="grid grid-cols-7 border-b border-gray-100">
        {colDays.map((d) => (
          <div key={d} className="text-center py-2.5" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.4, fontWeight: 500 }}>
            {d}
          </div>
        ))}
      </div>

      {/* Week rows */}
      {weeks.map((week, wi) => {
        const segments = weekSegments[wi];
        return (
          <div key={wi} className={`relative ${wi < weeks.length - 1 ? "border-b border-gray-50" : ""}`}>
            {/* Day cells */}
            <div className="grid grid-cols-7">
              {week.map((day, di) => {
                const price = prices[day - 1];
                const isToday = day === 27;
                const isBooked = propBookings.some((b) => day >= b.startDay && day < b.endDay);
                const isWeekend = di >= 5;

                return (
                  <div
                    key={day}
                    className={`relative px-2 pt-2 pb-10 ${di < 6 ? "border-r border-gray-50" : ""}`}
                    style={{ minHeight: "80px" }}
                  >
                    {/* Day number */}
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`inline-flex items-center justify-center ${isToday ? "w-6 h-6 rounded-full" : ""}`}
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "0.8125rem",
                          color: isToday ? "white" : isBooked ? "#264653" : "#2D3436",
                          fontWeight: isToday ? 700 : 500,
                          opacity: isToday ? 1 : isBooked ? 0.9 : 0.45,
                          backgroundColor: isToday ? "#2A9D8F" : "transparent",
                        }}
                      >
                        {day}
                      </span>
                    </div>
                    {/* Nightly price */}
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.625rem",
                        color: isBooked ? "#2D3436" : isWeekend ? "#264653" : "#2D3436",
                        opacity: isBooked ? 0.3 : isWeekend ? 0.55 : 0.35,
                        fontWeight: isWeekend ? 500 : 400,
                      }}
                    >
                      ${price}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Booking bars overlaid on this week row */}
            {segments.map((seg, si) => {
              const leftPct = (seg.startCol / 7) * 100;
              const widthPct = ((seg.endCol - seg.startCol) / 7) * 100;
              const isStart = seg.booking.startDay >= weeks[wi][0];
              const isEnd = seg.booking.endDay <= weeks[wi][6] + 1;

              return (
                <div
                  key={`${seg.booking.id}-${wi}`}
                  className="absolute flex items-center px-2.5 cursor-pointer hover:opacity-90 transition-opacity"
                  style={{
                    left: `${leftPct}%`,
                    width: `${widthPct}%`,
                    bottom: "8px",
                    height: "28px",
                    backgroundColor: seg.booking.color + "18",
                    borderLeft: isStart ? `3px solid ${seg.booking.color}` : "none",
                    borderRadius: isStart && isEnd ? "8px" : isStart ? "8px 0 0 8px" : isEnd ? "0 8px 8px 0" : "0",
                  }}
                >
                  {isStart && (
                    <span
                      className="truncate"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.6875rem",
                        color: seg.booking.color,
                        fontWeight: 500,
                      }}
                    >
                      {seg.booking.guest}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}

      {/* Summary footer */}
      <div className="px-6 py-4 border-t border-gray-100 flex flex-wrap gap-4">
        {propBookings.map((b) => (
          <div key={b.id} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: b.color }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#264653", fontWeight: 500 }}>{b.guest}</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.625rem", color: "#2D3436", opacity: 0.4 }}>
              Feb {b.startDay}–{b.endDay} · {b.nights}n
            </span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2A9D8F", fontWeight: 600 }}>{b.revenue}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
