import { useState } from "react";
import {
  User, Mail, Phone, MapPin, Building2, Calendar, Edit3, Check, LogOut,
} from "lucide-react";
import { useNavigate } from "react-router";

export function ProfilePage() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);

  const [profile] = useState({
    firstName: "Sarah",
    lastName: "Mitchell",
    email: "sarah@oomsi.co",
    phone: "+1 (555) 123-4567",
    company: "Mitchell Vacation Rentals",
    location: "New York, USA",
    timezone: "America/New_York (EST)",
    memberSince: "March 2024",
    properties: 6,
    totalBookings: 847,
    totalRevenue: "$234,500",
  });

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "1.5rem", fontWeight: 700 }}>
          Profile
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "#2D3436", opacity: 0.5 }}>
          Manage your personal information
        </p>
      </div>

      {/* Profile header card — clean, no banner */}
      <div
        className="bg-white rounded-2xl p-6 mb-6"
        style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.06)" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          {/* Avatar */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
            style={{
              backgroundColor: "#2A9D8F",
              fontFamily: "Nunito, sans-serif",
              fontSize: "1.375rem",
              color: "white",
              fontWeight: 700,
            }}
          >
            SM
          </div>

          {/* Name & company */}
          <div className="flex-1">
            <h2 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "1.25rem", fontWeight: 700 }}>
              {profile.firstName} {profile.lastName}
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#2D3436", opacity: 0.5, marginTop: "0.125rem" }}>
              {profile.company}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setEditing(!editing)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:opacity-90"
              style={{
                backgroundColor: editing ? "#2A9D8F" : "#F8F9FA",
                color: editing ? "white" : "#264653",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.8125rem",
                fontWeight: 500,
              }}
            >
              {editing ? <Check size={16} /> : <Edit3 size={16} />}
              {editing ? "Save" : "Edit Profile"}
            </button>
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:bg-red-50"
              style={{
                backgroundColor: "#F8F9FA",
                color: "#EF4444",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.8125rem",
                fontWeight: 500,
              }}
            >
              <LogOut size={16} />
              Log Out
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Properties", value: profile.properties.toString() },
          { label: "Total Bookings", value: profile.totalBookings.toString() },
          { label: "Lifetime Revenue", value: profile.totalRevenue },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl p-5 text-center"
            style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.06)" }}
          >
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1.375rem", color: "#264653", fontWeight: 600 }}>
              {s.value}
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.4, marginTop: "0.25rem" }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Details */}
      <div
        className="bg-white rounded-2xl p-6"
        style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.06)" }}
      >
        <h3 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "1.125rem", fontWeight: 700, marginBottom: "1.5rem" }}>
          Personal Information
        </h3>
        <div className="space-y-4">
          {[
            { icon: User, label: "Full Name", value: `${profile.firstName} ${profile.lastName}` },
            { icon: Mail, label: "Email", value: profile.email },
            { icon: Phone, label: "Phone", value: profile.phone },
            { icon: Building2, label: "Company", value: profile.company },
            { icon: MapPin, label: "Location", value: profile.location },
            { icon: Calendar, label: "Member Since", value: profile.memberSince },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-4 py-2">
              <item.icon size={18} style={{ color: "#2D3436", opacity: 0.3 }} />
              <div className="flex-1">
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.4 }}>
                  {item.label}
                </p>
                {editing ? (
                  <input
                    type="text"
                    defaultValue={item.value}
                    className="w-full py-1"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "#264653", border: "none", borderBottom: "1px solid #E5E7EB", outline: "none" }}
                  />
                ) : (
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "#264653", fontWeight: 500 }}>
                    {item.value}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
