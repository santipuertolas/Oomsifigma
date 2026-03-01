import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Check, Building2 } from "lucide-react";

const C = {
  teal: "#264653",
  green: "#2A9D8F",
  periwinkle: "#A29BFE",
  sand: "#E9C46A",
  white: "#F8F9FA",
  slate: "#2D3436",
};
const F = { heading: "Nunito, sans-serif", body: "Inter, sans-serif" };

export function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [propertyCount, setPropertyCount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/onboarding");
  };

  const benefits = [
    "14-day free trial on Starter & Professional",
    "No credit card required to start",
    "Set up in under 15 minutes",
    "Cancel anytime — no contracts",
  ];

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: C.white }}>
      {/* Left — branding panel (desktop only) */}
      <div
        className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12"
        style={{ backgroundColor: C.teal }}
      >
        <div>
          <button
            onClick={() => navigate("/")}
            style={{ fontFamily: F.heading, fontSize: "1.75rem", fontWeight: 800, color: "white" }}
          >
            oomsi
          </button>
          <p style={{ fontFamily: F.body, fontSize: "0.875rem", color: "white", opacity: 0.5, marginTop: "0.5rem" }}>
            Property Management. Made Simple.
          </p>
        </div>

        <div>
          <h2
            style={{
              fontFamily: F.heading,
              fontSize: "2rem",
              fontWeight: 700,
              color: "white",
              lineHeight: 1.3,
              marginBottom: "2rem",
            }}
          >
            Start managing your properties with peace of mind
          </h2>

          <ul className="space-y-4">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(42,157,143,0.3)" }}
                >
                  <Check size={13} style={{ color: C.green }} />
                </div>
                <span style={{ fontFamily: F.body, fontSize: "0.9375rem", color: "white", opacity: 0.7 }}>
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p style={{ fontFamily: F.body, fontSize: "0.75rem", color: "white", opacity: 0.3 }}>
            Property management. Made simple.
          </p>
        </div>
      </div>

      {/* Right — signup form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Mobile back + logo */}
          <div className="lg:hidden mb-8">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 mb-6"
              style={{ fontFamily: F.body, fontSize: "0.8125rem", color: C.green, fontWeight: 500 }}
            >
              <ArrowLeft size={16} /> Back
            </button>
            <h1 style={{ fontFamily: F.heading, fontSize: "2rem", fontWeight: 800, color: C.teal }}>oomsi</h1>
          </div>

          <h2 style={{ fontFamily: F.heading, fontSize: "1.5rem", fontWeight: 700, color: C.teal, marginBottom: "0.25rem" }}>
            Create your account
          </h2>
          <p style={{ fontFamily: F.body, fontSize: "0.875rem", color: C.slate, opacity: 0.5, marginBottom: "1.75rem" }}>
            Start your 14-day free trial. No credit card needed.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label style={{ fontFamily: F.body, fontSize: "0.75rem", color: C.teal, fontWeight: 500, display: "block", marginBottom: "0.375rem" }}>
                  First Name
                </label>
                <input
                  type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Sarah"
                  className="w-full px-3 py-2.5 rounded-xl"
                  style={{ fontFamily: F.body, fontSize: "0.8125rem", border: "1px solid #E5E7EB", outline: "none", color: C.slate }}
                />
              </div>
              <div>
                <label style={{ fontFamily: F.body, fontSize: "0.75rem", color: C.teal, fontWeight: 500, display: "block", marginBottom: "0.375rem" }}>
                  Last Name
                </label>
                <input
                  type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                  placeholder="Mitchell"
                  className="w-full px-3 py-2.5 rounded-xl"
                  style={{ fontFamily: F.body, fontSize: "0.8125rem", border: "1px solid #E5E7EB", outline: "none", color: C.slate }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontFamily: F.body, fontSize: "0.75rem", color: C.teal, fontWeight: 500, display: "block", marginBottom: "0.375rem" }}>
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: C.slate, opacity: 0.3 }} />
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah@example.com"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl"
                  style={{ fontFamily: F.body, fontSize: "0.8125rem", border: "1px solid #E5E7EB", outline: "none", color: C.slate }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontFamily: F.body, fontSize: "0.75rem", color: C.teal, fontWeight: 500, display: "block", marginBottom: "0.375rem" }}>
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: C.slate, opacity: 0.3 }} />
                <input
                  type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl"
                  style={{ fontFamily: F.body, fontSize: "0.8125rem", border: "1px solid #E5E7EB", outline: "none", color: C.slate }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                  {showPassword ? <EyeOff size={16} style={{ color: C.slate, opacity: 0.3 }} /> : <Eye size={16} style={{ color: C.slate, opacity: 0.3 }} />}
                </button>
              </div>
            </div>

            <div>
              <label style={{ fontFamily: F.body, fontSize: "0.75rem", color: C.teal, fontWeight: 500, display: "block", marginBottom: "0.375rem" }}>
                Company Name <span style={{ opacity: 0.4, fontWeight: 400 }}>(optional)</span>
              </label>
              <div className="relative">
                <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: C.slate, opacity: 0.3 }} />
                <input
                  type="text" value={company} onChange={(e) => setCompany(e.target.value)}
                  placeholder="Your company or brand"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl"
                  style={{ fontFamily: F.body, fontSize: "0.8125rem", border: "1px solid #E5E7EB", outline: "none", color: C.slate }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontFamily: F.body, fontSize: "0.75rem", color: C.teal, fontWeight: 500, display: "block", marginBottom: "0.375rem" }}>
                How many properties do you manage?
              </label>
              <div className="grid grid-cols-4 gap-2">
                {["1-2", "3-5", "6-20", "20+"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setPropertyCount(opt)}
                    className="py-2 rounded-xl transition-all"
                    style={{
                      fontFamily: F.body,
                      fontSize: "0.8125rem",
                      fontWeight: propertyCount === opt ? 600 : 400,
                      color: propertyCount === opt ? "white" : C.teal,
                      backgroundColor: propertyCount === opt ? C.green : "#F3F4F6",
                      border: propertyCount === opt ? `1px solid ${C.green}` : "1px solid #E5E7EB",
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white transition-all hover:opacity-90 mt-2"
              style={{ backgroundColor: C.green, fontFamily: F.body, fontSize: "0.875rem", fontWeight: 600 }}
            >
              Create Account
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span style={{ fontFamily: F.body, fontSize: "0.6875rem", color: C.slate, opacity: 0.35 }}>or continue with</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate("/onboarding")}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              style={{ border: "1px solid #E5E7EB", fontFamily: F.body, fontSize: "0.8125rem", color: C.slate, fontWeight: 500 }}
            >
              Google
            </button>
            <button
              onClick={() => navigate("/onboarding")}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              style={{ border: "1px solid #E5E7EB", fontFamily: F.body, fontSize: "0.8125rem", color: C.slate, fontWeight: 500 }}
            >
              Apple
            </button>
          </div>

          <p className="text-center mt-6" style={{ fontFamily: F.body, fontSize: "0.8125rem", color: C.slate, opacity: 0.5 }}>
            Already have an account?{" "}
            <button onClick={() => navigate("/login")} style={{ color: C.green, fontWeight: 600 }}>
              Sign In
            </button>
          </p>

          <p className="text-center mt-4" style={{ fontFamily: F.body, fontSize: "0.625rem", color: C.slate, opacity: 0.25 }}>
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}