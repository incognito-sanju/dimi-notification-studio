import {
  NotificationScreen,
} from "@/components/notifications/notification-screen";
import {
  PlannerEventCard,
  PlaylistCard,
  ReminderCard,
} from "@/components/notifications/info-cards";
import {
  demoData,
  notificationConfigs,
  type NotificationKind,
} from "@/components/notifications/data";

const cards = {
  planner: <PlannerEventCard event={demoData.plannerEvent} />,
  youtube: <PlaylistCard playlist={demoData.playlist} />,
  reminder: <ReminderCard reminder={demoData.reminder} />,
} satisfies Record<NotificationKind, React.ReactNode>;

/**
 * Renders a complete DIMI notification from its kind — the single entry
 * point used by both the full-screen routes and the gallery previews.
 */
export function DimiNotification({
  kind,
  className,
}: {
  kind: NotificationKind;
  className?: string;
}) {
  return (
    <NotificationScreen
      config={notificationConfigs[kind]}
      card={cards[kind]}
      className={className}
    />
  );
}
