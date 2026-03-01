import { WelcomeHeader } from "../components/WelcomeHeader";
import { UnifiedCalendar } from "../components/UnifiedCalendar";
import { AIConciergeInbox } from "../components/AIConciergeInbox";
import { CleanerTasks } from "../components/CleanerTasks";
import { NeedsAssignment } from "../components/NeedsAssignment";

export function DashboardPage() {
  return (
    <>
      <WelcomeHeader />

      {/* Needs Assignment — urgent action items */}
      <NeedsAssignment />

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