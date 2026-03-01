import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  CalendarDays,
  MessageSquare,
  Building2,
  Users,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  Settings,
  HelpCircle,
  LogOut,
  User,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: CalendarDays, label: "Calendar", path: "/calendar" },
  { icon: MessageSquare, label: "Inbox", path: "/inbox", badge: 3 },
  { icon: Building2, label: "Properties", path: "/properties" },
  { icon: Users, label: "Team", path: "/team" },
  { icon: ClipboardList, label: "Tasks", path: "/tasks" },
];

const bottomItems = [
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: HelpCircle, label: "Help", path: "/help" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside
      className={`hidden lg:flex flex-col h-screen sticky top-0 transition-all duration-300 ease-in-out ${
        collapsed ? "w-[72px]" : "w-[240px]"
      }`}
      style={{ backgroundColor: "#264653" }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-6">
        {!collapsed && (
          <span
            className="tracking-tight text-white cursor-pointer"
            style={{ fontFamily: "Nunito, sans-serif", fontSize: "1.5rem", fontWeight: 800 }}
            onClick={() => navigate("/")}
          >
            oomsi
          </span>
        )}
        {collapsed && (
          <span
            className="text-white mx-auto cursor-pointer"
            style={{ fontFamily: "Nunito, sans-serif", fontSize: "1.5rem", fontWeight: 800 }}
            onClick={() => navigate("/")}
          >
            o
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white/50 hover:text-white transition-colors ml-auto"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 mt-2 space-y-1">
        {navItems.map((item) => {
          const isActive = item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path);
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-white/15 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/8"
              }`}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <item.icon size={20} className="shrink-0" />
              {!collapsed && (
                <span className="flex-1 text-left" style={{ fontSize: "0.875rem" }}>
                  {item.label}
                </span>
              )}
              {!collapsed && item.badge && (
                <span
                  className="flex items-center justify-center w-5 h-5 rounded-full text-white"
                  style={{
                    backgroundColor: "#2A9D8F",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom items */}
      <div className="px-3 pb-3 space-y-1">
        {bottomItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive ? "text-white/80 bg-white/8" : "text-white/40 hover:text-white/70 hover:bg-white/5"
              }`}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <item.icon size={18} className="shrink-0" />
              {!collapsed && (
                <span style={{ fontSize: "0.8125rem" }}>{item.label}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Profile */}
      <div className="px-3 pb-5 relative">
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/8 transition-all duration-200"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: "#2A9D8F", fontSize: "0.6875rem", fontWeight: 600 }}
          >
            SM
          </div>
          {!collapsed && (
            <div className="flex-1 text-left min-w-0">
              <p className="truncate" style={{ fontSize: "0.8125rem" }}>Sarah Mitchell</p>
              <p className="truncate" style={{ fontSize: "0.6875rem", opacity: 0.5 }}>Owner</p>
            </div>
          )}
        </button>

        {profileOpen && (
          <div
            className="absolute bottom-full left-3 right-3 mb-1 rounded-xl overflow-hidden py-1"
            style={{ backgroundColor: "#1d3540", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
          >
            <button
              onClick={() => { navigate("/profile"); setProfileOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/8 transition-colors"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem" }}
            >
              <User size={16} />
              <span>View Profile</span>
            </button>
            <button
              onClick={() => { navigate("/login"); setProfileOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/8 transition-colors"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem" }}
            >
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}