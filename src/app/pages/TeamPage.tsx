import { useState } from "react";
import {
  UserPlus, Mail, Phone, Star, CheckCircle2, MoreHorizontal, Search,
  X, Edit3, Check, DollarSign, Calendar, Clock, TrendingUp,
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: "owner" | "manager" | "cleaner" | "maintenance";
  email: string;
  phone: string;
  assignedProperties: string[];
  tasksCompleted: number;
  rating: number;
  status: "available" | "busy" | "offline";
  hourlyRate: number;
  cleaningsThisMonth: number;
  amountDueThisMonth: number;
  avgCleaningTime: string;
  joinedDate: string;
  notes: string;
}

const team: TeamMember[] = [
  {
    id: "1", name: "Sarah Mitchell", avatar: "SM", role: "owner",
    email: "sarah@oomsi.co", phone: "+1 (555) 123-4567",
    assignedProperties: ["All Properties"], tasksCompleted: 0, rating: 0, status: "available",
    hourlyRate: 0, cleaningsThisMonth: 0, amountDueThisMonth: 0, avgCleaningTime: "-", joinedDate: "Mar 2024", notes: "",
  },
  {
    id: "2", name: "David Chen", avatar: "DC", role: "manager",
    email: "david@oomsi.co", phone: "+1 (555) 234-5678",
    assignedProperties: ["Seaside Villa", "Beach House", "Tropical Resort"], tasksCompleted: 156, rating: 4.9, status: "available",
    hourlyRate: 35, cleaningsThisMonth: 0, amountDueThisMonth: 0, avgCleaningTime: "-", joinedDate: "Apr 2024", notes: "Handles all guest escalations.",
  },
  {
    id: "3", name: "Maria Santos", avatar: "MS", role: "cleaner",
    email: "maria@email.com", phone: "+1 (555) 345-6789",
    assignedProperties: ["Seaside Villa", "Mountain Cabin"], tasksCompleted: 312, rating: 4.95, status: "busy",
    hourlyRate: 28, cleaningsThisMonth: 18, amountDueThisMonth: 1512, avgCleaningTime: "2h 45min", joinedDate: "Mar 2024", notes: "Top performer. Speaks Spanish & English.",
  },
  {
    id: "4", name: "Carlos Diaz", avatar: "CD", role: "cleaner",
    email: "carlos@email.com", phone: "+1 (555) 456-7890",
    assignedProperties: ["Beach House", "Tropical Resort"], tasksCompleted: 198, rating: 4.7, status: "available",
    hourlyRate: 25, cleaningsThisMonth: 14, amountDueThisMonth: 1050, avgCleaningTime: "3h 10min", joinedDate: "Jun 2024", notes: "Also handles pool maintenance.",
  },
  {
    id: "5", name: "Anna Kowalski", avatar: "AK", role: "cleaner",
    email: "anna@email.com", phone: "+1 (555) 567-8901",
    assignedProperties: ["City Apartment", "Lakeside Cottage"], tasksCompleted: 87, rating: 4.8, status: "offline",
    hourlyRate: 26, cleaningsThisMonth: 8, amountDueThisMonth: 624, avgCleaningTime: "2h 30min", joinedDate: "Sep 2024", notes: "",
  },
  {
    id: "6", name: "Tom Johnson", avatar: "TJ", role: "maintenance",
    email: "tom@email.com", phone: "+1 (555) 678-9012",
    assignedProperties: ["All Properties"], tasksCompleted: 64, rating: 4.6, status: "available",
    hourlyRate: 40, cleaningsThisMonth: 5, amountDueThisMonth: 600, avgCleaningTime: "1h 30min", joinedDate: "May 2024", notes: "Licensed plumber & electrician.",
  },
];

const roleConfig: Record<string, { label: string; color: string; bg: string }> = {
  owner: { label: "Owner", color: "#264653", bg: "#26465315" },
  manager: { label: "Manager", color: "#2A9D8F", bg: "#2A9D8F15" },
  cleaner: { label: "Cleaner", color: "#E9C46A", bg: "#E9C46A20" },
  maintenance: { label: "Maintenance", color: "#A29BFE", bg: "#A29BFE20" },
};

const statusConfig: Record<string, { label: string; color: string }> = {
  available: { label: "Available", color: "#2A9D8F" },
  busy: { label: "Busy", color: "#E9C46A" },
  offline: { label: "Offline", color: "#CBD5E1" },
};

export function TeamPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [editingMember, setEditingMember] = useState(false);

  const filtered = team.filter((m) => {
    if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (roleFilter !== "all" && m.role !== roleFilter) return false;
    return true;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "1.5rem", fontWeight: 700 }}>Team</h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "#2D3436", opacity: 0.5 }}>{team.length} team members</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
          style={{ backgroundColor: "#2A9D8F", fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 500 }}
        >
          <UserPlus size={16} />
          Invite Member
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#2D3436", opacity: 0.3 }} />
          <input type="text" placeholder="Search team..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-3 py-2 rounded-lg"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", backgroundColor: "white", border: "1px solid #E5E7EB", outline: "none", color: "#2D3436", width: "220px" }}
          />
        </div>
        <div className="flex gap-1">
          {["all", "owner", "manager", "cleaner", "maintenance"].map((r) => (
            <button key={r} onClick={() => setRoleFilter(r)} className="px-3 py-1.5 rounded-lg transition-all"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 500, backgroundColor: roleFilter === r ? "#264653" : "transparent", color: roleFilter === r ? "white" : "#2D343660" }}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Team cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((member) => {
          const rc = roleConfig[member.role];
          const sc = statusConfig[member.status];
          return (
            <div key={member.id} className="bg-white rounded-2xl p-5 cursor-pointer hover:shadow-md transition-all"
              style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.06)" }}
              onClick={() => { setSelectedMember(member); setEditingMember(false); }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#264653", fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "white", fontWeight: 600 }}
                    >{member.avatar}</div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white" style={{ backgroundColor: sc.color }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "#264653", fontWeight: 600 }}>{member.name}</p>
                    <span className="inline-block px-2 py-0.5 rounded-md mt-0.5"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.625rem", color: rc.color, backgroundColor: rc.bg, fontWeight: 600 }}
                    >{rc.label}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <Mail size={13} style={{ color: "#2D3436", opacity: 0.3 }} />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#2D3436", opacity: 0.5 }}>{member.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={13} style={{ color: "#2D3436", opacity: 0.3 }} />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#2D3436", opacity: 0.5 }}>{member.phone}</span>
                </div>
                {member.hourlyRate > 0 && (
                  <div className="flex items-center gap-2">
                    <DollarSign size={13} style={{ color: "#2D3436", opacity: 0.3 }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#264653", fontWeight: 500 }}>${member.hourlyRate}/hr</span>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.4, marginBottom: "0.375rem" }}>Assigned Properties</p>
                <div className="flex flex-wrap gap-1">
                  {member.assignedProperties.map((p) => (
                    <span key={p} className="px-2 py-0.5 rounded"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.625rem", color: "#264653", backgroundColor: "#F8F9FA", fontWeight: 500 }}
                    >{p}</span>
                  ))}
                </div>
              </div>

              {member.role !== "owner" && (
                <div className="flex items-center gap-4 pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 size={13} style={{ color: "#2A9D8F" }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#264653", fontWeight: 600 }}>{member.tasksCompleted}</span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.625rem", color: "#2D3436", opacity: 0.4 }}>total</span>
                  </div>
                  {member.cleaningsThisMonth > 0 && (
                    <div className="flex items-center gap-1">
                      <Calendar size={13} style={{ color: "#264653", opacity: 0.4 }} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#264653", fontWeight: 600 }}>{member.cleaningsThisMonth}</span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.625rem", color: "#2D3436", opacity: 0.4 }}>this mo</span>
                    </div>
                  )}
                  {member.rating > 0 && (
                    <div className="flex items-center gap-1 ml-auto">
                      <Star size={13} style={{ color: "#E9C46A" }} fill="#E9C46A" />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#264653", fontWeight: 600 }}>{member.rating}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Member detail modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(38,70,83,0.4)" }}>
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            style={{ boxShadow: "0 20px 60px rgba(38,70,83,0.15)" }}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#264653", fontFamily: "Inter, sans-serif", fontSize: "1.125rem", color: "white", fontWeight: 600 }}
                    >{selectedMember.avatar}</div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white"
                      style={{ backgroundColor: statusConfig[selectedMember.status].color }} />
                  </div>
                  <div>
                    {editingMember ? (
                      <input type="text" defaultValue={selectedMember.name} className="bg-transparent outline-none border-b border-gray-200 pb-0.5"
                        style={{ fontFamily: "Nunito, sans-serif", fontSize: "1.25rem", color: "#264653", fontWeight: 700 }}
                      />
                    ) : (
                      <h2 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "1.25rem", fontWeight: 700 }}>{selectedMember.name}</h2>
                    )}
                    <span className="inline-block px-2.5 py-0.5 rounded-md mt-1"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: roleConfig[selectedMember.role].color, backgroundColor: roleConfig[selectedMember.role].bg, fontWeight: 600 }}
                    >{roleConfig[selectedMember.role].label}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selectedMember.role !== "owner" && (
                    <button onClick={() => setEditingMember(!editingMember)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all hover:opacity-90"
                      style={{
                        backgroundColor: editingMember ? "#2A9D8F" : "#F8F9FA",
                        color: editingMember ? "white" : "#264653",
                        fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 500,
                      }}
                    >
                      {editingMember ? <Check size={14} /> : <Edit3 size={14} />}
                      {editingMember ? "Save" : "Edit"}
                    </button>
                  )}
                  <button onClick={() => setSelectedMember(null)}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <X size={16} style={{ color: "#264653" }} />
                  </button>
                </div>
              </div>

              {/* Contact info */}
              <div className="space-y-3 mb-6">
                {[
                  { icon: Mail, label: "Email", value: selectedMember.email },
                  { icon: Phone, label: "Phone", value: selectedMember.phone },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <item.icon size={16} style={{ color: "#2D3436", opacity: 0.3 }} />
                    {editingMember ? (
                      <input type="text" defaultValue={item.value} className="flex-1 bg-transparent outline-none border-b border-gray-100 pb-0.5"
                        style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#264653" }}
                      />
                    ) : (
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#2D3436", opacity: 0.6 }}>{item.value}</span>
                    )}
                  </div>
                ))}
                {selectedMember.hourlyRate > 0 && (
                  <div className="flex items-center gap-3">
                    <DollarSign size={16} style={{ color: "#2D3436", opacity: 0.3 }} />
                    {editingMember ? (
                      <div className="flex items-center gap-1">
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#2D3436", opacity: 0.4 }}>$</span>
                        <input type="number" defaultValue={selectedMember.hourlyRate} className="w-16 bg-transparent outline-none border-b border-gray-100 pb-0.5"
                          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#264653" }}
                        />
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#2D3436", opacity: 0.4 }}>/hr</span>
                      </div>
                    ) : (
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#264653", fontWeight: 500 }}>${selectedMember.hourlyRate}/hr</span>
                    )}
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Calendar size={16} style={{ color: "#2D3436", opacity: 0.3 }} />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#2D3436", opacity: 0.6 }}>Joined {selectedMember.joinedDate}</span>
                </div>
              </div>

              {/* Performance stats */}
              {selectedMember.role !== "owner" && (
                <div className="mb-6">
                  <h3 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "0.9375rem", fontWeight: 700, marginBottom: "0.75rem" }}>
                    Performance
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl text-center" style={{ backgroundColor: "#F8F9FA" }}>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1.25rem", color: "#264653", fontWeight: 600 }}>{selectedMember.tasksCompleted}</p>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.625rem", color: "#2D3436", opacity: 0.4 }}>Total Cleanings</p>
                    </div>
                    <div className="p-3 rounded-xl text-center" style={{ backgroundColor: "#F8F9FA" }}>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1.25rem", color: "#264653", fontWeight: 600 }}>{selectedMember.cleaningsThisMonth}</p>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.625rem", color: "#2D3436", opacity: 0.4 }}>This Month</p>
                    </div>
                    <div className="p-3 rounded-xl text-center" style={{ backgroundColor: "#F8F9FA" }}>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1.25rem", color: "#2A9D8F", fontWeight: 600 }}>
                        ${selectedMember.amountDueThisMonth.toLocaleString()}
                      </p>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.625rem", color: "#2D3436", opacity: 0.4 }}>Amount Due</p>
                    </div>
                    <div className="p-3 rounded-xl text-center" style={{ backgroundColor: "#F8F9FA" }}>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1.25rem", color: "#264653", fontWeight: 600 }}>{selectedMember.avgCleaningTime}</p>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.625rem", color: "#2D3436", opacity: 0.4 }}>Avg. Clean Time</p>
                    </div>
                  </div>
                  {selectedMember.rating > 0 && (
                    <div className="flex items-center gap-2 mt-3 p-3 rounded-xl" style={{ backgroundColor: "#E9C46A10" }}>
                      <Star size={16} style={{ color: "#E9C46A" }} fill="#E9C46A" />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", color: "#264653", fontWeight: 600 }}>{selectedMember.rating}</span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#2D3436", opacity: 0.4 }}>average rating</span>
                    </div>
                  )}
                </div>
              )}

              {/* Assigned Properties */}
              <div className="mb-6">
                <h3 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "0.9375rem", fontWeight: 700, marginBottom: "0.75rem" }}>
                  Assigned Properties
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.assignedProperties.map((p) => (
                    <span key={p} className="px-3 py-1.5 rounded-lg"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#264653", backgroundColor: "#F8F9FA", fontWeight: 500 }}
                    >{p}</span>
                  ))}
                  {editingMember && (
                    <button className="px-3 py-1.5 rounded-lg border-2 border-dashed"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#2A9D8F", borderColor: "#2A9D8F40", fontWeight: 500 }}
                    >+ Add</button>
                  )}
                </div>
              </div>

              {/* Notes */}
              {(selectedMember.notes || editingMember) && (
                <div>
                  <h3 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "0.9375rem", fontWeight: 700, marginBottom: "0.75rem" }}>
                    Notes
                  </h3>
                  {editingMember ? (
                    <textarea defaultValue={selectedMember.notes} rows={3}
                      className="w-full px-3 py-2 rounded-lg resize-none"
                      placeholder="Add notes about this team member..."
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", border: "1px solid #E5E7EB", outline: "none", color: "#2D3436" }}
                    />
                  ) : (
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#2D3436", opacity: 0.6, lineHeight: 1.6 }}>
                      {selectedMember.notes}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
