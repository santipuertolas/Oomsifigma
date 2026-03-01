import {
  LayoutDashboard,
  CalendarDays,
  MessageSquare,
  Building2,
  Users,
  ClipboardList,
  Menu,
  X,
  Settings,
  HelpCircle,
  LogOut,
  User,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: CalendarDays, label: "Calendar", path: "/dashboard/calendar" },
  { icon: MessageSquare, label: "Inbox", path: "/dashboard/inbox", badge: 3 },
  { icon: Building2, label: "Properties", path: "/dashboard/properties" },
  { icon: Users, label: "Team", path: "/dashboard/team" },
  { icon: ClipboardList, label: "Tasks", path: "/dashboard/tasks" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  { icon: HelpCircle, label: "Help", path: "/dashboard/help" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <div
        className="lg:hidden flex items-center justify-between px-4 py-3 sticky top-0 z-50"
        style={{ backgroundColor: "#264653" }}
      >
        <span
          className="text-white cursor-pointer"
          style={{ fontFamily: "Nunito, sans-serif", fontSize: "1.25rem", fontWeight: 800 }}
          onClick={() => { navigate("/"); setOpen(false); }}
        >
          oomsi
        </span>
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white cursor-pointer"
            style={{ backgroundColor: "#2A9D8F", fontSize: "0.5625rem", fontWeight: 600 }}
            onClick={() => { navigate("/dashboard/profile"); setOpen(false); }}
          >
            SM
          </div>
          <button onClick={() => setOpen(!open)} className="text-white">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="lg:hidden fixed inset-0 top-12 z-40 px-4 pt-2 pb-4 overflow-y-auto"
          style={{ backgroundColor: "#264653" }}
        >
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = item.path === "/dashboard" ? location.pathname === "/dashboard" : location.pathname.startsWith(item.path);
              return (
                <button
                  key={item.label}
                  onClick={() => { navigate(item.path); setOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "text-white/60 hover:text-white hover:bg-white/8"
                  }`}
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem" }}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className="ml-auto flex items-center justify-center w-5 h-5 rounded-full text-white"
                      style={{ backgroundColor: "#2A9D8F", fontSize: "0.7rem", fontWeight: 600 }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
          <div className="border-t border-white/10 mt-4 pt-4 space-y-1">
            <button
              onClick={() => { navigate("/dashboard/profile"); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/60 hover:text-white hover:bg-white/8 transition-all"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem" }}
            >
              <User size={20} />
              <span>Profile</span>
            </button>
            <button
              onClick={() => { navigate("/login"); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/60 hover:text-white hover:bg-white/8 transition-all"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem" }}
            >
              <LogOut size={20} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}