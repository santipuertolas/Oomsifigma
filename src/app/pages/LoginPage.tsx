import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#F8F9FA" }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1
            className="tracking-tight"
            style={{ fontFamily: "Nunito, sans-serif", fontSize: "2.5rem", fontWeight: 800, color: "#264653" }}
          >
            oomsi
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", color: "#2D3436", opacity: 0.5, marginTop: "0.5rem" }}>
            Property Management. Made Simple.
          </p>
        </div>

        {/* Card */}
        <div
          className="bg-white rounded-2xl p-8"
          style={{ boxShadow: "0 4px 24px rgba(38,70,83,0.08)" }}
        >
          <h2
            style={{ fontFamily: "Nunito, sans-serif", fontSize: "1.375rem", color: "#264653", fontWeight: 700, marginBottom: "0.25rem" }}
          >
            {isSignUp ? "Create your account" : "Welcome back"}
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#2D3436", opacity: 0.5, marginBottom: "1.5rem" }}>
            {isSignUp ? "Start managing your properties with peace of mind" : "Sign in to your oomsi dashboard"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#264653", fontWeight: 500, display: "block", marginBottom: "0.375rem" }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Sarah"
                    className="w-full px-3 py-2.5 rounded-xl"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", border: "1px solid #E5E7EB", outline: "none", color: "#2D3436" }}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#264653", fontWeight: 500, display: "block", marginBottom: "0.375rem" }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Mitchell"
                    className="w-full px-3 py-2.5 rounded-xl"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", border: "1px solid #E5E7EB", outline: "none", color: "#2D3436" }}
                  />
                </div>
              </div>
            )}

            <div>
              <label style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#264653", fontWeight: 500, display: "block", marginBottom: "0.375rem" }}>
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#2D3436", opacity: 0.3 }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah@example.com"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", border: "1px solid #E5E7EB", outline: "none", color: "#2D3436" }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#264653", fontWeight: 500, display: "block", marginBottom: "0.375rem" }}>
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#2D3436", opacity: 0.3 }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", border: "1px solid #E5E7EB", outline: "none", color: "#2D3436" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff size={16} style={{ color: "#2D3436", opacity: 0.3 }} />
                  ) : (
                    <Eye size={16} style={{ color: "#2D3436", opacity: 0.3 }} />
                  )}
                </button>
              </div>
            </div>

            {!isSignUp && (
              <div className="flex justify-end">
                <button
                  type="button"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#2A9D8F", fontWeight: 500 }}
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white transition-all hover:opacity-90"
              style={{ backgroundColor: "#2A9D8F", fontFamily: "Inter, sans-serif", fontSize: "0.875rem", fontWeight: 600 }}
            >
              {isSignUp ? "Create Account" : "Sign In"}
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.35 }}>or continue with</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3">
            <button
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl transition-colors hover:bg-gray-50"
              style={{ border: "1px solid #E5E7EB", fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#2D3436", fontWeight: 500 }}
            >
              Google
            </button>
            <button
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl transition-colors hover:bg-gray-50"
              style={{ border: "1px solid #E5E7EB", fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#2D3436", fontWeight: 500 }}
            >
              Apple
            </button>
          </div>
        </div>

        {/* Toggle */}
        <p className="text-center mt-6" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#2D3436", opacity: 0.5 }}>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            style={{ color: "#2A9D8F", fontWeight: 600 }}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}