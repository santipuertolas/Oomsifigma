import { CheckCircle2, Clock, ArrowRight, CircleDashed } from "lucide-react";

interface Task {
  id: string;
  property: string;
  propertyImg: string;
  type: "checkout" | "checkin" | "turnover";
  time: string;
  cleaner: string;
  cleaningStatus: "pending" | "done";
  guestOut?: string;
  guestIn?: string;
}

const tasks: Task[] = [
  {
    id: "1",
    property: "Seaside Villa",
    propertyImg:
      "https://images.unsplash.com/photo-1521783593447-5702b9bfd267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2YWNhdGlvbiUyMHJlbnRhbCUyMHZpbGxhfGVufDF8fHx8MTc3MjE5ODg1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    type: "turnover",
    time: "10:00 AM - 3:00 PM",
    cleaner: "Maria S.",
    cleaningStatus: "pending",
    guestOut: "Marco R.",
    guestIn: "James W.",
  },
  {
    id: "2",
    property: "Beach House",
    propertyImg:
      "https://images.unsplash.com/photo-1765124540398-d717b5b06f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWFjaCUyMGhvdXNlJTIwcmVudGFsfGVufDF8fHx8MTc3MjE5ODg1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    type: "checkin",
    time: "3:00 PM",
    cleaner: "Carlos D.",
    cleaningStatus: "pending",
    guestIn: "Emma L.",
  },
  {
    id: "3",
    property: "Mountain Cabin",
    propertyImg:
      "https://images.unsplash.com/photo-1634849662801-a00d83441092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwbW91bnRhaW4lMjBjYWJpbiUyMGludGVyaW9yfGVufDF8fHx8MTc3MjE5ODg1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    type: "checkout",
    time: "11:00 AM",
    cleaner: "Maria S.",
    cleaningStatus: "done",
    guestOut: "David K.",
  },
];

const typeLabels: Record<string, string> = {
  checkout: "Check-out",
  checkin: "Check-in",
  turnover: "Turnover",
};

const typeColors: Record<string, { color: string; bg: string }> = {
  checkout: { color: "#264653", bg: "#26465310" },
  checkin: { color: "#2A9D8F", bg: "#2A9D8F15" },
  turnover: { color: "#E9C46A", bg: "#E9C46A20" },
};

export function CleanerTasks() {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden"
      style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.06)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <h2
            style={{
              fontFamily: "Nunito, sans-serif",
              color: "#264653",
              fontSize: "1.125rem",
              fontWeight: 700,
            }}
          >
            Today's Operations
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.75rem",
              color: "#2D3436",
              opacity: 0.5,
            }}
          >
            3 tasks scheduled
          </p>
        </div>
      </div>

      {/* Tasks list */}
      <div className="divide-y divide-gray-50">
        {tasks.map((task) => {
          const tc = typeColors[task.type];
          return (
            <div
              key={task.id}
              className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors cursor-pointer"
            >
              {/* Property image */}
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
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
                  <span
                    className="px-2 py-0.5 rounded-md"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.625rem",
                      color: tc.color,
                      backgroundColor: tc.bg,
                      fontWeight: 600,
                    }}
                  >
                    {typeLabels[task.type]}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1">
                    <Clock size={12} style={{ color: "#2D3436", opacity: 0.3 }} />
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.75rem",
                        color: "#2D3436",
                        opacity: 0.5,
                      }}
                    >
                      {task.time}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.75rem",
                      color: "#2D3436",
                      opacity: 0.4,
                    }}
                  >
                    {task.cleaner}
                  </span>
                </div>
                {task.type === "turnover" && (
                  <div className="flex items-center gap-1.5 mt-1">
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.4 }}>
                      {task.guestOut}
                    </span>
                    <ArrowRight size={10} style={{ color: "#2D3436", opacity: 0.3 }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.4 }}>
                      {task.guestIn}
                    </span>
                  </div>
                )}
              </div>

              {/* Cleaning Status Badge */}
              <div className="shrink-0">
                {task.cleaningStatus === "done" ? (
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                    style={{ backgroundColor: "#2A9D8F12", fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2A9D8F", fontWeight: 600 }}
                  >
                    <CheckCircle2 size={14} />
                    Cleaned
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                    style={{ backgroundColor: "#E9C46A15", fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#D4A534", fontWeight: 600 }}
                  >
                    <CircleDashed size={14} />
                    Pending
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}