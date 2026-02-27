import { Sparkles, Send, Clock, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";

interface Message {
  id: string;
  guest: string;
  avatar: string;
  property: string;
  time: string;
  message: string;
  aiReply: string;
  unread: boolean;
}

const messages: Message[] = [
  {
    id: "1",
    guest: "Marco R.",
    avatar: "MR",
    property: "Seaside Villa",
    time: "2 min ago",
    message:
      "Hi! We just arrived but can't figure out how to turn on the pool heater. Also, is there a good Italian restaurant nearby you'd recommend?",
    aiReply:
      "Welcome, Marco! The pool heater control is on the wall panel inside the pool house — just press the green button and set to 28°C. For Italian dining, I highly recommend La Terrazza, a 10-minute walk along the coast. Shall I make a reservation for you?",
    unread: true,
  },
  {
    id: "2",
    guest: "Yuki T.",
    avatar: "YT",
    property: "Mountain Cabin",
    time: "45 min ago",
    message:
      "Could we get a late checkout on Sunday? Our flight isn't until 8pm.",
    aiReply:
      "Hi Yuki! I'd be happy to offer a late checkout until 2:00 PM on Sunday at no extra charge. Would that work for your schedule?",
    unread: true,
  },
  {
    id: "3",
    guest: "Emma L.",
    avatar: "EL",
    property: "Beach House",
    time: "3 hrs ago",
    message: "The WiFi seems to be running slow today. Can you check?",
    aiReply:
      "Hi Emma, thanks for letting me know. I've remotely restarted the router — it should be back to full speed within 5 minutes. The network name and password remain the same. Let me know if it's still slow!",
    unread: false,
  },
];

export function AIConciergeInbox() {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden"
      style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.06)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-lg"
            style={{ backgroundColor: "#A29BFE20" }}
          >
            <Sparkles size={16} style={{ color: "#A29BFE" }} />
          </div>
          <div>
            <h2
              style={{
                fontFamily: "Nunito, sans-serif",
                color: "#264653",
                fontSize: "1.125rem",
                fontWeight: 700,
              }}
            >
              AI Concierge Inbox
            </h2>
          </div>
        </div>
        <button
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.75rem",
            color: "#2A9D8F",
            fontWeight: 500,
          }}
          onClick={() => navigate("/inbox")}
        >
          View all
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Messages */}
      <div className="divide-y divide-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="px-6 py-4 hover:bg-gray-50/50 transition-colors cursor-pointer"
          >
            {/* Guest info row */}
            <div className="flex items-start gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: "#264653",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.6875rem",
                  color: "white",
                  fontWeight: 600,
                }}
              >
                {msg.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.8125rem",
                      color: "#264653",
                      fontWeight: 600,
                    }}
                  >
                    {msg.guest}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded-full"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.625rem",
                      color: "#2D3436",
                      opacity: 0.5,
                      backgroundColor: "#F0F0F0",
                    }}
                  >
                    {msg.property}
                  </span>
                  {msg.unread && (
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "#2A9D8F" }}
                    />
                  )}
                </div>
                <p
                  className="mt-1 line-clamp-2"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.8125rem",
                    color: "#2D3436",
                    opacity: 0.7,
                    lineHeight: 1.5,
                  }}
                >
                  {msg.message}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Clock size={12} style={{ color: "#2D3436", opacity: 0.3 }} />
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.6875rem",
                    color: "#2D3436",
                    opacity: 0.4,
                  }}
                >
                  {msg.time}
                </span>
              </div>
            </div>

            {/* AI Reply suggestion */}
            <div
              className="ml-12 rounded-xl px-4 py-3 relative"
              style={{
                backgroundColor: "#A29BFE0C",
                border: "1px solid #A29BFE25",
              }}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <Sparkles size={12} style={{ color: "#A29BFE" }} />
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.6875rem",
                    color: "#A29BFE",
                    fontWeight: 600,
                  }}
                >
                  AI Suggested Reply
                </span>
              </div>
              <p
                className="line-clamp-2"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.8125rem",
                  color: "#2D3436",
                  opacity: 0.65,
                  lineHeight: 1.6,
                }}
              >
                {msg.aiReply}
              </p>
              <div className="flex items-center gap-2 mt-2.5">
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white transition-all hover:opacity-90"
                  style={{
                    backgroundColor: "#A29BFE",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.6875rem",
                    fontWeight: 500,
                  }}
                >
                  <Send size={11} />
                  Send Reply
                </button>
                <button
                  className="px-3 py-1.5 rounded-lg transition-colors hover:bg-gray-100"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.6875rem",
                    color: "#2D3436",
                    opacity: 0.5,
                    fontWeight: 500,
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}