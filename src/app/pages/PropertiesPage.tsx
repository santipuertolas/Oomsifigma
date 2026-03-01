import { useState } from "react";
import {
  MapPin, Bed, Bath, Users, Star, Globe, Plus, Search, X,
  CheckCircle2, ExternalLink, Edit3, Check, UserCircle,
  Link2, Copy, Unlink, ChevronDown,
} from "lucide-react";

interface Cleaner {
  name: string;
  avatar: string;
  role: "primary" | "backup";
}

interface Property {
  id: string;
  name: string;
  image: string;
  location: string;
  beds: number;
  baths: number;
  guests: number;
  rating: number;
  reviews: number;
  occupancy: string;
  monthlyRevenue: string;
  status: "active" | "maintenance" | "inactive";
  channels: { name: string; color: string; connected: boolean }[];
  directBookingEnabled: boolean;
  directBookingUrl: string;
  amenities: string[];
  cleaners: Cleaner[];
  checkInTime: string;
  checkOutTime: string;
  nightlyRate: string;
}

const properties: Property[] = [
  {
    id: "1", name: "Seaside Villa",
    image: "https://images.unsplash.com/photo-1521783593447-5702b9bfd267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2YWNhdGlvbiUyMHJlbnRhbCUyMHZpbGxhfGVufDF8fHx8MTc3MjE5ODg1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    location: "Costa del Sol, Spain", beds: 4, baths: 3, guests: 8, rating: 4.9, reviews: 127,
    occupancy: "92%", monthlyRevenue: "$8,400", status: "active",
    channels: [{ name: "Airbnb", color: "#FF5A5F", connected: true }, { name: "Booking.com", color: "#003580", connected: true }],
    directBookingEnabled: true, directBookingUrl: "seaside-villa.oomsi.co",
    amenities: ["Pool", "WiFi", "Parking", "Kitchen"],
    cleaners: [{ name: "Maria Santos", avatar: "MS", role: "primary" }, { name: "Carlos Diaz", avatar: "CD", role: "backup" }],
    checkInTime: "3:00 PM", checkOutTime: "11:00 AM", nightlyRate: "$280",
  },
  {
    id: "2", name: "Mountain Cabin",
    image: "https://images.unsplash.com/photo-1634849662801-a00d83441092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwbW91bnRhaW4lMjBjYWJpbiUyMGludGVyaW9yfGVufDF8fHx8MTc3MjE5ODg1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    location: "Aspen, Colorado", beds: 2, baths: 2, guests: 4, rating: 4.8, reviews: 89,
    occupancy: "78%", monthlyRevenue: "$5,200", status: "active",
    channels: [{ name: "Airbnb", color: "#FF5A5F", connected: true }, { name: "Booking.com", color: "#003580", connected: false }],
    directBookingEnabled: false, directBookingUrl: "",
    amenities: ["Fireplace", "WiFi", "Hot Tub"],
    cleaners: [{ name: "Maria Santos", avatar: "MS", role: "primary" }],
    checkInTime: "4:00 PM", checkOutTime: "10:00 AM", nightlyRate: "$165",
  },
  {
    id: "3", name: "Beach House",
    image: "https://images.unsplash.com/photo-1765124540398-d717b5b06f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWFjaCUyMGhvdXNlJTIwcmVudGFsfGVufDF8fHx8MTc3MjE5ODg1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    location: "Malibu, California", beds: 3, baths: 2, guests: 6, rating: 4.7, reviews: 64,
    occupancy: "85%", monthlyRevenue: "$7,100", status: "active",
    channels: [{ name: "Airbnb", color: "#FF5A5F", connected: true }, { name: "Booking.com", color: "#003580", connected: true }],
    directBookingEnabled: true, directBookingUrl: "beach-house.oomsi.co",
    amenities: ["Beach Access", "WiFi", "BBQ", "Parking"],
    cleaners: [{ name: "Carlos Diaz", avatar: "CD", role: "primary" }],
    checkInTime: "3:00 PM", checkOutTime: "11:00 AM", nightlyRate: "$250",
  },
  {
    id: "4", name: "Tropical Resort",
    image: "https://images.unsplash.com/photo-1728049006343-9ee0187643d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHJlc29ydCUyMHBvb2wlMjB2aWxsYXxlbnwxfHx8fDE3NzIyMDAxNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    location: "Bali, Indonesia", beds: 5, baths: 4, guests: 10, rating: 4.95, reviews: 203,
    occupancy: "96%", monthlyRevenue: "$12,800", status: "active",
    channels: [{ name: "Airbnb", color: "#FF5A5F", connected: true }, { name: "Booking.com", color: "#003580", connected: true }],
    directBookingEnabled: true, directBookingUrl: "tropical-resort.oomsi.co",
    amenities: ["Pool", "Spa", "WiFi", "Chef", "Parking"],
    cleaners: [{ name: "Carlos Diaz", avatar: "CD", role: "primary" }, { name: "Anna Kowalski", avatar: "AK", role: "backup" }],
    checkInTime: "2:00 PM", checkOutTime: "12:00 PM", nightlyRate: "$350",
  },
  {
    id: "5", name: "City Apartment",
    image: "https://images.unsplash.com/photo-1695918808943-9db9cddc1ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBjaXR5JTIwc2t5bGluZXxlbnwxfHx8fDE3NzIyMDAxNzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    location: "Barcelona, Spain", beds: 1, baths: 1, guests: 2, rating: 4.6, reviews: 42,
    occupancy: "71%", monthlyRevenue: "$2,900", status: "maintenance",
    channels: [{ name: "Airbnb", color: "#FF5A5F", connected: true }],
    directBookingEnabled: false, directBookingUrl: "",
    amenities: ["WiFi", "Balcony", "Kitchen"],
    cleaners: [{ name: "Anna Kowalski", avatar: "AK", role: "primary" }],
    checkInTime: "3:00 PM", checkOutTime: "11:00 AM", nightlyRate: "$120",
  },
  {
    id: "6", name: "Lakeside Cottage",
    image: "https://images.unsplash.com/photo-1761549148430-85b7abf00f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlc2lkZSUyMGNvdHRhZ2UlMjByZXRyZWF0fGVufDF8fHx8MTc3MjIwMDE3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    location: "Lake Como, Italy", beds: 3, baths: 2, guests: 6, rating: 4.85, reviews: 78,
    occupancy: "88%", monthlyRevenue: "$6,700", status: "active",
    channels: [{ name: "Booking.com", color: "#003580", connected: true }],
    directBookingEnabled: true, directBookingUrl: "lakeside-cottage.oomsi.co",
    amenities: ["Lake Access", "WiFi", "Garden", "Kayak"],
    cleaners: [{ name: "Anna Kowalski", avatar: "AK", role: "primary" }],
    checkInTime: "3:00 PM", checkOutTime: "10:00 AM", nightlyRate: "$195",
  },
];

const statusColors: Record<string, { label: string; color: string; bg: string }> = {
  active: { label: "Active", color: "#2A9D8F", bg: "#2A9D8F" },
  maintenance: { label: "Maintenance", color: "#D4A534", bg: "#E9C46A" },
  inactive: { label: "Inactive", color: "#94A3B8", bg: "#94A3B8" },
};

export function PropertiesPage() {
  const [search, setSearch] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [editing, setEditing] = useState(false);
  const [cleanerRoles, setCleanerRoles] = useState<Record<string, "primary" | "backup">>({});

  const filtered = properties.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.location.toLowerCase().includes(search.toLowerCase())
  );

  const getCleanerRole = (propertyId: string, cleanerName: string, defaultRole: "primary" | "backup") => {
    const key = `${propertyId}-${cleanerName}`;
    return cleanerRoles[key] ?? defaultRole;
  };

  const toggleCleanerRole = (propertyId: string, cleanerName: string, currentRole: "primary" | "backup") => {
    const key = `${propertyId}-${cleanerName}`;
    setCleanerRoles((prev) => ({ ...prev, [key]: currentRole === "primary" ? "backup" : "primary" }));
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "1.5rem", fontWeight: 700 }}>
            Properties
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "#2D3436", opacity: 0.5 }}>
            {properties.length} properties managed
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#2D3436", opacity: 0.3 }} />
            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 rounded-lg"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", backgroundColor: "white", border: "1px solid #E5E7EB", outline: "none", color: "#2D3436", width: "200px" }}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
            style={{ backgroundColor: "#2A9D8F", fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 500 }}
          >
            <Plus size={16} />
            Add Property
          </button>
        </div>
      </div>

      {/* Property cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((prop) => {
          const sc = statusColors[prop.status];
          return (
            <div key={prop.id} className="bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition-all"
              style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.06)" }}
              onClick={() => { setSelectedProperty(prop); setEditing(false); }}
            >
              <div className="relative h-40 overflow-hidden">
                <img src={prop.image} alt={prop.name} className="w-full h-full object-cover" />
                {/* Solid status badge — no backdrop blur */}
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.625rem", color: "white", backgroundColor: sc.bg, fontWeight: 600 }}
                >
                  {sc.label}
                </span>
              </div>
              <div className="p-5">
                <h3 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "1rem", fontWeight: 700 }}>{prop.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin size={12} style={{ color: "#2D3436", opacity: 0.4 }} />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#2D3436", opacity: 0.5 }}>{prop.location}</span>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  {[{ icon: Bed, val: prop.beds }, { icon: Bath, val: prop.baths }, { icon: Users, val: prop.guests }].map((d, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <d.icon size={14} style={{ color: "#2D3436", opacity: 0.3 }} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#2D3436", opacity: 0.5 }}>{d.val}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-1 ml-auto">
                    <Star size={14} style={{ color: "#E9C46A" }} fill="#E9C46A" />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#264653", fontWeight: 600 }}>{prop.rating}</span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.625rem", color: "#2D3436", opacity: 0.35 }}>({prop.reviews})</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                  <div>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.625rem", color: "#2D3436", opacity: 0.4 }}>Monthly Revenue</p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", color: "#264653", fontWeight: 600 }}>{prop.monthlyRevenue}</p>
                  </div>
                  <div className="text-right">
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.625rem", color: "#2D3436", opacity: 0.4 }}>Occupancy</p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", color: "#2A9D8F", fontWeight: 600 }}>{prop.occupancy}</p>
                  </div>
                </div>
                {/* Channels */}
                <div className="flex items-center gap-2 mt-3">
                  {prop.channels.map((ch) => (
                    <span key={ch.name} className="flex items-center gap-1 px-2 py-0.5 rounded"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5625rem", color: ch.connected ? ch.color : "#2D343640", backgroundColor: ch.connected ? ch.color + "10" : "#F3F4F6", fontWeight: 500 }}
                    >
                      {ch.connected && <CheckCircle2 size={9} />}
                      {ch.name}
                    </span>
                  ))}
                  {prop.directBookingEnabled && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5625rem", color: "#2A9D8F", backgroundColor: "#2A9D8F10", fontWeight: 500 }}
                    >
                      <Globe size={9} />
                      Direct
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Property detail modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(38,70,83,0.4)" }}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            style={{ boxShadow: "0 20px 60px rgba(38,70,83,0.15)" }}
          >
            <div className="relative h-48 overflow-hidden rounded-t-2xl">
              <img src={selectedProperty.image} alt={selectedProperty.name} className="w-full h-full object-cover" />
              <button onClick={() => setSelectedProperty(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
              >
                <X size={16} style={{ color: "#264653" }} />
              </button>
              <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.625rem", color: "white", backgroundColor: statusColors[selectedProperty.status].bg, fontWeight: 600 }}
              >
                {statusColors[selectedProperty.status].label}
              </span>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "1.25rem", fontWeight: 700 }}>
                    {selectedProperty.name}
                  </h2>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={14} style={{ color: "#2D3436", opacity: 0.4 }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#2D3436", opacity: 0.5 }}>{selectedProperty.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setEditing(!editing)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all hover:opacity-90"
                    style={{
                      backgroundColor: editing ? "#2A9D8F" : "#F8F9FA",
                      color: editing ? "white" : "#264653",
                      fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 500,
                    }}
                  >
                    {editing ? <Check size={14} /> : <Edit3 size={14} />}
                    {editing ? "Save" : "Edit"}
                  </button>
                  <div className="flex items-center gap-1">
                    <Star size={16} style={{ color: "#E9C46A" }} fill="#E9C46A" />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", color: "#264653", fontWeight: 600 }}>{selectedProperty.rating}</span>
                  </div>
                </div>
              </div>

              {/* Editable stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  { label: "Beds", value: selectedProperty.beds.toString() },
                  { label: "Baths", value: selectedProperty.baths.toString() },
                  { label: "Guests", value: selectedProperty.guests.toString() },
                  { label: "Nightly Rate", value: selectedProperty.nightlyRate },
                ].map((s) => (
                  <div key={s.label} className="text-center py-3 rounded-xl" style={{ backgroundColor: "#F8F9FA" }}>
                    {editing ? (
                      <input type="text" defaultValue={s.value} className="w-full text-center bg-transparent outline-none"
                        style={{ fontFamily: "Inter, sans-serif", fontSize: "1.125rem", color: "#264653", fontWeight: 600 }}
                      />
                    ) : (
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1.125rem", color: "#264653", fontWeight: 600 }}>{s.value}</p>
                    )}
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.4 }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Check-in / Check-out */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: "Check-in Time", value: selectedProperty.checkInTime },
                  { label: "Check-out Time", value: selectedProperty.checkOutTime },
                ].map((item) => (
                  <div key={item.label} className="p-3 rounded-xl" style={{ backgroundColor: "#F8F9FA" }}>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.4, marginBottom: "0.25rem" }}>{item.label}</p>
                    {editing ? (
                      <input type="text" defaultValue={item.value} className="w-full bg-transparent outline-none"
                        style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "#264653", fontWeight: 500 }}
                      />
                    ) : (
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "#264653", fontWeight: 500 }}>{item.value}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Performance */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-4 rounded-xl" style={{ backgroundColor: "#F8F9FA" }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.4 }}>Monthly Revenue</p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1.25rem", color: "#264653", fontWeight: 600 }}>{selectedProperty.monthlyRevenue}</p>
                </div>
                <div className="p-4 rounded-xl" style={{ backgroundColor: "#F8F9FA" }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.4 }}>Occupancy Rate</p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1.25rem", color: "#2A9D8F", fontWeight: 600 }}>{selectedProperty.occupancy}</p>
                </div>
              </div>

              {/* Assigned Cleaners */}
              <div className="mb-6">
                <h3 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "0.9375rem", fontWeight: 700, marginBottom: "0.75rem" }}>
                  Assigned Cleaners
                </h3>
                <div className="space-y-2">
                  {selectedProperty.cleaners.map((c) => {
                    const role = getCleanerRole(selectedProperty.id, c.name, c.role);
                    return (
                    <div key={c.name} className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: "#F8F9FA" }}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "#264653", fontFamily: "Inter, sans-serif", fontSize: "0.625rem", color: "white", fontWeight: 600 }}
                        >
                          {c.avatar}
                        </div>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#264653", fontWeight: 500 }}>{c.name}</span>
                      </div>
                      {editing ? (
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleCleanerRole(selectedProperty.id, c.name, role); }}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                          style={{
                            fontFamily: "Inter, sans-serif", fontSize: "0.625rem", fontWeight: 600,
                            color: role === "primary" ? "#2A9D8F" : "#264653",
                            backgroundColor: role === "primary" ? "#2A9D8F15" : "#26465310",
                            border: "1px dashed",
                            borderColor: role === "primary" ? "#2A9D8F40" : "#26465325",
                          }}
                        >
                          {role === "primary" ? "Primary" : "Backup"}
                          <span style={{ fontSize: "0.5rem", opacity: 0.5 }}>tap to change</span>
                        </button>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md"
                          style={{
                            fontFamily: "Inter, sans-serif", fontSize: "0.625rem", fontWeight: 600,
                            color: role === "primary" ? "#2A9D8F" : "#264653",
                            backgroundColor: role === "primary" ? "#2A9D8F15" : "#26465310",
                          }}
                        >
                          {role === "primary" ? "Primary" : "Backup"}
                        </span>
                      )}
                    </div>
                    );
                  })}
                  {editing && (
                    <button className="w-full py-2 rounded-xl border-2 border-dashed transition-colors hover:bg-gray-50"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#2A9D8F", borderColor: "#2A9D8F40", fontWeight: 500 }}
                    >
                      + Assign Cleaner
                    </button>
                  )}
                </div>
              </div>

              {/* Connected Channels / Platforms */}
              <PlatformsSection
                connectedChannels={selectedProperty.channels}
                editing={editing}
              />

              {/* Direct Booking */}
              <div className="mb-6">
                <h3 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "0.9375rem", fontWeight: 700, marginBottom: "0.75rem" }}>
                  Direct Booking
                </h3>
                {selectedProperty.directBookingEnabled ? (
                  <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: "#2A9D8F08", border: "1px solid #2A9D8F20" }}>
                    <div className="flex items-center gap-2">
                      <Globe size={16} style={{ color: "#2A9D8F" }} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#2A9D8F", fontWeight: 500 }}>
                        {selectedProperty.directBookingUrl}
                      </span>
                    </div>
                    <ExternalLink size={14} style={{ color: "#2A9D8F" }} />
                  </div>
                ) : (
                  <div className="p-3 rounded-xl text-center" style={{ backgroundColor: "#F8F9FA" }}>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#2D3436", opacity: 0.4 }}>Not enabled</p>
                    <button className="mt-2 px-4 py-1.5 rounded-lg text-white transition-all hover:opacity-90"
                      style={{ backgroundColor: "#2A9D8F", fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 500 }}
                    >
                      Enable Direct Booking
                    </button>
                  </div>
                )}
              </div>

              {/* Amenities */}
              <div>
                <h3 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "0.9375rem", fontWeight: 700, marginBottom: "0.75rem" }}>
                  Amenities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProperty.amenities.map((a) => (
                    <span key={a} className="px-3 py-1.5 rounded-lg"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#264653", backgroundColor: "#F8F9FA", fontWeight: 500 }}
                    >
                      {a}
                    </span>
                  ))}
                  {editing && (
                    <button className="px-3 py-1.5 rounded-lg border-2 border-dashed"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#2A9D8F", borderColor: "#2A9D8F40", fontWeight: 500 }}
                    >
                      + Add
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface PlatformsSectionProps {
  connectedChannels: { name: string; color: string; connected: boolean }[];
  editing: boolean;
}

function PlatformsSection({ connectedChannels, editing }: PlatformsSectionProps) {
  // All available platforms
  const allPlatforms = [
    { name: "Airbnb", color: "#FF5A5F", connectionMethod: "api" as const, description: "Sync listings, calendars, and messages" },
    { name: "Booking.com", color: "#003580", connectionMethod: "api" as const, description: "Sync availability and reservations" },
    { name: "VRBO", color: "#3B5998", connectionMethod: "ical" as const, description: "Import calendar via iCal feed" },
    { name: "Expedia", color: "#FFCC00", connectionMethod: "ical" as const, description: "Import calendar via iCal feed" },
    { name: "TripAdvisor", color: "#00AF87", connectionMethod: "ical" as const, description: "Import calendar via iCal feed" },
    { name: "Google Vacation Rentals", color: "#4285F4", connectionMethod: "ical" as const, description: "Import calendar via iCal feed" },
    { name: "Houfy", color: "#FF6B35", connectionMethod: "ical" as const, description: "Import calendar via iCal feed" },
    { name: "Other (iCal)", color: "#94A3B8", connectionMethod: "ical" as const, description: "Any platform with iCal export" },
  ];

  // Build a map from connectedChannels
  const connectedMap = new Map(connectedChannels.map((ch) => [ch.name, ch]));

  // Merge: all platforms with their connection status
  const mergedPlatforms = allPlatforms.map((p) => {
    const existing = connectedMap.get(p.name);
    return {
      ...p,
      connected: existing?.connected ?? false,
    };
  });

  const connectedCount = mergedPlatforms.filter((p) => p.connected).length;

  const [expandedPlatform, setExpandedPlatform] = useState<string | null>(null);
  const [icalUrls, setIcalUrls] = useState<Record<string, string>>({});
  const [justConnected, setJustConnected] = useState<Set<string>>(new Set());
  const [justDisconnected, setJustDisconnected] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState<string | null>(null);

  const handleConnect = (platformName: string) => {
    setJustConnected((prev) => new Set(prev).add(platformName));
    setJustDisconnected((prev) => { const n = new Set(prev); n.delete(platformName); return n; });
    setExpandedPlatform(null);
  };

  const handleDisconnect = (platformName: string) => {
    setJustDisconnected((prev) => new Set(prev).add(platformName));
    setJustConnected((prev) => { const n = new Set(prev); n.delete(platformName); return n; });
  };

  const getEffectiveConnected = (p: { name: string; connected: boolean }) => {
    if (justConnected.has(p.name)) return true;
    if (justDisconnected.has(p.name)) return false;
    return p.connected;
  };

  const handleCopyIcal = (platformName: string) => {
    const outUrl = `https://calendar.oomsi.co/export/${platformName.toLowerCase().replace(/[^a-z0-9]/g, "-")}.ics`;
    navigator.clipboard?.writeText(outUrl);
    setCopied(platformName);
    setTimeout(() => setCopied(null), 2000);
  };

  // In view mode: show only connected. In edit mode: show all.
  const visiblePlatforms = editing
    ? mergedPlatforms
    : mergedPlatforms.filter((p) => getEffectiveConnected(p));

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "0.9375rem", fontWeight: 700 }}>
          Connected Channels
        </h3>
        {!editing && (
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.4 }}>
            {connectedCount + justConnected.size - justDisconnected.size} connected
          </span>
        )}
        {editing && (
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2A9D8F", fontWeight: 500 }}>
            {allPlatforms.length} platforms available
          </span>
        )}
      </div>

      <div className="space-y-2">
        {visiblePlatforms.map((platform) => {
          const isConnected = getEffectiveConnected(platform);
          const isExpanded = expandedPlatform === platform.name;

          return (
            <div
              key={platform.name}
              className="rounded-xl overflow-hidden transition-all"
              style={{
                backgroundColor: isExpanded ? "white" : "#F8F9FA",
                border: isExpanded ? "1px solid #E5E7EB" : "1px solid transparent",
                boxShadow: isExpanded ? "0 2px 8px rgba(38,70,83,0.08)" : "none",
              }}
            >
              {/* Platform row */}
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: platform.color + "15" }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: platform.color }} />
                  </div>
                  <div>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#264653", fontWeight: 500 }}>
                      {platform.name}
                    </span>
                    {editing && !isConnected && (
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5625rem", color: "#2D3436", opacity: 0.35, marginTop: "0.0625rem" }}>
                        {platform.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isConnected ? (
                    <>
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md"
                        style={{
                          fontFamily: "Inter, sans-serif", fontSize: "0.625rem", fontWeight: 600,
                          color: "#2A9D8F", backgroundColor: "#2A9D8F15",
                        }}
                      >
                        <CheckCircle2 size={10} />
                        Connected
                      </span>
                      {editing && (
                        <button
                          onClick={() => handleDisconnect(platform.name)}
                          className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-red-50 transition-colors"
                          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5625rem", color: "#EF4444", fontWeight: 500 }}
                        >
                          <Unlink size={10} />
                          Disconnect
                        </button>
                      )}
                    </>
                  ) : editing ? (
                    <button
                      onClick={() => setExpandedPlatform(isExpanded ? null : platform.name)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all hover:opacity-90"
                      style={{
                        fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", fontWeight: 500,
                        color: isExpanded ? "#264653" : "#2A9D8F",
                        backgroundColor: isExpanded ? "#F3F4F6" : "#2A9D8F12",
                        border: isExpanded ? "none" : "1px dashed #2A9D8F40",
                      }}
                    >
                      {isExpanded ? (
                        <>
                          <X size={11} /> Cancel
                        </>
                      ) : (
                        <>
                          <Plus size={12} /> Connect
                        </>
                      )}
                    </button>
                  ) : null}
                </div>
              </div>

              {/* Expanded connection widget */}
              {isExpanded && editing && (
                <div className="px-4 pb-4" style={{ borderTop: "1px solid #F3F4F6" }}>
                  {platform.connectionMethod === "api" ? (
                    /* API-based connection (Airbnb, Booking.com) */
                    <div className="mt-3">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "#2A9D8F15", fontFamily: "Inter, sans-serif", fontSize: "0.5rem", color: "#2A9D8F", fontWeight: 700 }}
                          >
                            1
                          </span>
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#264653", fontWeight: 500 }}>
                            Authorize via {platform.name}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleConnect(platform.name)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-white transition-all hover:opacity-90 mb-3"
                        style={{ backgroundColor: platform.color, fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 500 }}
                      >
                        <ExternalLink size={14} />
                        Connect with {platform.name}
                      </button>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5625rem", color: "#2D3436", opacity: 0.35, textAlign: "center" }}>
                        You'll be redirected to {platform.name} to authorize access. Calendar, bookings, and messages will sync automatically.
                      </p>

                      {/* OR divider */}
                      <div className="flex items-center gap-3 my-3">
                        <div className="flex-1 h-px" style={{ backgroundColor: "#E5E7EB" }} />
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5625rem", color: "#2D3436", opacity: 0.3, fontWeight: 500 }}>
                          OR USE ICAL
                        </span>
                        <div className="flex-1 h-px" style={{ backgroundColor: "#E5E7EB" }} />
                      </div>

                      {/* iCal fallback */}
                      <div>
                        <label style={{ fontFamily: "Inter, sans-serif", fontSize: "0.625rem", color: "#2D3436", opacity: 0.45, fontWeight: 500 }}>
                          Import: Paste {platform.name} iCal URL
                        </label>
                        <div className="flex gap-2 mt-1.5">
                          <input
                            type="url"
                            placeholder={`https://${platform.name.toLowerCase().replace(/\./g, "")}.com/calendar/ical/...`}
                            value={icalUrls[platform.name] || ""}
                            onChange={(e) => setIcalUrls((prev) => ({ ...prev, [platform.name]: e.target.value }))}
                            className="flex-1 px-3 py-2 rounded-lg"
                            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#264653", border: "1px solid #E5E7EB", outline: "none", backgroundColor: "#F8F9FA" }}
                          />
                          <button
                            onClick={() => handleConnect(platform.name)}
                            disabled={!icalUrls[platform.name]}
                            className="px-3 py-2 rounded-lg text-white transition-all hover:opacity-90 shrink-0 disabled:opacity-40"
                            style={{ backgroundColor: "#2A9D8F", fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 500 }}
                          >
                            Import
                          </button>
                        </div>
                      </div>

                      {/* Export iCal */}
                      <div className="mt-3">
                        <label style={{ fontFamily: "Inter, sans-serif", fontSize: "0.625rem", color: "#2D3436", opacity: 0.45, fontWeight: 500 }}>
                          Export: Your oomsi iCal URL (paste into {platform.name})
                        </label>
                        <div className="flex items-center gap-2 mt-1.5 p-2 rounded-lg" style={{ backgroundColor: "#F8F9FA", border: "1px solid #E5E7EB" }}>
                          <Link2 size={12} style={{ color: "#2D3436", opacity: 0.3, flexShrink: 0 }} />
                          <span className="flex-1 truncate" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#264653", opacity: 0.6 }}>
                            https://calendar.oomsi.co/export/{platform.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}.ics
                          </span>
                          <button
                            onClick={() => handleCopyIcal(platform.name)}
                            className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-200 transition-colors shrink-0"
                            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5625rem", color: copied === platform.name ? "#2A9D8F" : "#264653", fontWeight: 500 }}
                          >
                            {copied === platform.name ? <Check size={10} /> : <Copy size={10} />}
                            {copied === platform.name ? "Copied" : "Copy"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* iCal-only connection */
                    <div className="mt-3">
                      {/* Import */}
                      <div className="mb-3">
                        <label style={{ fontFamily: "Inter, sans-serif", fontSize: "0.625rem", color: "#2D3436", opacity: 0.45, fontWeight: 500 }}>
                          Import: Paste {platform.name} iCal URL
                        </label>
                        <div className="flex gap-2 mt-1.5">
                          <input
                            type="url"
                            placeholder={`https://www.${platform.name.toLowerCase().replace(/[^a-z0-9]/g, "")}.com/calendar/ical/...`}
                            value={icalUrls[platform.name] || ""}
                            onChange={(e) => setIcalUrls((prev) => ({ ...prev, [platform.name]: e.target.value }))}
                            className="flex-1 px-3 py-2 rounded-lg"
                            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#264653", border: "1px solid #E5E7EB", outline: "none", backgroundColor: "#F8F9FA" }}
                          />
                          <button
                            onClick={() => handleConnect(platform.name)}
                            disabled={!icalUrls[platform.name]}
                            className="px-3 py-2 rounded-lg text-white transition-all hover:opacity-90 shrink-0 disabled:opacity-40"
                            style={{ backgroundColor: "#2A9D8F", fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 500 }}
                          >
                            Import
                          </button>
                        </div>
                        <p className="mt-1.5" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5625rem", color: "#2D3436", opacity: 0.3 }}>
                          Find this in {platform.name} under Calendar Settings &gt; Export / iCal link
                        </p>
                      </div>

                      {/* Export */}
                      <div>
                        <label style={{ fontFamily: "Inter, sans-serif", fontSize: "0.625rem", color: "#2D3436", opacity: 0.45, fontWeight: 500 }}>
                          Export: Your oomsi iCal URL (paste into {platform.name})
                        </label>
                        <div className="flex items-center gap-2 mt-1.5 p-2 rounded-lg" style={{ backgroundColor: "#F8F9FA", border: "1px solid #E5E7EB" }}>
                          <Link2 size={12} style={{ color: "#2D3436", opacity: 0.3, flexShrink: 0 }} />
                          <span className="flex-1 truncate" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#264653", opacity: 0.6 }}>
                            https://calendar.oomsi.co/export/{platform.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}.ics
                          </span>
                          <button
                            onClick={() => handleCopyIcal(platform.name)}
                            className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-200 transition-colors shrink-0"
                            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5625rem", color: copied === platform.name ? "#2A9D8F" : "#264653", fontWeight: 500 }}
                          >
                            {copied === platform.name ? <Check size={10} /> : <Copy size={10} />}
                            {copied === platform.name ? "Copied" : "Copy"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Hint when not in edit mode */}
      {!editing && visiblePlatforms.length < allPlatforms.length && (
        <p className="mt-2" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.625rem", color: "#2D3436", opacity: 0.3 }}>
          Click "Edit" to connect more platforms ({allPlatforms.length - visiblePlatforms.length} available)
        </p>
      )}
    </div>
  );
}