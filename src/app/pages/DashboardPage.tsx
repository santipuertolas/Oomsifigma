import { WelcomeHeader } from "../components/WelcomeHeader";
import { UnifiedCalendar } from "../components/UnifiedCalendar";
import { AIConciergeInbox } from "../components/AIConciergeInbox";
import { CleanerTasks } from "../components/CleanerTasks";

export function DashboardPage() {
  return (
    <>
      <WelcomeHeader />

      {/* Today's Operations — prominent placement */}
      <div className="mb-6">
        <CleanerTasks />
      </div>

      {/* Calendar */}
      <div className="mb-6">
        <UnifiedCalendar />
      </div>

      {/* AI Inbox snippet */}
      <AIConciergeInbox />
    </>
  );
}
