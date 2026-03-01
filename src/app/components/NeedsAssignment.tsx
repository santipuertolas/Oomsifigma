import { useState } from "react";
import { useNavigate } from "react-router";
import {
  AlertTriangle, UserCircle, X, ChevronDown, Clock,
  ArrowRight, Sparkles, Wrench, Search, Building2,
  CheckCircle2, ExternalLink,
} from "lucide-react";

/* ─── Types ─── */

type RejectReason = "schedule-conflict" | "too-far" | "unavailable" | "no-response";
type TaskType = "cleaning" | "maintenance" | "inspection" | "restock";

interface UnassignedTask {
  id: string;
  type: TaskType;
  property: string;
  propertyImg: string;
  scheduledDate: string;
  checkoutDate: string;
  checkoutTime: string;
  checkinDate: string;
  checkinTime: string;
  originalCleaner: string;
  rejectReason: RejectReason;
  rejectedAt: string;
  owner: string;
  notes: string;
  priority: "normal" | "urgent";
  guestName: string;
}

/* ─── Mock data ─── */

const unassignedTasks: UnassignedTask[] = [
  {
    id: "u1", type: "cleaning", property: "Tropical Resort",
    propertyImg: "https://images.unsplash.com/photo-1728049006343-9ee0187643d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHJlc29ydCUyMHBvb2wlMjB2aWxsYXxlbnwxfHx8fDE3NzIyMDAxNzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    scheduledDate: "Mar 1, 2026",
    checkoutDate: "Mar 1", checkoutTime: "12:00 PM",
    checkinDate: "Mar 3", checkinTime: "2:00 PM",
    originalCleaner: "Anna Kowalski", rejectReason: "schedule-conflict", rejectedAt: "2 hours ago",
    owner: "Sarah Mitchell", notes: "VIP guest arriving — extra attention to pool area.",
    priority: "urgent", guestName: "Robert Chen",
  },
  {
    id: "u2", type: "cleaning", property: "Mountain Cabin",
    propertyImg: "https://images.unsplash.com/photo-1634849662801-a00d83441092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwbW91bnRhaW4lMjBjYWJpbiUyMGludGVyaW9yfGVufDF8fHx8MTc3MjE5ODg1MXww&ixlib=rb-4.1.0&q=80&w=1080",
    scheduledDate: "Mar 4, 2026",
    checkoutDate: "Mar 4", checkoutTime: "10:00 AM",
    checkinDate: "Mar 5", checkinTime: "4:00 PM",
    originalCleaner: "Carlos Diaz", rejectReason: "too-far", rejectedAt: "45 min ago",
    owner: "Sarah Mitchell", notes: "",
    priority: "normal", guestName: "Sophie Williams",
  },
  {
    id: "u3", type: "maintenance", property: "City Apartment",
    propertyImg: "https://images.unsplash.com/photo-1695918808943-9db9cddc1ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBjaXR5JTIwc2t5bGluZXxlbnwxfHx8fDE3NzIyMDAxNzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    scheduledDate: "Mar 2, 2026",
    checkoutDate: "-", checkoutTime: "-",
    checkinDate: "-", checkinTime: "-",
    originalCleaner: "Tom Johnson", rejectReason: "unavailable", rejectedAt: "1 hour ago",
    owner: "David Chen", notes: "Dishwasher repair needed before next guest.",
    priority: "urgent", guestName: "",
  },
];

const availableCleaners = [
  { name: "Maria Santos", avatar: "MS", distance: "2.1 km", available: true },
  { name: "Carlos Diaz", avatar: "CD", distance: "4.5 km", available: true },
  { name: "Anna Kowalski", avatar: "AK", distance: "6.2 km", available: false },
  { name: "Tom Johnson", avatar: "TJ", distance: "3.8 km", available: true },
  { name: "David Chen", avatar: "DC", distance: "5.0 km", available: true },
];

const reasonLabels: Record<RejectReason, string> = {
  "schedule-conflict": "Schedule conflict",
  "too-far": "Too far away",
  "unavailable": "Unavailable",
  "no-response": "No response",
};

const typeConfig: Record<TaskType, { label: string; color: string; icon: typeof Sparkles }> = {
  cleaning: { label: "Cleaning", color: "#2A9D8F", icon: Sparkles },
  maintenance: { label: "Maintenance", color: "#E76F51", icon: Wrench },
  inspection: { label: "Inspection", color: "#264653", icon: Search },
  restock: { label: "Restock", color: "#A29BFE", icon: Building2 },
};

/* ─── Component ─── */

export function NeedsAssignment() {
  const [tasks, setTasks] = useState(unassignedTasks);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [assignedIds, setAssignedIds] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const activeTasks = tasks.filter((t) => !assignedIds.has(t.id));

  if (activeTasks.length === 0) return null;

  const handleAssign = (taskId: string, cleanerName: string) => {
    setAssignedIds((prev) => new Set(prev).add(taskId));
    setExpandedId(null);
  };

  const handleDismiss = (taskId: string) => {
    setAssignedIds((prev) => new Set(prev).add(taskId));
  };

  return (
    <div className="mb-6">
      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#FEE2E2" }}
          >
            <AlertTriangle size={16} style={{ color: "#EF4444" }} />
          </div>
          <div>
            <h2
              style={{
                fontFamily: "Nunito, sans-serif",
                color: "#264653",
                fontSize: "1.0625rem",
                fontWeight: 700,
              }}
            >
              Needs Assignment
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.6875rem",
                color: "#2D3436",
                opacity: 0.45,
              }}
            >
              {activeTasks.length} task{activeTasks.length !== 1 ? "s" : ""} rejected or unassigned
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/tasks")}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.6875rem",
            color: "#2A9D8F",
            fontWeight: 500,
          }}
        >
          View all tasks
          <ExternalLink size={11} />
        </button>
      </div>

      {/* Task cards */}
      <div className="space-y-2.5">
        {activeTasks.map((task) => {
          const tc = typeConfig[task.type];
          const TypeIcon = tc.icon;
          const isExpanded = expandedId === task.id;
          const hasWindow = task.checkoutDate !== "-";
          const isMultiDay = hasWindow && task.checkoutDate !== task.checkinDate;

          return (
            <div
              key={task.id}
              className="bg-white rounded-xl overflow-hidden transition-all"
              style={{
                boxShadow: "0 1px 3px rgba(38,70,83,0.06)",
                border: task.priority === "urgent" ? "1px solid #FEE2E2" : "1px solid transparent",
              }}
            >
              {/* Main row */}
              <div className="flex items-center gap-3 px-4 py-3.5">
                {/* Property image */}
                <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={task.propertyImg}
                    alt={task.property}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.8125rem",
                        color: "#264653",
                        fontWeight: 600,
                      }}
                    >
                      {task.property}
                    </span>
                    <div className="flex items-center gap-1">
                      <TypeIcon size={10} style={{ color: tc.color, opacity: 0.7 }} />
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "0.625rem",
                          color: tc.color,
                          fontWeight: 500,
                        }}
                      >
                        {tc.label}
                      </span>
                    </div>
                    {task.priority === "urgent" && (
                      <span
                        className="px-1.5 py-0.5 rounded"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "0.5rem",
                          color: "#EF4444",
                          backgroundColor: "#FEE2E2",
                          fontWeight: 700,
                          letterSpacing: "0.04em",
                        }}
                      >
                        URGENT
                      </span>
                    )}
                  </div>

                  {/* Rejection context */}
                  <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.6875rem",
                        color: "#EF4444",
                        opacity: 0.7,
                      }}
                    >
                      {task.originalCleaner} declined
                    </span>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.6875rem",
                        color: "#2D3436",
                        opacity: 0.25,
                      }}
                    >
                      &middot;
                    </span>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.6875rem",
                        color: "#2D3436",
                        opacity: 0.35,
                      }}
                    >
                      {reasonLabels[task.rejectReason]}
                    </span>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.6875rem",
                        color: "#2D3436",
                        opacity: 0.25,
                      }}
                    >
                      &middot;
                    </span>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.6875rem",
                        color: "#2D3436",
                        opacity: 0.35,
                      }}
                    >
                      {task.rejectedAt}
                    </span>
                  </div>

                  {/* Window preview */}
                  {hasWindow && (
                    <div className="flex items-center gap-1.5 mt-1">
                      <Clock size={10} style={{ color: "#2D3436", opacity: 0.25 }} />
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "0.625rem",
                          color: "#2D3436",
                          opacity: 0.4,
                        }}
                      >
                        {task.checkoutDate} {task.checkoutTime}
                      </span>
                      <ArrowRight size={8} style={{ color: "#2D3436", opacity: 0.2 }} />
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "0.625rem",
                          color: isMultiDay ? "#2A9D8F" : "#2D3436",
                          opacity: isMultiDay ? 0.7 : 0.4,
                          fontWeight: isMultiDay ? 500 : 400,
                        }}
                      >
                        {task.checkinDate} {task.checkinTime}
                      </span>
                      {isMultiDay && (
                        <span
                          className="px-1 py-0.5 rounded"
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "0.4375rem",
                            color: "#2A9D8F",
                            backgroundColor: "#2A9D8F12",
                            fontWeight: 600,
                          }}
                        >
                          MULTI-DAY
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : task.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white transition-all hover:opacity-90"
                    style={{
                      backgroundColor: "#2A9D8F",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.6875rem",
                      fontWeight: 500,
                    }}
                  >
                    <UserCircle size={13} />
                    <span className="hidden sm:inline">Assign</span>
                    <ChevronDown
                      size={11}
                      className="transition-transform"
                      style={{ transform: isExpanded ? "rotate(180deg)" : "none" }}
                    />
                  </button>
                  <button
                    onClick={() => handleDismiss(task.id)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                    title="Dismiss"
                  >
                    <X size={13} style={{ color: "#2D3436", opacity: 0.25 }} />
                  </button>
                </div>
              </div>

              {/* Expanded cleaner picker */}
              {isExpanded && (
                <div
                  className="px-4 pb-4"
                  style={{ borderTop: "1px solid #F3F4F6" }}
                >
                  {/* Task context */}
                  {(task.notes || task.guestName) && (
                    <div className="flex gap-3 flex-wrap mt-3 mb-3">
                      {task.guestName && (
                        <div
                          className="px-2.5 py-1.5 rounded-lg"
                          style={{ backgroundColor: "#F8F9FA" }}
                        >
                          <span
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "0.5625rem",
                              color: "#2D3436",
                              opacity: 0.35,
                            }}
                          >
                            Incoming Guest
                          </span>
                          <p
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "0.75rem",
                              color: "#264653",
                              fontWeight: 500,
                            }}
                          >
                            {task.guestName}
                          </p>
                        </div>
                      )}
                      {task.notes && (
                        <div
                          className="flex-1 min-w-[140px] px-2.5 py-1.5 rounded-lg"
                          style={{ backgroundColor: "#FEF3C7" }}
                        >
                          <span
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "0.5625rem",
                              color: "#92400E",
                              opacity: 0.6,
                            }}
                          >
                            Note
                          </span>
                          <p
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "0.6875rem",
                              color: "#92400E",
                              opacity: 0.8,
                            }}
                          >
                            {task.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.625rem",
                      color: "#2D3436",
                      opacity: 0.4,
                      fontWeight: 500,
                      marginBottom: "0.5rem",
                      marginTop: task.notes || task.guestName ? 0 : "0.75rem",
                    }}
                  >
                    Select a replacement
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {availableCleaners
                      .filter((c) => c.name !== task.originalCleaner)
                      .map((cleaner) => (
                        <button
                          key={cleaner.name}
                          onClick={() => handleAssign(task.id, cleaner.name)}
                          disabled={!cleaner.available}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all group"
                          style={{
                            backgroundColor: cleaner.available ? "white" : "#F8F9FA",
                            border: "1px solid #E5E7EB",
                            opacity: cleaner.available ? 1 : 0.5,
                            cursor: cleaner.available ? "pointer" : "not-allowed",
                          }}
                        >
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: cleaner.available ? "#264653" : "#94A3B8",
                              fontFamily: "Inter, sans-serif",
                              fontSize: "0.5625rem",
                              color: "white",
                              fontWeight: 600,
                            }}
                          >
                            {cleaner.avatar}
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <p
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "0.75rem",
                                color: "#264653",
                                fontWeight: 500,
                              }}
                            >
                              {cleaner.name}
                            </p>
                            <div className="flex items-center gap-2">
                              <span
                                style={{
                                  fontFamily: "Inter, sans-serif",
                                  fontSize: "0.5625rem",
                                  color: "#2D3436",
                                  opacity: 0.35,
                                }}
                              >
                                {cleaner.distance}
                              </span>
                              <span
                                className="w-1 h-1 rounded-full"
                                style={{
                                  backgroundColor: cleaner.available ? "#2A9D8F" : "#94A3B8",
                                }}
                              />
                              <span
                                style={{
                                  fontFamily: "Inter, sans-serif",
                                  fontSize: "0.5625rem",
                                  color: cleaner.available ? "#2A9D8F" : "#94A3B8",
                                  fontWeight: 500,
                                }}
                              >
                                {cleaner.available ? "Available" : "Busy"}
                              </span>
                            </div>
                          </div>
                          {cleaner.available && (
                            <span
                              className="px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "0.5625rem",
                                color: "white",
                                backgroundColor: "#2A9D8F",
                                fontWeight: 500,
                              }}
                            >
                              Assign
                            </span>
                          )}
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {/* Assigned success state */}
              {assignedIds.has(task.id) && (
                <div
                  className="flex items-center gap-2 px-4 py-2.5"
                  style={{
                    backgroundColor: "#2A9D8F08",
                    borderTop: "1px solid #2A9D8F15",
                  }}
                >
                  <CheckCircle2 size={14} style={{ color: "#2A9D8F" }} />
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.75rem",
                      color: "#2A9D8F",
                      fontWeight: 500,
                    }}
                  >
                    Successfully reassigned
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
