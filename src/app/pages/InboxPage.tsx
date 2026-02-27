import { useState } from "react";
import { Sparkles, Send, Clock, Search, Filter, CheckCheck, Archive, Star } from "lucide-react";

interface Message {
  id: string;
  guest: string;
  avatar: string;
  property: string;
  source: string;
  time: string;
  message: string;
  aiReply: string;
  unread: boolean;
  starred: boolean;
  thread: { from: "guest" | "host" | "ai"; text: string; time: string }[];
}

const allMessages: Message[] = [
  {
    id: "1",
    guest: "Marco R.",
    avatar: "MR",
    property: "Seaside Villa",
    source: "Airbnb",
    time: "2 min ago",
    message: "Hi! We just arrived but can't figure out how to turn on the pool heater. Also, is there a good Italian restaurant nearby?",
    aiReply: "Welcome, Marco! The pool heater control is on the wall panel inside the pool house - press the green button and set to 28C. For Italian dining, I recommend La Terrazza, a 10-minute walk along the coast. Shall I make a reservation?",
    unread: true,
    starred: true,
    thread: [
      { from: "guest", text: "Hi! We just arrived but can't figure out how to turn on the pool heater. Also, is there a good Italian restaurant nearby?", time: "2:15 PM" },
    ],
  },
  {
    id: "2",
    guest: "Yuki T.",
    avatar: "YT",
    property: "Mountain Cabin",
    source: "Booking.com",
    time: "45 min ago",
    message: "Could we get a late checkout on Sunday? Our flight isn't until 8pm.",
    aiReply: "Hi Yuki! I'd be happy to offer a late checkout until 2:00 PM on Sunday at no extra charge. Would that work for your schedule?",
    unread: true,
    starred: false,
    thread: [
      { from: "guest", text: "Hi there! We're really enjoying the cabin. Quick question - could we get a late checkout on Sunday? Our flight isn't until 8pm.", time: "1:30 PM" },
    ],
  },
  {
    id: "3",
    guest: "Emma L.",
    avatar: "EL",
    property: "Beach House",
    source: "Direct",
    time: "3 hrs ago",
    message: "The WiFi seems to be running slow today. Can you check?",
    aiReply: "Hi Emma, thanks for letting me know. I've remotely restarted the router - it should be back to full speed within 5 minutes.",
    unread: false,
    starred: false,
    thread: [
      { from: "guest", text: "The WiFi seems to be running slow today. Can you check?", time: "11:20 AM" },
      { from: "host", text: "Hi Emma! Sorry about that. I've remotely restarted the router. Should be fixed in a few minutes!", time: "11:35 AM" },
      { from: "guest", text: "It's working great now, thank you!", time: "11:42 AM" },
    ],
  },
  {
    id: "4",
    guest: "James W.",
    avatar: "JW",
    property: "Seaside Villa",
    source: "Airbnb",
    time: "5 hrs ago",
    message: "What time is check-in? We're arriving from the airport around 2pm.",
    aiReply: "Hi James! Check-in is at 3:00 PM, but I can arrange early access if the property is ready. I'll confirm by tomorrow evening!",
    unread: false,
    starred: false,
    thread: [
      { from: "guest", text: "What time is check-in? We're arriving from the airport around 2pm.", time: "9:10 AM" },
      { from: "host", text: "Hi James! Check-in is at 3:00 PM, but I can arrange early access if the property is ready. I'll confirm by tomorrow!", time: "9:25 AM" },
    ],
  },
  {
    id: "5",
    guest: "Aisha K.",
    avatar: "AK",
    property: "Tropical Resort",
    source: "Airbnb",
    time: "Yesterday",
    message: "Is there a grocery store within walking distance?",
    aiReply: "Hi Aisha! Yes, there's a small market called MiniMart just a 5-minute walk from the resort entrance. For a larger selection, SuperFresh is a 10-minute drive.",
    unread: false,
    starred: true,
    thread: [
      { from: "guest", text: "Is there a grocery store within walking distance?", time: "Yesterday 4:00 PM" },
      { from: "host", text: "Yes! MiniMart is 5 min walk. SuperFresh is 10 min drive for bigger selection.", time: "Yesterday 4:15 PM" },
    ],
  },
];

export function InboxPage() {
  const [selectedId, setSelectedId] = useState<string>("1");
  const [filter, setFilter] = useState<"all" | "unread" | "starred">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyFilter, setPropertyFilter] = useState("all");

  const uniqueProperties = Array.from(new Set(allMessages.map((m) => m.property)));

  const filtered = allMessages.filter((m) => {
    if (filter === "unread" && !m.unread) return false;
    if (filter === "starred" && !m.starred) return false;
    if (propertyFilter !== "all" && m.property !== propertyFilter) return false;
    if (searchQuery && !m.guest.toLowerCase().includes(searchQuery.toLowerCase()) && !m.message.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const selected = allMessages.find((m) => m.id === selectedId);

  return (
    <div>
      <div className="mb-6">
        <h1 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "1.5rem", fontWeight: 700 }}>
          Inbox
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "#2D3436", opacity: 0.5 }}>
          AI-powered guest communication across all channels
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6" style={{ minHeight: "calc(100vh - 200px)" }}>
        {/* Message list */}
        <div className="lg:col-span-2 bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.06)" }}>
          {/* Search & filters */}
          <div className="px-4 py-3 border-b border-gray-100 space-y-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#2D3436", opacity: 0.3 }} />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.8125rem",
                  backgroundColor: "#F8F9FA",
                  border: "none",
                  outline: "none",
                  color: "#2D3436",
                }}
              />
            </div>
            <div className="flex gap-1">
              {(["all", "unread", "starred"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="px-3 py-1 rounded-md transition-all"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.6875rem",
                    fontWeight: 500,
                    backgroundColor: filter === f ? "#264653" : "transparent",
                    color: filter === f ? "white" : "#2D343660",
                  }}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
            {/* Property filter */}
            <div className="flex gap-1 flex-wrap">
              <button
                onClick={() => setPropertyFilter("all")}
                className="px-2.5 py-1 rounded-md transition-all"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.625rem",
                  fontWeight: 500,
                  backgroundColor: propertyFilter === "all" ? "#2A9D8F" : "#F0F0F0",
                  color: propertyFilter === "all" ? "white" : "#2D343660",
                }}
              >
                All Properties
              </button>
              {uniqueProperties.map((p) => (
                <button
                  key={p}
                  onClick={() => setPropertyFilter(p)}
                  className="px-2.5 py-1 rounded-md transition-all"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.625rem",
                    fontWeight: 500,
                    backgroundColor: propertyFilter === p ? "#2A9D8F" : "#F0F0F0",
                    color: propertyFilter === p ? "white" : "#2D343660",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 320px)" }}>
            {filtered.map((msg) => (
              <div
                key={msg.id}
                onClick={() => setSelectedId(msg.id)}
                className={`px-4 py-3.5 border-b border-gray-50 cursor-pointer transition-colors ${
                  selectedId === msg.id ? "bg-gray-50" : "hover:bg-gray-50/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "#264653", fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "white", fontWeight: 600 }}
                  >
                    {msg.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#264653", fontWeight: 600 }}>
                        {msg.guest}
                      </span>
                      {msg.unread && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#2A9D8F" }} />}
                      {msg.starred && <Star size={12} style={{ color: "#E9C46A" }} fill="#E9C46A" />}
                      <span className="ml-auto" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.625rem", color: "#2D3436", opacity: 0.4 }}>
                        {msg.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="px-1.5 py-0.5 rounded" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5625rem", color: "#2D3436", opacity: 0.4, backgroundColor: "#F0F0F0" }}>
                        {msg.property}
                      </span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.5625rem", color: "#2D3436", opacity: 0.3 }}>
                        via {msg.source}
                      </span>
                    </div>
                    <p className="mt-1 truncate" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#2D3436", opacity: 0.5 }}>
                      {msg.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversation detail */}
        <div className="lg:col-span-3 bg-white rounded-2xl overflow-hidden flex flex-col" style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.06)" }}>
          {selected ? (
            <>
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#264653", fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "white", fontWeight: 600 }}
                  >
                    {selected.avatar}
                  </div>
                  <div>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "#264653", fontWeight: 600 }}>
                      {selected.guest}
                    </p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.4 }}>
                      {selected.property} - via {selected.source}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-50 transition-colors" title="Archive">
                    <Archive size={16} style={{ color: "#2D3436", opacity: 0.3 }} />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-50 transition-colors" title="Mark as read">
                    <CheckCheck size={16} style={{ color: "#2D3436", opacity: 0.3 }} />
                  </button>
                </div>
              </div>

              {/* Thread */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4" style={{ maxHeight: "calc(100vh - 440px)" }}>
                {selected.thread.map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === "guest" ? "justify-start" : "justify-end"}`}>
                    <div
                      className="max-w-[80%] rounded-2xl px-4 py-3"
                      style={{
                        backgroundColor: msg.from === "guest" ? "#F8F9FA" : msg.from === "ai" ? "#A29BFE10" : "#2A9D8F10",
                        border: msg.from === "ai" ? "1px solid #A29BFE25" : "none",
                      }}
                    >
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#2D3436", lineHeight: 1.6 }}>
                        {msg.text}
                      </p>
                      <p className="mt-1" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.625rem", color: "#2D3436", opacity: 0.35 }}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Suggestion */}
              <div className="border-t border-gray-100 px-6 py-4">
                <div className="rounded-xl px-4 py-3 mb-3" style={{ backgroundColor: "#A29BFE0C", border: "1px solid #A29BFE25" }}>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Sparkles size={12} style={{ color: "#A29BFE" }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#A29BFE", fontWeight: 600 }}>
                      AI Suggested Reply
                    </span>
                  </div>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#2D3436", opacity: 0.65, lineHeight: 1.6 }}>
                    {selected.aiReply}
                  </p>
                  <div className="flex items-center gap-2 mt-2.5">
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white transition-all hover:opacity-90"
                      style={{ backgroundColor: "#A29BFE", fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", fontWeight: 500 }}
                    >
                      <Send size={11} />
                      Send Reply
                    </button>
                    <button
                      className="px-3 py-1.5 rounded-lg transition-colors hover:bg-gray-100"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.5, fontWeight: 500 }}
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {/* Manual reply */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a reply..."
                    className="flex-1 px-4 py-2.5 rounded-xl"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.8125rem",
                      backgroundColor: "#F8F9FA",
                      border: "none",
                      outline: "none",
                      color: "#2D3436",
                    }}
                  />
                  <button
                    className="px-4 py-2.5 rounded-xl text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: "#2A9D8F", fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 500 }}
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "#2D3436", opacity: 0.3 }}>
                Select a conversation
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}