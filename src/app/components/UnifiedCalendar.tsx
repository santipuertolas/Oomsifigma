import { ChevronLeft, ChevronRight } from "lucide-react";

interface Booking {
  id: string;
  guest: string;
  property: string;
  propertyImg: string;
  startDay: number;
  endDay: number;
  source: "airbnb" | "booking" | "direct";
  color: string;
}

const bookings: Booking[] = [
  {
    id: "1",
    guest: "Marco R.",
    property: "Seaside Villa",
    propertyImg: "",
    startDay: 1,
    endDay: 5,
    source: "airbnb",
    color: "#FF5A5F",
  },
  {
    id: "2",
    guest: "Yuki T.",
    property: "Mountain Cabin",
    propertyImg: "",
    startDay: 3,
    endDay: 8,
    source: "booking",
    color: "#003580",
  },
  {
    id: "3",
    guest: "Emma L.",
    property: "Beach House",
    propertyImg: "",
    startDay: 7,
    endDay: 12,
    source: "direct",
    color: "#2A9D8F",
  },
  {
    id: "4",
    guest: "James W.",
    property: "Seaside Villa",
    propertyImg: "",
    startDay: 10,
    endDay: 15,
    source: "airbnb",
    color: "#FF5A5F",
  },
  {
    id: "5",
    guest: "Sofia P.",
    property: "Beach House",
    propertyImg: "",
    startDay: 15,
    endDay: 20,
    source: "booking",
    color: "#003580",
  },
  {
    id: "6",
    guest: "Chen W.",
    property: "Mountain Cabin",
    propertyImg: "",
    startDay: 12,
    endDay: 18,
    source: "direct",
    color: "#2A9D8F",
  },
];

const properties = ["Seaside Villa", "Mountain Cabin", "Beach House"];
const days = Array.from({ length: 21 }, (_, i) => i + 1);

const sourceLabels: Record<string, string> = {
  airbnb: "Airbnb",
  booking: "Booking.com",
  direct: "Direct",
};

export function UnifiedCalendar() {
  const today = 27;

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden"
      style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.06)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <h2
            style={{
              fontFamily: "Nunito, sans-serif",
              color: "#264653",
              fontSize: "1.125rem",
              fontWeight: 700,
            }}
          >
            Unified Calendar
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.75rem",
              color: "#2D3436",
              opacity: 0.5,
            }}
          >
            February 2026
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-3 mr-4">
            {[
              { label: "Airbnb", color: "#FF5A5F" },
              { label: "Booking.com", color: "#003580" },
              { label: "Direct", color: "#2A9D8F" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-1.5">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.6875rem",
                    color: "#2D3436",
                    opacity: 0.5,
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <button className="p-1.5 rounded-lg hover:bg-gray-50 transition-colors text-gray-400">
            <ChevronLeft size={18} />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-gray-50 transition-colors text-gray-400">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          {/* Day numbers header */}
          <div className="flex border-b border-gray-50">
            <div className="w-[140px] shrink-0" />
            <div className="flex-1 flex">
              {days.map((day) => (
                <div
                  key={day}
                  className="flex-1 text-center py-2.5"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.6875rem",
                    color: "#2D3436",
                    opacity: 0.4,
                    fontWeight: 500,
                  }}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Property rows */}
          {properties.map((property, pi) => {
            const propertyBookings = bookings.filter(
              (b) => b.property === property
            );
            return (
              <div
                key={property}
                className={`flex items-center ${
                  pi < properties.length - 1 ? "border-b border-gray-50" : ""
                }`}
                style={{ minHeight: "64px" }}
              >
                {/* Property name */}
                <div className="w-[140px] shrink-0 px-5">
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.8125rem",
                      color: "#264653",
                      fontWeight: 500,
                    }}
                  >
                    {property}
                  </p>
                </div>

                {/* Timeline area */}
                <div className="flex-1 relative" style={{ height: "56px" }}>
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex">
                    {days.map((day) => (
                      <div
                        key={day}
                        className="flex-1 border-l border-gray-50/60"
                      />
                    ))}
                  </div>

                  {/* Booking bars */}
                  {propertyBookings.map((booking) => {
                    const left = `${((booking.startDay - 1) / 21) * 100}%`;
                    const width = `${
                      ((booking.endDay - booking.startDay) / 21) * 100
                    }%`;
                    return (
                      <div
                        key={booking.id}
                        className="absolute top-3 rounded-lg px-2.5 py-1 flex items-center gap-1.5 cursor-pointer hover:opacity-90 transition-opacity"
                        style={{
                          left,
                          width,
                          backgroundColor: booking.color + "18",
                          borderLeft: `3px solid ${booking.color}`,
                          height: "32px",
                        }}
                      >
                        <span
                          className="truncate"
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "0.6875rem",
                            color: booking.color,
                            fontWeight: 500,
                          }}
                        >
                          {booking.guest}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
