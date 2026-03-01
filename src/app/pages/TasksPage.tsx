import { useState } from "react";
import {
  Plus, Search, Filter, ChevronDown, X, Camera, Clock,
  CheckCircle2, CircleDashed, UserCircle, Calendar, Building2,
  ArrowRight, Wrench, Sparkles, ChevronRight, ChevronLeft,
  ZoomIn, Image,
} from "lucide-react";

/* ─── Types ─── */

type TaskStatus = "pending" | "assigned" | "accepted" | "in-progress" | "completed";
type TaskType = "cleaning" | "maintenance" | "inspection" | "restock";

interface TaskPhoto {
  url: string;
  caption: string;
  uploadedAt: string;
  uploadedBy: string;
}

interface TaskWindow {
  checkoutDate: string;
  checkoutTime: string;
  checkinDate: string;
  checkinTime: string;
}

interface Task {
  id: string;
  type: TaskType;
  property: string;
  propertyImg: string;
  scheduledDate: string;
  window: TaskWindow | null;
  assignedTo: { name: string; avatar: string } | null;
  owner: string;
  status: TaskStatus;
  photos: TaskPhoto[];
  notes: string;
  priority: "normal" | "urgent";
}

/* ─── Mock data ─── */

const allTasks: Task[] = [
  {
    id: "t1", type: "cleaning", property: "Seaside Villa",
    propertyImg: "https://images.unsplash.com/photo-1521783593447-5702b9bfd267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2YWNhdGlvbiUyMHJlbnRhbCUyMHZpbGxhfGVufDF8fHx8MTc3MjE5ODg1MHww&ixlib=rb-4.1.0&q=80&w=1080",
    scheduledDate: "Mar 1, 2026",
    window: { checkoutDate: "Mar 1", checkoutTime: "11:00 AM", checkinDate: "Mar 1", checkinTime: "3:00 PM" },
    assignedTo: { name: "Maria Santos", avatar: "MS" }, owner: "Sarah Mitchell",
    status: "in-progress",
    photos: [
      { url: "https://images.unsplash.com/photo-1666934209606-a955a12edd63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMGJlZHJvb20lMjBob3RlbCUyMGZyZXNoJTIwbGluZW5zfGVufDF8fHx8MTc3MjM2MzI1M3ww&ixlib=rb-4.1.0&q=80&w=1080", caption: "Master bedroom — fresh linens", uploadedAt: "11:42 AM", uploadedBy: "Maria Santos" },
      { url: "https://images.unsplash.com/photo-1758239873506-82d0e76244f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMGJhdGhyb29tJTIwdG93ZWxzJTIwb3JnYW5pemVkfGVufDF8fHx8MTc3MjM2MzI1M3ww&ixlib=rb-4.1.0&q=80&w=1080", caption: "Main bathroom — towels restocked", uploadedAt: "12:05 PM", uploadedBy: "Maria Santos" },
      { url: "https://images.unsplash.com/photo-1768039049614-f3c2bae3f1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMG1vZGVybiUyMGtpdGNoZW4lMjBjb3VudGVyJTIwc3BvdGxlc3N8ZW58MXx8fHwxNzcyMzYzMjU0fDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "Kitchen — counters wiped, dishes done", uploadedAt: "12:18 PM", uploadedBy: "Maria Santos" },
    ],
    notes: "Full turnover clean. Guest requested hypoallergenic bedding.", priority: "normal",
  },
  {
    id: "t2", type: "cleaning", property: "Beach House",
    propertyImg: "https://images.unsplash.com/photo-1765124540398-d717b5b06f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWFjaCUyMGhvdXNlJTIwcmVudGFsfGVufDF8fHx8MTc3MjE5ODg1MHww&ixlib=rb-4.1.0&q=80&w=1080",
    scheduledDate: "Mar 1, 2026",
    window: { checkoutDate: "Mar 1", checkoutTime: "10:00 AM", checkinDate: "Mar 2", checkinTime: "4:00 PM" },
    assignedTo: { name: "Carlos Diaz", avatar: "CD" }, owner: "Sarah Mitchell",
    status: "accepted", photos: [],
    notes: "Standard clean. Check BBQ area.", priority: "normal",
  },
  {
    id: "t3", type: "maintenance", property: "Mountain Cabin",
    propertyImg: "https://images.unsplash.com/photo-1634849662801-a00d83441092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwbW91bnRhaW4lMjBjYWJpbiUyMGludGVyaW9yfGVufDF8fHx8MTc3MjE5ODg1MXww&ixlib=rb-4.1.0&q=80&w=1080",
    scheduledDate: "Mar 2, 2026",
    window: null,
    assignedTo: { name: "Tom Johnson", avatar: "TJ" }, owner: "David Chen",
    status: "assigned", photos: [],
    notes: "Hot tub filter replacement & water chemistry check.", priority: "urgent",
  },
  {
    id: "t4", type: "cleaning", property: "Tropical Resort",
    propertyImg: "https://images.unsplash.com/photo-1728049006343-9ee0187643d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHJlc29ydCUyMHBvb2wlMjB2aWxsYXxlbnwxfHx8fDE3NzIyMDAxNzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    scheduledDate: "Mar 1, 2026",
    window: { checkoutDate: "Mar 1", checkoutTime: "12:00 PM", checkinDate: "Mar 3", checkinTime: "2:00 PM" },
    assignedTo: null, owner: "Sarah Mitchell",
    status: "pending", photos: [],
    notes: "VIP guest arriving. Extra attention to pool area and welcome setup.", priority: "urgent",
  },
  {
    id: "t5", type: "cleaning", property: "City Apartment",
    propertyImg: "https://images.unsplash.com/photo-1695918808943-9db9cddc1ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBjaXR5JTIwc2t5bGluZXxlbnwxfHx8fDE3NzIyMDAxNzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    scheduledDate: "Mar 2, 2026",
    window: { checkoutDate: "Mar 2", checkoutTime: "11:00 AM", checkinDate: "Mar 2", checkinTime: "3:00 PM" },
    assignedTo: { name: "Anna Kowalski", avatar: "AK" }, owner: "David Chen",
    status: "assigned", photos: [],
    notes: "Standard turnover.", priority: "normal",
  },
  {
    id: "t6", type: "inspection", property: "Lakeside Cottage",
    propertyImg: "https://images.unsplash.com/photo-1761549148430-85b7abf00f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlc2lkZSUyMGNvdHRhZ2UlMjByZXRyZWF0fGVufDF8fHx8MTc3MjIwMDE3MXww&ixlib=rb-4.1.0&q=80&w=1080",
    scheduledDate: "Mar 3, 2026",
    window: null,
    assignedTo: { name: "David Chen", avatar: "DC" }, owner: "Sarah Mitchell",
    status: "pending", photos: [],
    notes: "Quarterly safety & fire alarm inspection.", priority: "normal",
  },
  {
    id: "t7", type: "restock", property: "Seaside Villa",
    propertyImg: "https://images.unsplash.com/photo-1521783593447-5702b9bfd267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2YWNhdGlvbiUyMHJlbnRhbCUyMHZpbGxhfGVufDF8fHx8MTc3MjE5ODg1MHww&ixlib=rb-4.1.0&q=80&w=1080",
    scheduledDate: "Mar 1, 2026",
    window: null,
    assignedTo: { name: "Maria Santos", avatar: "MS" }, owner: "Sarah Mitchell",
    status: "completed",
    photos: [
      { url: "https://images.unsplash.com/photo-1664917555352-f3f66e57ccc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHRvaWxldHJpZXMlMjBiYXRocm9vbSUyMGFtZW5pdGllcyUyMGFycmFuZ2VkfGVufDF8fHx8MTc3MjM2MzI1NXww&ixlib=rb-4.1.0&q=80&w=1080", caption: "Bathroom amenities restocked", uploadedAt: "9:15 AM", uploadedBy: "Maria Santos" },
      { url: "https://images.unsplash.com/photo-1520640521557-c084300f1276?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxjb21lJTIwYmFza2V0JTIwcmVzb3J0JTIwZ3Vlc3QlMjBhbWVuaXRpZXN8ZW58MXx8fHwxNzcyMzYzMjU1fDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "Welcome basket prepared", uploadedAt: "9:28 AM", uploadedBy: "Maria Santos" },
      { url: "https://images.unsplash.com/photo-1768039049614-f3c2bae3f1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMG1vZGVybiUyMGtpdGNoZW4lMjBjb3VudGVyJTIwc3BvdGxlc3N8ZW58MXx8fHwxNzcyMzYzMjU0fDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "Kitchen — coffee pods & snacks stocked", uploadedAt: "9:35 AM", uploadedBy: "Maria Santos" },
      { url: "https://images.unsplash.com/photo-1763051338904-e2434c7dd20a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29sJTIwYXJlYSUyMGNsZWFuJTIwcmVzb3J0JTIwbWFpbnRhaW5lZHxlbnwxfHx8fDE3NzIzNjMyNTd8MA&ixlib=rb-4.1.0&q=80&w=1080", caption: "Pool towels & sunscreen set out", uploadedAt: "9:48 AM", uploadedBy: "Maria Santos" },
      { url: "https://images.unsplash.com/photo-1560990883-9b76fec399a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHBhdGlvJTIwb3V0ZG9vciUyMGZ1cm5pdHVyZSUyMHZhY2F0aW9ufGVufDF8fHx8MTc3MjM2MzI1N3ww&ixlib=rb-4.1.0&q=80&w=1080", caption: "Patio area — cushions & decor refreshed", uploadedAt: "10:02 AM", uploadedBy: "Maria Santos" },
    ],
    notes: "Restock toiletries, coffee pods, welcome kit.", priority: "normal",
  },
  {
    id: "t8", type: "cleaning", property: "Mountain Cabin",
    propertyImg: "https://images.unsplash.com/photo-1634849662801-a00d83441092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwbW91bnRhaW4lMjBjYWJpbiUyMGludGVyaW9yfGVufDF8fHx8MTc3MjE5ODg1MXww&ixlib=rb-4.1.0&q=80&w=1080",
    scheduledDate: "Mar 4, 2026",
    window: { checkoutDate: "Mar 4", checkoutTime: "10:00 AM", checkinDate: "Mar 5", checkinTime: "4:00 PM" },
    assignedTo: null, owner: "Sarah Mitchell",
    status: "pending", photos: [],
    notes: "", priority: "normal",
  },
];

const availableCleaners = [
  { name: "Maria Santos", avatar: "MS" },
  { name: "Carlos Diaz", avatar: "CD" },
  { name: "Anna Kowalski", avatar: "AK" },
  { name: "Tom Johnson", avatar: "TJ" },
  { name: "David Chen", avatar: "DC" },
];

const propertyNames = [...new Set(allTasks.map((t) => t.property))];
const ownerNames = [...new Set(allTasks.map((t) => t.owner))];
const dateValues = [...new Set(allTasks.map((t) => t.scheduledDate))];

/* ─── Config ─── */

const statusConfig: Record<TaskStatus, { label: string; color: string; bg: string }> = {
  pending: { label: "Pending", color: "#94A3B8", bg: "#94A3B815" },
  assigned: { label: "Assigned", color: "#264653", bg: "#26465312" },
  accepted: { label: "Accepted", color: "#A29BFE", bg: "#A29BFE15" },
  "in-progress": { label: "In Progress", color: "#E9C46A", bg: "#E9C46A18" },
  completed: { label: "Completed", color: "#2A9D8F", bg: "#2A9D8F15" },
};

const typeConfig: Record<TaskType, { label: string; color: string; icon: typeof Sparkles }> = {
  cleaning: { label: "Cleaning", color: "#2A9D8F", icon: Sparkles },
  maintenance: { label: "Maintenance", color: "#E76F51", icon: Wrench },
  inspection: { label: "Inspection", color: "#264653", icon: Search },
  restock: { label: "Restock", color: "#A29BFE", icon: Building2 },
};

/* ─── Helpers ─── */

function isSameDay(w: TaskWindow) {
  return w.checkoutDate === w.checkinDate;
}

function WindowBadge({ w }: { w: TaskWindow }) {
  if (isSameDay(w)) {
    return (
      <div className="flex items-center gap-1">
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.5 }}>
          {w.checkoutTime}
        </span>
        <ArrowRight size={10} style={{ color: "#2D3436", opacity: 0.25 }} />
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.5 }}>
          {w.checkinTime}
        </span>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-0.5">
      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.5 }}>
        {w.checkoutDate} {w.checkoutTime}
      </span>
      <div className="flex items-center gap-1">
        <ArrowRight size={9} style={{ color: "#2A9D8F", opacity: 0.5 }} />
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2A9D8F", opacity: 0.7, fontWeight: 500 }}>
          {w.checkinDate} {w.checkinTime}
        </span>
      </div>
    </div>
  );
}

/* ─── Component ─── */

export function TasksPage() {
  const [tasks, setTasks] = useState(allTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [ownerFilter, setOwnerFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [assigningTaskId, setAssigningTaskId] = useState<string | null>(null);
  const [showNewTask, setShowNewTask] = useState(false);

  const filtered = tasks.filter((t) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (
        !t.property.toLowerCase().includes(q) &&
        !t.assignedTo?.name.toLowerCase().includes(q) &&
        !t.notes.toLowerCase().includes(q)
      )
        return false;
    }
    if (propertyFilter !== "all" && t.property !== propertyFilter) return false;
    if (ownerFilter !== "all" && t.owner !== ownerFilter) return false;
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    if (dateFilter !== "all" && t.scheduledDate !== dateFilter) return false;
    return true;
  });

  const handleAssign = (taskId: string, cleaner: { name: string; avatar: string }) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, assignedTo: cleaner, status: t.status === "pending" ? "assigned" : t.status } : t
      )
    );
    setAssigningTaskId(null);
  };

  const statusCounts = {
    all: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    "in-progress": tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "1.5rem", fontWeight: 700 }}>
            Tasks
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "#2D3436", opacity: 0.5 }}>
            {tasks.length} tasks across all properties
          </p>
        </div>
        <button
          onClick={() => setShowNewTask(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
          style={{ backgroundColor: "#2A9D8F", fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 500 }}
        >
          <Plus size={16} />
          New Task
        </button>
      </div>

      {/* Status summary pills */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {(["all", "pending", "in-progress", "completed"] as const).map((key) => (
          <button
            key={key}
            onClick={() => setStatusFilter(key === "all" ? "all" : key)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all"
            style={{
              fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 500,
              backgroundColor: statusFilter === key || (key === "all" && statusFilter === "all") ? "#264653" : "white",
              color: statusFilter === key || (key === "all" && statusFilter === "all") ? "white" : "#2D343670",
              boxShadow: "0 1px 2px rgba(38,70,83,0.04)",
            }}
          >
            {key === "all" ? "All" : statusConfig[key as TaskStatus]?.label ?? key}
            <span
              className="ml-0.5 px-1.5 py-0.5 rounded-md"
              style={{
                fontSize: "0.625rem", fontWeight: 600,
                backgroundColor: statusFilter === key || (key === "all" && statusFilter === "all") ? "rgba(255,255,255,0.2)" : "#F3F4F6",
              }}
            >
              {statusCounts[key]}
            </span>
          </button>
        ))}
      </div>

      {/* Search + filter toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#2D3436", opacity: 0.3 }} />
          <input
            type="text" placeholder="Search tasks..."
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", backgroundColor: "white", border: "1px solid #E5E7EB", outline: "none", color: "#2D3436" }}
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all"
          style={{
            fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 500,
            backgroundColor: showFilters ? "#264653" : "white",
            color: showFilters ? "white" : "#264653",
            border: "1px solid #E5E7EB",
          }}
        >
          <Filter size={14} />
          Filters
          {(propertyFilter !== "all" || ownerFilter !== "all" || dateFilter !== "all") && (
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#2A9D8F" }} />
          )}
        </button>
      </div>

      {/* Expandable filter bar */}
      {showFilters && (
        <div
          className="bg-white rounded-xl p-4 mb-4 flex flex-wrap gap-3"
          style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.06)" }}
        >
          <FilterDropdown label="Property" value={propertyFilter} options={propertyNames} onChange={setPropertyFilter} />
          <FilterDropdown label="Owner" value={ownerFilter} options={ownerNames} onChange={setOwnerFilter} />
          <FilterDropdown label="Date" value={dateFilter} options={dateValues} onChange={setDateFilter} />
          {(propertyFilter !== "all" || ownerFilter !== "all" || dateFilter !== "all") && (
            <button
              onClick={() => { setPropertyFilter("all"); setOwnerFilter("all"); setDateFilter("all"); }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 transition-colors self-end"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#EF4444", fontWeight: 500 }}
            >
              <X size={12} /> Clear all
            </button>
          )}
        </div>
      )}

      {/* Task list */}
      {filtered.length === 0 ? (
        <div
          className="bg-white rounded-2xl py-16 flex flex-col items-center justify-center"
          style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.06)" }}
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: "#F8F9FA" }}>
            <CheckCircle2 size={24} style={{ color: "#CBD5E1" }} />
          </div>
          <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "1.125rem", color: "#264653", fontWeight: 700 }}>No tasks found</p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#2D3436", opacity: 0.4, marginTop: "0.25rem" }}>
            {searchQuery || propertyFilter !== "all" || statusFilter !== "all"
              ? "Try adjusting your filters"
              : "All caught up! Create a new task to get started."}
          </p>
          {!searchQuery && propertyFilter === "all" && statusFilter === "all" && (
            <button
              onClick={() => setShowNewTask(true)}
              className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
              style={{ backgroundColor: "#2A9D8F", fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 500 }}
            >
              <Plus size={16} /> New Task
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.06)" }}>
          {/* Table header */}
          <div className="hidden md:grid grid-cols-12 gap-3 px-5 py-3 border-b border-gray-100">
            {[
              { label: "Task", span: "col-span-4" },
              { label: "Scheduled", span: "col-span-2" },
              { label: "Assigned To", span: "col-span-2" },
              { label: "Window", span: "col-span-2" },
              { label: "Status", span: "col-span-2" },
            ].map((h) => (
              <div key={h.label} className={h.span}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.4, fontWeight: 500 }}>
                  {h.label}
                </span>
              </div>
            ))}
          </div>

          {/* Task rows */}
          <div className="divide-y divide-gray-50">
            {filtered.map((task) => {
              const sc = statusConfig[task.status];
              const tc = typeConfig[task.type];
              const TypeIcon = tc.icon;

              return (
                <div key={task.id} className="relative">
                  <div
                    className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center px-5 py-4 hover:bg-gray-50/40 transition-colors cursor-pointer"
                    onClick={() => setSelectedTask(task)}
                  >
                    {/* Task info */}
                    <div className="md:col-span-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
                        <img src={task.propertyImg} alt={task.property} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#264653", fontWeight: 600 }}>
                            {task.property}
                          </span>
                          {task.priority === "urgent" && (
                            <span className="px-1.5 py-0.5 rounded"
                              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5rem", color: "#EF4444", backgroundColor: "#FEE2E2", fontWeight: 700, letterSpacing: "0.04em" }}
                            >
                              URGENT
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <TypeIcon size={11} style={{ color: tc.color, opacity: 0.7 }} />
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: tc.color, fontWeight: 500 }}>
                            {tc.label}
                          </span>
                          {task.photos.length > 0 && (
                            <span className="flex items-center gap-0.5 ml-1 px-1.5 py-0.5 rounded"
                              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5625rem", color: "#264653", backgroundColor: "#F3F4F6", fontWeight: 500 }}
                            >
                              <Camera size={9} /> {task.photos.length}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Scheduled date */}
                    <div className="md:col-span-2 flex items-center gap-1.5">
                      <Calendar size={13} className="hidden md:block" style={{ color: "#2D3436", opacity: 0.3 }} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#2D3436", opacity: 0.55 }}>
                        {task.scheduledDate}
                      </span>
                    </div>

                    {/* Assigned to */}
                    <div className="md:col-span-2">
                      {task.assignedTo ? (
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                            style={{ backgroundColor: "#264653", fontFamily: "Inter, sans-serif", fontSize: "0.5625rem", color: "white", fontWeight: 600 }}
                          >
                            {task.assignedTo.avatar}
                          </div>
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#264653", fontWeight: 500 }}>
                            {task.assignedTo.name.split(" ")[0]}
                          </span>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => { e.stopPropagation(); setAssigningTaskId(task.id); }}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors hover:bg-gray-100"
                          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2A9D8F", fontWeight: 500, border: "1px dashed #2A9D8F40" }}
                        >
                          <UserCircle size={14} /> Assign
                        </button>
                      )}
                    </div>

                    {/* Task window */}
                    <div className="md:col-span-2">
                      {task.window ? (
                        <WindowBadge w={task.window} />
                      ) : (
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.3 }}>
                          Flexible
                        </span>
                      )}
                    </div>

                    {/* Status */}
                    <div className="md:col-span-2 flex items-center justify-between">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                        style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: sc.color, backgroundColor: sc.bg, fontWeight: 600 }}
                      >
                        {task.status === "completed" ? <CheckCircle2 size={12} /> :
                         task.status === "in-progress" ? <Clock size={12} /> :
                         <CircleDashed size={12} />}
                        {sc.label}
                      </span>
                      <ChevronRight size={14} className="hidden md:block" style={{ color: "#2D3436", opacity: 0.15 }} />
                    </div>
                  </div>

                  {/* Inline assign dropdown */}
                  {assigningTaskId === task.id && (
                    <div className="absolute z-20 left-[45%] md:left-[50%] top-2 -translate-x-1/2 bg-white rounded-xl py-2 w-52"
                      style={{ boxShadow: "0 8px 30px rgba(38,70,83,0.15)", border: "1px solid #E5E7EB" }}
                    >
                      <div className="flex items-center justify-between px-3 pb-2 border-b border-gray-50">
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#264653", fontWeight: 600 }}>
                          Assign to
                        </span>
                        <button onClick={(e) => { e.stopPropagation(); setAssigningTaskId(null); }} className="hover:bg-gray-50 rounded p-0.5 transition-colors">
                          <X size={12} style={{ color: "#2D3436", opacity: 0.4 }} />
                        </button>
                      </div>
                      {availableCleaners.map((c) => (
                        <button
                          key={c.name}
                          onClick={(e) => { e.stopPropagation(); handleAssign(task.id, c); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-gray-50 transition-colors"
                        >
                          <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                            style={{ backgroundColor: "#264653", fontFamily: "Inter, sans-serif", fontSize: "0.5rem", color: "white", fontWeight: 600 }}
                          >
                            {c.avatar}
                          </div>
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#264653", fontWeight: 500 }}>
                            {c.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Task detail modal */}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onAssign={(cleaner) => {
            handleAssign(selectedTask.id, cleaner);
            setSelectedTask({ ...selectedTask, assignedTo: cleaner, status: selectedTask.status === "pending" ? "assigned" : selectedTask.status });
          }}
          onStatusChange={(newStatus) => {
            setTasks((prev) => prev.map((t) => t.id === selectedTask.id ? { ...t, status: newStatus } : t));
            setSelectedTask({ ...selectedTask, status: newStatus });
          }}
        />
      )}

      {/* New task modal */}
      {showNewTask && <NewTaskModal onClose={() => setShowNewTask(false)} onAdd={(task) => { setTasks((prev) => [task, ...prev]); setShowNewTask(false); }} />}
    </div>
  );
}

/* ─── Filter dropdown ─── */

function FilterDropdown({ label, value, options, onChange }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.625rem", color: "#2D3436", opacity: 0.4, fontWeight: 500 }}>{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-white border rounded-lg pl-3 pr-7 py-1.5 cursor-pointer"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#264653", borderColor: "#E5E7EB", outline: "none", minWidth: "140px" }}
        >
          <option value="all">All</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#2D3436", opacity: 0.3 }} />
      </div>
    </div>
  );
}

/* ─── Task detail modal ─── */

function TaskDetailModal({ task, onClose, onAssign, onStatusChange }: {
  task: Task;
  onClose: () => void;
  onAssign: (cleaner: { name: string; avatar: string }) => void;
  onStatusChange: (status: TaskStatus) => void;
}) {
  const sc = statusConfig[task.status];
  const tc = typeConfig[task.type];
  const TypeIcon = tc.icon;
  const [showAssign, setShowAssign] = useState(false);
  const [showStatusChange, setShowStatusChange] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const hasMultiDayWindow = task.window && !isSameDay(task.window);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(38,70,83,0.4)" }}>
      <div
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: "0 20px 60px rgba(38,70,83,0.15)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header image */}
        <div className="relative h-36 overflow-hidden rounded-t-2xl">
          <img src={task.propertyImg} alt={task.property} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(38,70,83,0.5) 0%, transparent 60%)" }} />
          <button onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
          >
            <X size={16} style={{ color: "#264653" }} />
          </button>
          <div className="absolute bottom-3 left-4">
            <h2 style={{ fontFamily: "Nunito, sans-serif", color: "white", fontSize: "1.125rem", fontWeight: 700 }}>{task.property}</h2>
          </div>
        </div>

        <div className="p-6">
          {/* Type + Status row */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <TypeIcon size={16} style={{ color: tc.color }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: tc.color, fontWeight: 600 }}>{tc.label}</span>
              {task.priority === "urgent" && (
                <span className="px-1.5 py-0.5 rounded" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5rem", color: "#EF4444", backgroundColor: "#FEE2E2", fontWeight: 700 }}>
                  URGENT
                </span>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setShowStatusChange(!showStatusChange)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: sc.color, backgroundColor: sc.bg, fontWeight: 600 }}
              >
                {task.status === "completed" ? <CheckCircle2 size={13} /> : task.status === "in-progress" ? <Clock size={13} /> : <CircleDashed size={13} />}
                {sc.label}
                <ChevronDown size={11} />
              </button>
              {showStatusChange && (
                <div className="absolute top-full right-0 mt-1 bg-white rounded-xl py-1 w-40 z-10" style={{ boxShadow: "0 8px 25px rgba(38,70,83,0.12)", border: "1px solid #E5E7EB" }}>
                  {(Object.keys(statusConfig) as TaskStatus[]).map((s) => (
                    <button key={s} onClick={() => { onStatusChange(s); setShowStatusChange(false); }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: statusConfig[s].color }} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#264653", fontWeight: s === task.status ? 600 : 400 }}>
                        {statusConfig[s].label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Task Window (prominent visual) ── */}
          {task.window ? (
            <div
              className="mb-5 rounded-xl p-4"
              style={{ backgroundColor: hasMultiDayWindow ? "#2A9D8F08" : "#F8F9FA", border: hasMultiDayWindow ? "1px solid #2A9D8F18" : "1px solid transparent" }}
            >
              <div className="flex items-center gap-1.5 mb-3">
                <Clock size={13} style={{ color: "#264653", opacity: 0.4 }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.4, fontWeight: 500 }}>
                  Task Window
                </span>
                {hasMultiDayWindow && (
                  <span className="ml-1 px-1.5 py-0.5 rounded" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5rem", color: "#2A9D8F", backgroundColor: "#2A9D8F15", fontWeight: 600 }}>
                    MULTI-DAY
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {/* Checkout side */}
                <div className="flex-1 p-3 rounded-lg bg-white">
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5625rem", color: "#2D3436", opacity: 0.35, fontWeight: 500, letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
                    LAST CHECKOUT
                  </p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", color: "#264653", fontWeight: 600 }}>
                    {task.window.checkoutTime}
                  </p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.45, marginTop: "0.125rem" }}>
                    {task.window.checkoutDate}
                  </p>
                </div>

                {/* Arrow connector */}
                <div className="flex flex-col items-center gap-0.5 shrink-0">
                  <div className="w-8 h-[1px]" style={{ backgroundColor: hasMultiDayWindow ? "#2A9D8F" : "#CBD5E1" }} />
                  <ArrowRight size={14} style={{ color: hasMultiDayWindow ? "#2A9D8F" : "#CBD5E1" }} />
                  {hasMultiDayWindow && (
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5rem", color: "#2A9D8F", fontWeight: 600, whiteSpace: "nowrap" }}>
                      overnight
                    </span>
                  )}
                </div>

                {/* Checkin side */}
                <div className="flex-1 p-3 rounded-lg bg-white">
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5625rem", color: "#2D3436", opacity: 0.35, fontWeight: 500, letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
                    NEXT CHECK-IN
                  </p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", color: hasMultiDayWindow ? "#2A9D8F" : "#264653", fontWeight: 600 }}>
                    {task.window.checkinTime}
                  </p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: hasMultiDayWindow ? "#2A9D8F" : "#2D3436", opacity: hasMultiDayWindow ? 0.7 : 0.45, fontWeight: hasMultiDayWindow ? 500 : 400, marginTop: "0.125rem" }}>
                    {task.window.checkinDate}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-5 rounded-xl p-4" style={{ backgroundColor: "#F8F9FA" }}>
              <div className="flex items-center gap-1.5 mb-1">
                <Clock size={13} style={{ color: "#264653", opacity: 0.4 }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.4, fontWeight: 500 }}>
                  Task Window
                </span>
              </div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#2D3436", opacity: 0.5 }}>
                Flexible — no fixed checkout/check-in window
              </p>
            </div>
          )}

          {/* Detail grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { label: "Scheduled", value: task.scheduledDate },
              { label: "Owner", value: task.owner },
            ].map((d) => (
              <div key={d.label} className="p-3 rounded-xl" style={{ backgroundColor: "#F8F9FA" }}>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.625rem", color: "#2D3436", opacity: 0.4, marginBottom: "0.25rem" }}>{d.label}</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#264653", fontWeight: 500 }}>{d.value}</p>
              </div>
            ))}
          </div>

          {/* Assigned to */}
          <div className="mb-5">
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.4, marginBottom: "0.5rem", fontWeight: 500 }}>
              Assigned To
            </p>
            {task.assignedTo ? (
              <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: "#F8F9FA" }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#264653", fontFamily: "Inter, sans-serif", fontSize: "0.625rem", color: "white", fontWeight: 600 }}
                  >
                    {task.assignedTo.avatar}
                  </div>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#264653", fontWeight: 500 }}>{task.assignedTo.name}</span>
                </div>
                <button
                  onClick={() => setShowAssign(!showAssign)}
                  className="px-2.5 py-1 rounded-lg hover:bg-gray-200 transition-colors"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2A9D8F", fontWeight: 500 }}
                >
                  Reassign
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAssign(!showAssign)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl transition-colors hover:bg-gray-100"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#2A9D8F", fontWeight: 500, border: "2px dashed #2A9D8F30" }}
              >
                <UserCircle size={16} /> Assign Cleaner
              </button>
            )}
            {showAssign && (
              <div className="mt-2 bg-white rounded-xl border overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
                {availableCleaners.map((c) => (
                  <button key={c.name} onClick={() => { onAssign(c); setShowAssign(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#264653", fontFamily: "Inter, sans-serif", fontSize: "0.5rem", color: "white", fontWeight: 600 }}
                    >{c.avatar}</div>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#264653", fontWeight: 500 }}>{c.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Completion Photos ── */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <Camera size={13} style={{ color: "#264653", opacity: 0.4 }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.4, fontWeight: 500 }}>
                  Completion Photos
                </span>
                {task.photos.length > 0 && (
                  <span className="px-1.5 py-0.5 rounded-md" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5625rem", color: "#264653", backgroundColor: "#F3F4F6", fontWeight: 600 }}>
                    {task.photos.length}
                  </span>
                )}
              </div>
            </div>

            {task.photos.length > 0 ? (
              <div className="space-y-3">
                {/* Photo grid */}
                <div className="grid grid-cols-3 gap-2">
                  {task.photos.map((photo, idx) => (
                    <button
                      key={idx}
                      onClick={() => setLightboxIdx(idx)}
                      className="group relative aspect-square rounded-xl overflow-hidden"
                      style={{ border: "1px solid #E5E7EB" }}
                    >
                      <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                        <ZoomIn size={18} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      {/* Caption overlay */}
                      <div className="absolute bottom-0 inset-x-0 p-1.5" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)" }}>
                        <p className="truncate" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5rem", color: "white", fontWeight: 500 }}>
                          {photo.caption}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Photo list with details */}
                <div className="space-y-1.5">
                  {task.photos.map((photo, idx) => (
                    <div
                      key={idx}
                      onClick={() => setLightboxIdx(idx)}
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
                        <img src={photo.url} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#264653", fontWeight: 500 }}>
                          {photo.caption}
                        </p>
                        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5625rem", color: "#2D3436", opacity: 0.35 }}>
                          {photo.uploadedBy} &middot; {photo.uploadedAt}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center py-6 rounded-xl" style={{ backgroundColor: "#F8F9FA" }}>
                <Image size={20} style={{ color: "#CBD5E1", marginBottom: "0.5rem" }} />
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#2D3436", opacity: 0.35 }}>
                  No photos uploaded yet
                </p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.625rem", color: "#2D3436", opacity: 0.25, marginTop: "0.125rem" }}>
                  Photos will appear here once the assignee uploads them
                </p>
              </div>
            )}
          </div>

          {/* Notes */}
          {task.notes && (
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.4, marginBottom: "0.5rem", fontWeight: 500 }}>
                Notes
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#2D3436", opacity: 0.65, lineHeight: 1.6 }}>
                {task.notes}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightboxIdx !== null && task.photos[lightboxIdx] && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
          onClick={() => setLightboxIdx(null)}
        >
          <button onClick={() => setLightboxIdx(null)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors z-10"
          >
            <X size={18} className="text-white" />
          </button>

          {/* Prev */}
          {lightboxIdx > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIdx(lightboxIdx - 1); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors z-10"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>
          )}

          {/* Next */}
          {lightboxIdx < task.photos.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIdx(lightboxIdx + 1); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors z-10"
            >
              <ChevronRight size={20} className="text-white" />
            </button>
          )}

          {/* Image */}
          <div className="max-w-3xl max-h-[80vh] px-12" onClick={(e) => e.stopPropagation()}>
            <img
              src={task.photos[lightboxIdx].url}
              alt={task.photos[lightboxIdx].caption}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
            <div className="mt-3 text-center">
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "white", fontWeight: 500 }}>
                {task.photos[lightboxIdx].caption}
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "rgba(255,255,255,0.5)", marginTop: "0.25rem" }}>
                Uploaded by {task.photos[lightboxIdx].uploadedBy} at {task.photos[lightboxIdx].uploadedAt}
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.625rem", color: "rgba(255,255,255,0.3)", marginTop: "0.25rem" }}>
                {lightboxIdx + 1} of {task.photos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── New task modal ─── */

function NewTaskModal({ onClose, onAdd }: { onClose: () => void; onAdd: (task: Task) => void }) {
  const [form, setForm] = useState({
    type: "cleaning" as TaskType,
    property: propertyNames[0],
    scheduledDate: "Mar 1, 2026",
    checkoutDate: "Mar 1",
    checkoutTime: "11:00 AM",
    checkinDate: "Mar 1",
    checkinTime: "3:00 PM",
    notes: "",
    priority: "normal" as "normal" | "urgent",
  });

  const handleSubmit = () => {
    const newTask: Task = {
      id: `t-${Date.now()}`,
      type: form.type,
      property: form.property,
      propertyImg: allTasks.find((t) => t.property === form.property)?.propertyImg || "",
      scheduledDate: form.scheduledDate,
      window: form.type === "cleaning"
        ? { checkoutDate: form.checkoutDate, checkoutTime: form.checkoutTime, checkinDate: form.checkinDate, checkinTime: form.checkinTime }
        : null,
      assignedTo: null,
      owner: "Sarah Mitchell",
      status: "pending",
      photos: [],
      notes: form.notes,
      priority: form.priority,
    };
    onAdd(newTask);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(38,70,83,0.4)" }}>
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto" style={{ boxShadow: "0 20px 60px rgba(38,70,83,0.15)" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "1.125rem", fontWeight: 700 }}>New Task</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
            <X size={16} style={{ color: "#264653" }} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Task type */}
          <div>
            <label style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.5, fontWeight: 500 }}>Task Type</label>
            <div className="flex gap-2 mt-1.5">
              {(["cleaning", "maintenance", "inspection", "restock"] as TaskType[]).map((t) => {
                const tc = typeConfig[t];
                return (
                  <button key={t} onClick={() => setForm({ ...form, type: t })}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all"
                    style={{
                      fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", fontWeight: 500,
                      backgroundColor: form.type === t ? tc.color + "15" : "#F8F9FA",
                      color: form.type === t ? tc.color : "#2D343660",
                      border: form.type === t ? `1px solid ${tc.color}30` : "1px solid transparent",
                    }}
                  >
                    {tc.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Property */}
          <div>
            <label style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.5, fontWeight: 500 }}>Property</label>
            <select value={form.property} onChange={(e) => setForm({ ...form, property: e.target.value })}
              className="w-full mt-1.5 px-3 py-2 rounded-lg appearance-none"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#264653", border: "1px solid #E5E7EB", outline: "none", backgroundColor: "white" }}
            >
              {propertyNames.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          {/* Date */}
          <div>
            <label style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.5, fontWeight: 500 }}>Scheduled Date</label>
            <select value={form.scheduledDate} onChange={(e) => setForm({ ...form, scheduledDate: e.target.value })}
              className="w-full mt-1.5 px-3 py-2 rounded-lg appearance-none"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#264653", border: "1px solid #E5E7EB", outline: "none", backgroundColor: "white" }}
            >
              {["Mar 1, 2026", "Mar 2, 2026", "Mar 3, 2026", "Mar 4, 2026", "Mar 5, 2026"].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Task window (only for cleaning) */}
          {form.type === "cleaning" && (
            <div>
              <label style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.5, fontWeight: 500 }}>Task Window</label>
              <div className="grid grid-cols-2 gap-3 mt-1.5">
                <div>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5625rem", color: "#2D3436", opacity: 0.35 }}>Checkout date</span>
                  <select value={form.checkoutDate} onChange={(e) => setForm({ ...form, checkoutDate: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg appearance-none"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#264653", border: "1px solid #E5E7EB", outline: "none", backgroundColor: "white" }}
                  >
                    {["Mar 1", "Mar 2", "Mar 3", "Mar 4", "Mar 5"].map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5625rem", color: "#2D3436", opacity: 0.35 }}>Checkout time</span>
                  <input type="text" value={form.checkoutTime} onChange={(e) => setForm({ ...form, checkoutTime: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#264653", border: "1px solid #E5E7EB", outline: "none" }}
                  />
                </div>
                <div>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5625rem", color: "#2D3436", opacity: 0.35 }}>Check-in date</span>
                  <select value={form.checkinDate} onChange={(e) => setForm({ ...form, checkinDate: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg appearance-none"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#264653", border: "1px solid #E5E7EB", outline: "none", backgroundColor: "white" }}
                  >
                    {["Mar 1", "Mar 2", "Mar 3", "Mar 4", "Mar 5"].map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5625rem", color: "#2D3436", opacity: 0.35 }}>Check-in time</span>
                  <input type="text" value={form.checkinTime} onChange={(e) => setForm({ ...form, checkinTime: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#264653", border: "1px solid #E5E7EB", outline: "none" }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Priority */}
          <div>
            <label style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.5, fontWeight: 500 }}>Priority</label>
            <div className="flex gap-2 mt-1.5">
              {(["normal", "urgent"] as const).map((p) => (
                <button key={p} onClick={() => setForm({ ...form, priority: p })}
                  className="flex-1 py-2 rounded-lg transition-all"
                  style={{
                    fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 500,
                    backgroundColor: form.priority === p ? (p === "urgent" ? "#FEE2E2" : "#2A9D8F15") : "#F8F9FA",
                    color: form.priority === p ? (p === "urgent" ? "#EF4444" : "#2A9D8F") : "#2D343660",
                    border: form.priority === p ? `1px solid ${p === "urgent" ? "#FECACA" : "#2A9D8F30"}` : "1px solid transparent",
                  }}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.5, fontWeight: 500 }}>Notes</label>
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={3} placeholder="Any special instructions..."
              className="w-full mt-1.5 px-3 py-2 rounded-lg resize-none"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#2D3436", border: "1px solid #E5E7EB", outline: "none" }}
            />
          </div>
        </div>

        <div className="flex gap-3 px-6 pb-6">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-lg transition-all hover:bg-gray-100"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#264653", fontWeight: 500, backgroundColor: "#F8F9FA" }}
          >
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex-1 py-2.5 rounded-lg text-white transition-all hover:opacity-90"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 500, backgroundColor: "#2A9D8F" }}
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}
