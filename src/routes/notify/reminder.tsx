import { createFileRoute } from "@tanstack/react-router";

import { DimiNotification } from "@/components/notifications/dimi-notification";

export const Route = createFileRoute("/notify/reminder")({
  head: () => ({
    meta: [
      { title: "DIMI — Reminder Notification" },
      {
        name: "description",
        content:
          "Full-screen reminder notification: scheduled time, note, and slide to mark as done.",
      },
      { property: "og:title", content: "DIMI — Reminder Notification" },
      {
        property: "og:description",
        content:
          "Full-screen reminder notification: scheduled time, note, and slide to mark as done.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReminderNotification,
});

function ReminderNotification() {
  return <DimiNotification kind="reminder" className="h-dvh" />;
}
