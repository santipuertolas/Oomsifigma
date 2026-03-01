import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowRight, ArrowLeft, Check, Home, Globe, Users,
  Plus, X, Sparkles, Building2, Bed, Bath,
  CheckCircle2, Link2,
} from "lucide-react";

const C = {
  teal: "#264653",
  green: "#2A9D8F",
  periwinkle: "#A29BFE",
  sand: "#E9C46A",
  white: "#F8F9FA",
  slate: "#2D3436",
};
const F = { heading: "Nunito, sans-serif", body: "Inter, sans-serif" };

const steps = [
  { icon: Home, label: "Add Property", number: 1 },
  { icon: Globe, label: "Connect Channels", number: 2 },
  { icon: Users, label: "Invite Team", number: 3 },
  { icon: Sparkles, label: "Ready!", number: 4 },
];

const platforms = [
  { name: "Airbnb", color: "#FF5A5F", method: "api" },
  { name: "Booking.com", color: "#003580", method: "api" },
  { name: "VRBO", color: "#3B5998", method: "ical" },
  { name: "Other (iCal)", color: "#94A3B8", method: "ical" },
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  // Step 1 state
  const [propertyName, setPropertyName] = useState("");
  const [propertyLocation, setPropertyLocation] = useState("");
  const [beds, setBeds] = useState("2");
  const [baths, setBaths] = useState("1");
  const [checkIn, setCheckIn] = useState("3:00 PM");
  const [checkOut, setCheckOut] = useState("11:00 AM");

  // Step 2 state
  const [connectedPlatforms, setConnectedPlatforms] = useState<Set<string>>(new Set());

  // Step 3 state
  const [teamMembers, setTeamMembers] = useState([
    { email: "", role: "cleaner" },
  ]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const togglePlatform = (name: string) => {
    setConnectedPlatforms((prev) => {
      const n = new Set(prev);
      if (n.has(name)) n.delete(name);
      else n.add(name);
      return n;
    });
  };

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { email: "", role: "cleaner" }]);
  };

  const removeTeamMember = (idx: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== idx));
  };

  const updateTeamMember = (idx: number, field: string, value: string) => {
    setTeamMembers(
      teamMembers.map((m, i) => (i === idx ? { ...m, [field]: value } : m))
    );
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: C.white }}>
      {/* Top bar */}
      <div className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <span style={{ fontFamily: F.heading, fontSize: "1.25rem", fontWeight: 800, color: C.teal }}>
            oomsi
          </span>
          <button
            onClick={() => navigate("/dashboard")}
            style={{ fontFamily: F.body, fontSize: "0.75rem", color: C.slate, opacity: 0.35, fontWeight: 500 }}
          >
            Skip setup →
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1" style={{ backgroundColor: "#E5E7EB" }}>
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${progress}%`, backgroundColor: C.green }}
        />
      </div>

      {/* Step indicators */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-2">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, i) => {
            const isComplete = i < currentStep;
            const isCurrent = i === currentStep;
            return (
              <div key={step.number} className="flex items-center gap-2">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: isComplete ? C.green : isCurrent ? C.green + "15" : "#F3F4F6",
                    border: isCurrent ? `2px solid ${C.green}` : "none",
                  }}
                >
                  {isComplete ? (
                    <Check size={16} style={{ color: "white" }} />
                  ) : (
                    <step.icon size={16} style={{ color: isCurrent ? C.green : C.slate, opacity: isCurrent ? 1 : 0.25 }} />
                  )}
                </div>
                <span
                  className="hidden sm:block"
                  style={{
                    fontFamily: F.body,
                    fontSize: "0.75rem",
                    color: isCurrent ? C.teal : C.slate,
                    fontWeight: isCurrent ? 600 : 400,
                    opacity: isCurrent ? 1 : 0.35,
                  }}
                >
                  {step.label}
                </span>
                {i < steps.length - 1 && (
                  <div
                    className="hidden sm:block w-8 lg:w-16 h-px mx-2"
                    style={{ backgroundColor: isComplete ? C.green : "#E5E7EB" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 w-full pb-8">
        {/* ──── STEP 1: Add Property ──── */}
        {currentStep === 0 && (
          <div>
            <h2 style={{ fontFamily: F.heading, fontSize: "1.5rem", fontWeight: 700, color: C.teal, marginBottom: "0.5rem" }}>
              Add your first property
            </h2>
            <p style={{ fontFamily: F.body, fontSize: "0.875rem", color: C.slate, opacity: 0.5, marginBottom: "2rem" }}>
              You can always add more later. Let's start with the basics.
            </p>

            <div className="bg-white rounded-2xl p-6 sm:p-8 space-y-5" style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.05)" }}>
              <div>
                <label style={{ fontFamily: F.body, fontSize: "0.75rem", color: C.teal, fontWeight: 500, display: "block", marginBottom: "0.375rem" }}>
                  Property Name
                </label>
                <input
                  type="text" value={propertyName} onChange={(e) => setPropertyName(e.target.value)}
                  placeholder="e.g. Seaside Villa"
                  className="w-full px-4 py-3 rounded-xl"
                  style={{ fontFamily: F.body, fontSize: "0.875rem", border: "1px solid #E5E7EB", outline: "none", color: C.slate }}
                />
              </div>

              <div>
                <label style={{ fontFamily: F.body, fontSize: "0.75rem", color: C.teal, fontWeight: 500, display: "block", marginBottom: "0.375rem" }}>
                  Location
                </label>
                <input
                  type="text" value={propertyLocation} onChange={(e) => setPropertyLocation(e.target.value)}
                  placeholder="e.g. Costa del Sol, Spain"
                  className="w-full px-4 py-3 rounded-xl"
                  style={{ fontFamily: F.body, fontSize: "0.875rem", border: "1px solid #E5E7EB", outline: "none", color: C.slate }}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Bedrooms", value: beds, setter: setBeds, icon: Bed },
                  { label: "Bathrooms", value: baths, setter: setBaths, icon: Bath },
                ].map((f) => (
                  <div key={f.label}>
                    <label style={{ fontFamily: F.body, fontSize: "0.75rem", color: C.teal, fontWeight: 500, display: "block", marginBottom: "0.375rem" }}>
                      {f.label}
                    </label>
                    <div className="relative">
                      <f.icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: C.slate, opacity: 0.25 }} />
                      <input
                        type="text" value={f.value} onChange={(e) => f.setter(e.target.value)}
                        className="w-full pl-9 pr-3 py-3 rounded-xl"
                        style={{ fontFamily: F.body, fontSize: "0.875rem", border: "1px solid #E5E7EB", outline: "none", color: C.slate }}
                      />
                    </div>
                  </div>
                ))}
                <div>
                  <label style={{ fontFamily: F.body, fontSize: "0.75rem", color: C.teal, fontWeight: 500, display: "block", marginBottom: "0.375rem" }}>
                    Check-in
                  </label>
                  <input
                    type="text" value={checkIn} onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-3 py-3 rounded-xl"
                    style={{ fontFamily: F.body, fontSize: "0.875rem", border: "1px solid #E5E7EB", outline: "none", color: C.slate }}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: F.body, fontSize: "0.75rem", color: C.teal, fontWeight: 500, display: "block", marginBottom: "0.375rem" }}>
                    Check-out
                  </label>
                  <input
                    type="text" value={checkOut} onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3 py-3 rounded-xl"
                    style={{ fontFamily: F.body, fontSize: "0.875rem", border: "1px solid #E5E7EB", outline: "none", color: C.slate }}
                  />
                </div>
              </div>

              {/* Import option */}
              <div
                className="flex items-center justify-between p-4 rounded-xl mt-2"
                style={{ backgroundColor: "#F8F9FA", border: "1px dashed #D1D5DB" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#FF5A5F15" }}>
                    <Building2 size={16} style={{ color: "#FF5A5F" }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: F.body, fontSize: "0.8125rem", color: C.teal, fontWeight: 500 }}>Import from Airbnb</p>
                    <p style={{ fontFamily: F.body, fontSize: "0.625rem", color: C.slate, opacity: 0.35 }}>Auto-fill from your existing listing</p>
                  </div>
                </div>
                <button
                  className="px-3 py-1.5 rounded-lg text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: "#FF5A5F", fontFamily: F.body, fontSize: "0.6875rem", fontWeight: 500 }}
                >
                  Import
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ──── STEP 2: Connect Channels ──── */}
        {currentStep === 1 && (
          <div>
            <h2 style={{ fontFamily: F.heading, fontSize: "1.5rem", fontWeight: 700, color: C.teal, marginBottom: "0.5rem" }}>
              Connect your booking channels
            </h2>
            <p style={{ fontFamily: F.body, fontSize: "0.875rem", color: C.slate, opacity: 0.5, marginBottom: "2rem" }}>
              We'll sync your calendars, bookings, and availability across all platforms.
            </p>

            <div className="space-y-3">
              {platforms.map((p) => {
                const isConnected = connectedPlatforms.has(p.name);
                return (
                  <div
                    key={p.name}
                    className="bg-white rounded-xl p-5 transition-all"
                    style={{
                      boxShadow: "0 1px 3px rgba(38,70,83,0.05)",
                      border: isConnected ? `1px solid ${C.green}40` : "1px solid transparent",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: p.color + "12" }}
                        >
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                        </div>
                        <div>
                          <p style={{ fontFamily: F.body, fontSize: "0.9375rem", color: C.teal, fontWeight: 500 }}>{p.name}</p>
                          <p style={{ fontFamily: F.body, fontSize: "0.6875rem", color: C.slate, opacity: 0.35 }}>
                            {p.method === "api" ? "Full two-way sync" : "Calendar sync via iCal"}
                          </p>
                        </div>
                      </div>

                      {isConnected ? (
                        <span
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                          style={{ backgroundColor: C.green + "12", fontFamily: F.body, fontSize: "0.75rem", color: C.green, fontWeight: 600 }}
                        >
                          <CheckCircle2 size={14} />
                          Connected
                        </span>
                      ) : (
                        <button
                          onClick={() => togglePlatform(p.name)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
                          style={{ backgroundColor: p.color, fontFamily: F.body, fontSize: "0.8125rem", fontWeight: 500 }}
                        >
                          <Link2 size={14} />
                          Connect
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-4 text-center" style={{ fontFamily: F.body, fontSize: "0.6875rem", color: C.slate, opacity: 0.3 }}>
              You can connect more channels later from your property settings.
            </p>
          </div>
        )}

        {/* ──── STEP 3: Invite Team ──── */}
        {currentStep === 2 && (
          <div>
            <h2 style={{ fontFamily: F.heading, fontSize: "1.5rem", fontWeight: 700, color: C.teal, marginBottom: "0.5rem" }}>
              Invite your cleaning team
            </h2>
            <p style={{ fontFamily: F.body, fontSize: "0.875rem", color: C.slate, opacity: 0.5, marginBottom: "2rem" }}>
              They'll get access to the cleaner portal where they can view tasks, upload photos, and accept assignments.
            </p>

            <div className="bg-white rounded-2xl p-6 sm:p-8" style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.05)" }}>
              <div className="space-y-3">
                {teamMembers.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <input
                      type="email"
                      value={member.email}
                      onChange={(e) => updateTeamMember(idx, "email", e.target.value)}
                      placeholder="cleaner@email.com"
                      className="flex-1 px-4 py-3 rounded-xl"
                      style={{ fontFamily: F.body, fontSize: "0.875rem", border: "1px solid #E5E7EB", outline: "none", color: C.slate }}
                    />
                    <select
                      value={member.role}
                      onChange={(e) => updateTeamMember(idx, "role", e.target.value)}
                      className="px-3 py-3 rounded-xl appearance-none cursor-pointer"
                      style={{ fontFamily: F.body, fontSize: "0.8125rem", border: "1px solid #E5E7EB", outline: "none", color: C.teal, backgroundColor: "#F8F9FA", minWidth: "130px" }}
                    >
                      <option value="cleaner">Cleaner</option>
                      <option value="head_housekeeper">Head Housekeeper</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                    {teamMembers.length > 1 && (
                      <button
                        onClick={() => removeTeamMember(idx)}
                        className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0"
                      >
                        <X size={16} style={{ color: C.slate, opacity: 0.3 }} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={addTeamMember}
                className="w-full flex items-center justify-center gap-2 mt-4 py-2.5 rounded-xl border-2 border-dashed transition-colors hover:bg-gray-50"
                style={{ fontFamily: F.body, fontSize: "0.8125rem", color: C.green, borderColor: C.green + "40", fontWeight: 500 }}
              >
                <Plus size={16} />
                Add another team member
              </button>

              <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: C.periwinkle + "08", border: `1px solid ${C.periwinkle}15` }}>
                <div className="flex items-start gap-2">
                  <Sparkles size={16} style={{ color: C.periwinkle, marginTop: "0.125rem", flexShrink: 0 }} />
                  <div>
                    <p style={{ fontFamily: F.body, fontSize: "0.8125rem", color: C.teal, fontWeight: 500 }}>
                      WhatsApp notifications included
                    </p>
                    <p style={{ fontFamily: F.body, fontSize: "0.6875rem", color: C.slate, opacity: 0.45, marginTop: "0.25rem" }}>
                      Your team will also receive task notifications, reminders, and can upload photos via WhatsApp. You can configure this in Settings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ──── STEP 4: Ready ──── */}
        {currentStep === 3 && (
          <div className="text-center py-8">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: C.green + "15" }}
            >
              <CheckCircle2 size={40} style={{ color: C.green }} />
            </div>

            <h2 style={{ fontFamily: F.heading, fontSize: "1.75rem", fontWeight: 700, color: C.teal, marginBottom: "0.5rem" }}>
              You're all set!
            </h2>
            <p style={{ fontFamily: F.body, fontSize: "1rem", color: C.slate, opacity: 0.5, maxWidth: "400px", margin: "0 auto 2rem" }}>
              Your workspace is ready. Here's a summary of what we've set up for you.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-10">
              <div className="bg-white rounded-xl p-4" style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.05)" }}>
                <Home size={20} style={{ color: C.green, margin: "0 auto 0.5rem" }} />
                <p style={{ fontFamily: F.heading, fontSize: "1.25rem", color: C.teal, fontWeight: 700 }}>1</p>
                <p style={{ fontFamily: F.body, fontSize: "0.6875rem", color: C.slate, opacity: 0.4 }}>Property</p>
              </div>
              <div className="bg-white rounded-xl p-4" style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.05)" }}>
                <Globe size={20} style={{ color: C.periwinkle, margin: "0 auto 0.5rem" }} />
                <p style={{ fontFamily: F.heading, fontSize: "1.25rem", color: C.teal, fontWeight: 700 }}>
                  {connectedPlatforms.size}
                </p>
                <p style={{ fontFamily: F.body, fontSize: "0.6875rem", color: C.slate, opacity: 0.4 }}>Channels</p>
              </div>
              <div className="bg-white rounded-xl p-4" style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.05)" }}>
                <Users size={20} style={{ color: C.sand, margin: "0 auto 0.5rem" }} />
                <p style={{ fontFamily: F.heading, fontSize: "1.25rem", color: C.teal, fontWeight: 700 }}>
                  {teamMembers.filter((m) => m.email).length}
                </p>
                <p style={{ fontFamily: F.body, fontSize: "0.6875rem", color: C.slate, opacity: 0.4 }}>Team Members</p>
              </div>
            </div>

            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white transition-all hover:opacity-90"
              style={{ backgroundColor: C.green, fontFamily: F.body, fontSize: "1rem", fontWeight: 600 }}
            >
              Go to Dashboard
              <ArrowRight size={18} />
            </button>

            <p className="mt-4" style={{ fontFamily: F.body, fontSize: "0.6875rem", color: C.slate, opacity: 0.3 }}>
              Your 14-day Professional trial has started
            </p>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      {currentStep < 3 && (
        <div className="border-t border-gray-100 py-4">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 flex items-center justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg transition-colors hover:bg-gray-100 disabled:opacity-20 disabled:cursor-not-allowed"
              style={{ fontFamily: F.body, fontSize: "0.8125rem", color: C.teal, fontWeight: 500 }}
            >
              <ArrowLeft size={16} />
              Back
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={nextStep}
                className="px-4 py-2.5 rounded-lg transition-colors hover:bg-gray-100"
                style={{ fontFamily: F.body, fontSize: "0.8125rem", color: C.slate, opacity: 0.4, fontWeight: 500 }}
              >
                Skip for now
              </button>
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white transition-all hover:opacity-90"
                style={{ backgroundColor: C.green, fontFamily: F.body, fontSize: "0.875rem", fontWeight: 600 }}
              >
                Continue
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
