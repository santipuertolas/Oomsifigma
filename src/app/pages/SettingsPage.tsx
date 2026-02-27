import { useState } from "react";
import {
  User,
  Building2,
  Bell,
  CreditCard,
  Link2,
  Shield,
  Sparkles,
  ClipboardList,
  MessageSquareText,
  Globe,
  ChevronRight,
  Check,
  Toggle,
  Info,
} from "lucide-react";

type SettingsTab =
  | "account"
  | "property-defaults"
  | "channels"
  | "notifications"
  | "ai-concierge"
  | "cleaning"
  | "messaging"
  | "billing"
  | "security";

const tabs: { key: SettingsTab; icon: typeof User; label: string; description: string }[] = [
  { key: "account", icon: User, label: "Account", description: "Profile & company info" },
  { key: "property-defaults", icon: Building2, label: "Property Defaults", description: "Check-in/out times, house rules" },
  { key: "channels", icon: Link2, label: "Channel Connections", description: "Airbnb, Booking.com, iCal" },
  { key: "notifications", icon: Bell, label: "Notifications", description: "Email, push, SMS alerts" },
  { key: "ai-concierge", icon: Sparkles, label: "AI Concierge", description: "Auto-reply & tone settings" },
  { key: "cleaning", icon: ClipboardList, label: "Cleaning Checklists", description: "Templates & task defaults" },
  { key: "messaging", icon: MessageSquareText, label: "Message Templates", description: "Automated guest messages" },
  { key: "billing", icon: CreditCard, label: "Billing & Plan", description: "Subscription & invoices" },
  { key: "security", icon: Shield, label: "Security", description: "Password & two-factor auth" },
];

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("account");

  return (
    <div>
      <div className="mb-6">
        <h1 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "1.5rem", fontWeight: 700 }}>
          Settings
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "#2D3436", opacity: 0.5 }}>
          Configure your oomsi workspace
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings nav */}
        <div className="lg:col-span-1">
          <div
            className="bg-white rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.06)" }}
          >
            <nav className="p-2 space-y-0.5">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                    activeTab === tab.key ? "bg-gray-50" : "hover:bg-gray-50/50"
                  }`}
                >
                  <tab.icon
                    size={18}
                    style={{ color: activeTab === tab.key ? "#2A9D8F" : "#2D3436", opacity: activeTab === tab.key ? 1 : 0.35 }}
                  />
                  <div className="text-left">
                    <p style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.8125rem",
                      color: activeTab === tab.key ? "#264653" : "#2D3436",
                      fontWeight: activeTab === tab.key ? 600 : 400,
                      opacity: activeTab === tab.key ? 1 : 0.7,
                    }}>
                      {tab.label}
                    </p>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings content */}
        <div className="lg:col-span-3">
          <div
            className="bg-white rounded-2xl p-6"
            style={{ boxShadow: "0 1px 3px rgba(38,70,83,0.06)" }}
          >
            {activeTab === "account" && <AccountSettings />}
            {activeTab === "property-defaults" && <PropertyDefaultsSettings />}
            {activeTab === "channels" && <ChannelSettings />}
            {activeTab === "notifications" && <NotificationSettings />}
            {activeTab === "ai-concierge" && <AIConciergeSettings />}
            {activeTab === "cleaning" && <CleaningSettings />}
            {activeTab === "messaging" && <MessagingSettings />}
            {activeTab === "billing" && <BillingSettings />}
            {activeTab === "security" && <SecuritySettings />}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h2 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "1.125rem", fontWeight: 700 }}>
        {title}
      </h2>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#2D3436", opacity: 0.5, marginTop: "0.125rem" }}>
        {subtitle}
      </p>
    </div>
  );
}

function FieldLabel({ label }: { label: string }) {
  return (
    <label style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#264653", fontWeight: 500, display: "block", marginBottom: "0.375rem" }}>
      {label}
    </label>
  );
}

function TextInput({ value, placeholder }: { value: string; placeholder?: string }) {
  const [val, setVal] = useState(value);
  return (
    <input
      type="text"
      value={val}
      onChange={(e) => setVal(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 rounded-lg"
      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", border: "1px solid #E5E7EB", outline: "none", color: "#2D3436" }}
    />
  );
}

function ToggleSwitch({ enabled, label, description }: { enabled: boolean; label: string; description?: string }) {
  const [on, setOn] = useState(enabled);
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#264653", fontWeight: 500 }}>{label}</p>
        {description && (
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.4, marginTop: "0.125rem" }}>{description}</p>
        )}
      </div>
      <button
        onClick={() => setOn(!on)}
        className="w-10 h-5.5 rounded-full transition-colors relative"
        style={{ backgroundColor: on ? "#2A9D8F" : "#CBD5E1", width: "40px", height: "22px" }}
      >
        <div
          className="w-4.5 h-4.5 rounded-full bg-white absolute top-0.5 transition-all"
          style={{ width: "18px", height: "18px", left: on ? "20px" : "2px" }}
        />
      </button>
    </div>
  );
}

function SaveButton() {
  return (
    <div className="flex justify-end pt-6 border-t border-gray-100 mt-6">
      <button
        className="flex items-center gap-2 px-5 py-2 rounded-lg text-white transition-all hover:opacity-90"
        style={{ backgroundColor: "#2A9D8F", fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 500 }}
      >
        <Check size={16} />
        Save Changes
      </button>
    </div>
  );
}

function AccountSettings() {
  return (
    <div>
      <SectionTitle title="Account" subtitle="Manage your profile and company information" />
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><FieldLabel label="First Name" /><TextInput value="Sarah" /></div>
          <div><FieldLabel label="Last Name" /><TextInput value="Mitchell" /></div>
        </div>
        <div><FieldLabel label="Email" /><TextInput value="sarah@oomsi.co" /></div>
        <div><FieldLabel label="Company Name" /><TextInput value="Mitchell Vacation Rentals" /></div>
        <div><FieldLabel label="Phone" /><TextInput value="+1 (555) 123-4567" /></div>
        <div><FieldLabel label="Timezone" /><TextInput value="America/New_York (EST)" /></div>
        <div><FieldLabel label="Default Currency" /><TextInput value="USD ($)" /></div>
        <div><FieldLabel label="Language" /><TextInput value="English" /></div>
      </div>
      <SaveButton />
    </div>
  );
}

function PropertyDefaultsSettings() {
  return (
    <div>
      <SectionTitle title="Property Defaults" subtitle="Set default rules for all new properties" />
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><FieldLabel label="Default Check-in Time" /><TextInput value="3:00 PM" /></div>
          <div><FieldLabel label="Default Check-out Time" /><TextInput value="11:00 AM" /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><FieldLabel label="Min Stay (nights)" /><TextInput value="2" /></div>
          <div><FieldLabel label="Max Stay (nights)" /><TextInput value="30" /></div>
        </div>
        <div><FieldLabel label="Turnover Buffer (hours)" /><TextInput value="4" /></div>
        <div>
          <FieldLabel label="Default House Rules" />
          <textarea
            className="w-full px-3 py-2 rounded-lg resize-none"
            rows={4}
            defaultValue={"No smoking indoors.\nNo parties or loud music after 10 PM.\nPets allowed with prior approval.\nPlease remove shoes at entrance."}
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", border: "1px solid #E5E7EB", outline: "none", color: "#2D3436" }}
          />
        </div>
        <div>
          <FieldLabel label="Cancellation Policy" />
          <TextInput value="Flexible - Full refund 24h before check-in" />
        </div>
        <ToggleSwitch enabled={true} label="Auto-confirm bookings" description="Automatically accept new bookings without manual review" />
        <ToggleSwitch enabled={true} label="Instant Book" description="Allow guests to book without sending a request first" />
      </div>
      <SaveButton />
    </div>
  );
}

function ChannelSettings() {
  const channels = [
    { name: "Airbnb", color: "#FF5A5F", connected: true, listings: 5, lastSync: "2 min ago" },
    { name: "Booking.com", color: "#003580", connected: true, listings: 4, lastSync: "5 min ago" },
    { name: "Vrbo", color: "#3B5998", connected: false, listings: 0, lastSync: "" },
    { name: "Google Vacation Rentals", color: "#4285F4", connected: false, listings: 0, lastSync: "" },
    { name: "iCal Import", color: "#264653", connected: true, listings: 2, lastSync: "1 hr ago" },
  ];

  return (
    <div>
      <SectionTitle title="Channel Connections" subtitle="Connect and sync your booking channels" />
      <div className="space-y-3">
        {channels.map((ch) => (
          <div
            key={ch.name}
            className="flex items-center justify-between p-4 rounded-xl"
            style={{ backgroundColor: "#F8F9FA" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ch.color }} />
              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "#264653", fontWeight: 600 }}>
                  {ch.name}
                </p>
                {ch.connected && (
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.4 }}>
                    {ch.listings} listings synced - Last sync: {ch.lastSync}
                  </p>
                )}
              </div>
            </div>
            <button
              className="px-4 py-1.5 rounded-lg transition-all hover:opacity-90"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.75rem",
                fontWeight: 500,
                backgroundColor: ch.connected ? "#2A9D8F15" : "#2A9D8F",
                color: ch.connected ? "#2A9D8F" : "white",
              }}
            >
              {ch.connected ? "Manage" : "Connect"}
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: "#A29BFE08", border: "1px solid #A29BFE20" }}>
        <div className="flex items-start gap-2">
          <Info size={16} style={{ color: "#A29BFE", marginTop: "2px" }} />
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#2D3436", opacity: 0.6, lineHeight: 1.6 }}>
            oomsi automatically syncs calendars across all connected channels every 5 minutes to prevent double bookings. You can also trigger a manual sync from each channel's settings.
          </p>
        </div>
      </div>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div>
      <SectionTitle title="Notifications" subtitle="Control how and when you get notified" />
      <div className="space-y-1">
        <h3 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "0.9375rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          Booking Alerts
        </h3>
        <ToggleSwitch enabled={true} label="New booking received" description="Get notified when a new booking comes in" />
        <ToggleSwitch enabled={true} label="Booking cancelled" description="Alert when a guest cancels" />
        <ToggleSwitch enabled={true} label="Booking modified" description="Changes to dates, guests, or pricing" />
      </div>
      <div className="mt-6 space-y-1">
        <h3 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "0.9375rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          Guest Messages
        </h3>
        <ToggleSwitch enabled={true} label="New guest message" description="Notify when guests send messages" />
        <ToggleSwitch enabled={false} label="AI auto-reply sent" description="Get a confirmation when AI sends a reply" />
      </div>
      <div className="mt-6 space-y-1">
        <h3 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "0.9375rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          Operations
        </h3>
        <ToggleSwitch enabled={true} label="Cleaning task due" description="Reminders for upcoming turnovers" />
        <ToggleSwitch enabled={true} label="Cleaning completed" description="Confirmation when cleaner finishes" />
        <ToggleSwitch enabled={false} label="Maintenance issues" description="Smart alerts for reported problems" />
      </div>
      <div className="mt-6 space-y-1">
        <h3 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "0.9375rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          Delivery Method
        </h3>
        <ToggleSwitch enabled={true} label="Email notifications" />
        <ToggleSwitch enabled={true} label="Push notifications" />
        <ToggleSwitch enabled={false} label="SMS notifications" description="Standard messaging rates apply" />
      </div>
      <SaveButton />
    </div>
  );
}

function AIConciergeSettings() {
  return (
    <div>
      <SectionTitle title="AI Concierge" subtitle="Configure how the AI handles guest communication" />
      <div
        className="p-4 rounded-xl mb-6 flex items-center gap-3"
        style={{ backgroundColor: "#A29BFE0C", border: "1px solid #A29BFE25" }}
      >
        <Sparkles size={20} style={{ color: "#A29BFE" }} />
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#2D3436", opacity: 0.7 }}>
          The AI Concierge learns from your properties, house rules, and past conversations to generate contextual replies.
        </p>
      </div>
      <div className="space-y-1">
        <ToggleSwitch enabled={true} label="Enable AI Concierge" description="Generate smart reply suggestions for guest messages" />
        <ToggleSwitch enabled={false} label="Auto-send AI replies" description="Automatically send AI-generated replies without review (not recommended for new users)" />
        <ToggleSwitch enabled={true} label="Include local recommendations" description="Let AI suggest nearby restaurants, activities, and services" />
        <ToggleSwitch enabled={true} label="Handle check-in instructions" description="AI can automatically send check-in details and access codes" />
      </div>
      <div className="mt-6">
        <FieldLabel label="AI Tone & Style" />
        <div className="grid grid-cols-3 gap-2 mt-1">
          {["Friendly & Warm", "Professional", "Concise"].map((tone, i) => (
            <button
              key={tone}
              className="py-2.5 rounded-xl text-center transition-all"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.75rem",
                fontWeight: 500,
                backgroundColor: i === 0 ? "#A29BFE15" : "#F8F9FA",
                color: i === 0 ? "#A29BFE" : "#2D343660",
                border: i === 0 ? "1px solid #A29BFE30" : "1px solid transparent",
              }}
            >
              {tone}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <FieldLabel label="Response Time Target" />
        <TextInput value="Under 5 minutes" />
      </div>
      <div className="mt-4">
        <FieldLabel label="Custom AI Instructions" />
        <textarea
          className="w-full px-3 py-2 rounded-lg resize-none"
          rows={3}
          defaultValue="Always greet guests by name. Be helpful but never promise things we can't deliver. Recommend La Terrazza for Italian and Surf Shack for casual dining."
          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", border: "1px solid #E5E7EB", outline: "none", color: "#2D3436" }}
        />
      </div>
      <SaveButton />
    </div>
  );
}

function CleaningSettings() {
  const templates = [
    { name: "Standard Turnover", steps: 8, lastUsed: "Today" },
    { name: "Deep Clean", steps: 12, lastUsed: "3 days ago" },
    { name: "Quick Refresh", steps: 5, lastUsed: "Yesterday" },
    { name: "Check-out Inspection", steps: 6, lastUsed: "2 days ago" },
  ];

  return (
    <div>
      <SectionTitle title="Cleaning Checklists" subtitle="Manage cleaning templates and task defaults" />
      <div className="space-y-3 mb-6">
        {templates.map((t) => (
          <div key={t.name} className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: "#F8F9FA" }}>
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "#264653", fontWeight: 600 }}>{t.name}</p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.4 }}>
                {t.steps} steps - Last used: {t.lastUsed}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className="px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#2D3436", opacity: 0.5 }}
              >
                Edit
              </button>
              <button
                className="px-3 py-1.5 rounded-lg transition-all hover:opacity-90"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#2A9D8F", backgroundColor: "#2A9D8F15" }}
              >
                Duplicate
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        className="w-full py-2.5 rounded-xl border-2 border-dashed transition-colors hover:bg-gray-50"
        style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#2A9D8F", borderColor: "#2A9D8F40", fontWeight: 500 }}
      >
        + Create New Template
      </button>
      <div className="mt-6">
        <ToggleSwitch enabled={true} label="Photo verification required" description="Cleaners must upload photos after each task" />
        <ToggleSwitch enabled={true} label="Auto-assign cleaners" description="Automatically assign available cleaners based on location" />
        <ToggleSwitch enabled={false} label="Guest notification on completion" description="Notify guests when their property is ready" />
      </div>
    </div>
  );
}

function MessagingSettings() {
  const templates = [
    { name: "Booking Confirmation", trigger: "On booking", active: true },
    { name: "Pre-arrival Info", trigger: "2 days before check-in", active: true },
    { name: "Check-in Instructions", trigger: "Day of check-in", active: true },
    { name: "Mid-stay Check-in", trigger: "Halfway through stay", active: false },
    { name: "Check-out Reminder", trigger: "Day before check-out", active: true },
    { name: "Review Request", trigger: "1 day after check-out", active: true },
  ];

  return (
    <div>
      <SectionTitle title="Message Templates" subtitle="Automated messages sent to guests at key moments" />
      <div className="space-y-3">
        {templates.map((t) => (
          <div key={t.name} className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: "#F8F9FA" }}>
            <div className="flex items-center gap-3">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: t.active ? "#2A9D8F" : "#CBD5E1" }}
              />
              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "#264653", fontWeight: 600 }}>{t.name}</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.4 }}>
                  Trigger: {t.trigger}
                </p>
              </div>
            </div>
            <button
              className="px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#2D3436", opacity: 0.5 }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
      <button
        className="w-full py-2.5 rounded-xl border-2 border-dashed transition-colors hover:bg-gray-50 mt-4"
        style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#2A9D8F", borderColor: "#2A9D8F40", fontWeight: 500 }}
      >
        + Create New Template
      </button>
    </div>
  );
}

function BillingSettings() {
  return (
    <div>
      <SectionTitle title="Billing & Plan" subtitle="Manage your subscription and payment methods" />
      <div className="p-5 rounded-xl mb-6" style={{ backgroundColor: "#2A9D8F08", border: "1px solid #2A9D8F20" }}>
        <div className="flex items-center justify-between mb-2">
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2A9D8F", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Current Plan
            </p>
            <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "1.25rem", color: "#264653", fontWeight: 700 }}>
              Professional
            </p>
          </div>
          <div className="text-right">
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1.25rem", color: "#264653", fontWeight: 600 }}>$49</p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.4 }}>/month</p>
          </div>
        </div>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#2D3436", opacity: 0.5 }}>
          Up to 15 properties - Unlimited team members - AI Concierge included
        </p>
        <button
          className="mt-3 px-4 py-1.5 rounded-lg transition-all hover:opacity-90"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#2A9D8F", backgroundColor: "#2A9D8F15", fontWeight: 500 }}
        >
          Upgrade Plan
        </button>
      </div>

      <div className="mb-6">
        <h3 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "0.9375rem", fontWeight: 700, marginBottom: "0.75rem" }}>
          Payment Method
        </h3>
        <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: "#F8F9FA" }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-7 rounded bg-gray-200 flex items-center justify-center">
              <CreditCard size={16} style={{ color: "#264653" }} />
            </div>
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#264653", fontWeight: 500 }}>
                **** **** **** 4242
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.4 }}>
                Expires 12/2027
              </p>
            </div>
          </div>
          <button
            className="px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#2D3436", opacity: 0.5 }}
          >
            Update
          </button>
        </div>
      </div>

      <div>
        <h3 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "0.9375rem", fontWeight: 700, marginBottom: "0.75rem" }}>
          Recent Invoices
        </h3>
        {[
          { date: "Feb 1, 2026", amount: "$49.00", status: "Paid" },
          { date: "Jan 1, 2026", amount: "$49.00", status: "Paid" },
          { date: "Dec 1, 2025", amount: "$49.00", status: "Paid" },
        ].map((inv) => (
          <div key={inv.date} className="flex items-center justify-between py-3 border-b border-gray-50">
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#2D3436", opacity: 0.6 }}>{inv.date}</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#264653", fontWeight: 500 }}>{inv.amount}</span>
            <span className="px-2 py-0.5 rounded-md" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.625rem", color: "#2A9D8F", backgroundColor: "#2A9D8F15", fontWeight: 600 }}>
              {inv.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div>
      <SectionTitle title="Security" subtitle="Protect your account with additional security measures" />
      <div className="space-y-6">
        <div>
          <h3 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "0.9375rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Password
          </h3>
          <div className="space-y-3">
            <div><FieldLabel label="Current Password" /><TextInput value="" placeholder="Enter current password" /></div>
            <div><FieldLabel label="New Password" /><TextInput value="" placeholder="Enter new password" /></div>
            <div><FieldLabel label="Confirm New Password" /><TextInput value="" placeholder="Confirm new password" /></div>
          </div>
          <button
            className="mt-3 px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
            style={{ backgroundColor: "#2A9D8F", fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", fontWeight: 500 }}
          >
            Update Password
          </button>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <ToggleSwitch enabled={true} label="Two-Factor Authentication" description="Add an extra layer of security with 2FA via authenticator app" />
          <ToggleSwitch enabled={false} label="Login alerts" description="Get notified of logins from new devices" />
        </div>

        <div className="pt-6 border-t border-gray-100">
          <h3 style={{ fontFamily: "Nunito, sans-serif", color: "#264653", fontSize: "0.9375rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Active Sessions
          </h3>
          {[
            { device: "MacBook Pro - Chrome", location: "New York, US", time: "Current session" },
            { device: "iPhone 15 - Safari", location: "New York, US", time: "2 hours ago" },
          ].map((s) => (
            <div key={s.device} className="flex items-center justify-between py-3 border-b border-gray-50">
              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem", color: "#264653", fontWeight: 500 }}>{s.device}</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#2D3436", opacity: 0.4 }}>{s.location} - {s.time}</p>
              </div>
              {s.time !== "Current session" && (
                <button className="px-3 py-1 rounded-lg hover:bg-red-50 transition-colors" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", color: "#EF4444" }}>
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
