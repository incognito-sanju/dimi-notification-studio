import { createFileRoute } from "@tanstack/react-router";

import { DimiNotification } from "@/components/notifications/dimi-notification";

export const Route = createFileRoute("/notify/planner")({
  head: () => ({
    meta: [
      { title: "DIMI — Planner Event Notification" },
      {
        name: "description",
        content:
          "Full-screen planner event notification: event details, duration, and slide to start session.",
      },
      { property: "og:title", content: "DIMI — Planner Event Notification" },
      {
        property: "og:description",
        content:
          "Full-screen planner event notification: event details, duration, and slide to start session.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlannerNotification,
});

function PlannerNotification() {
  return <DimiNotification kind="planner" className="h-dvh" />;
}
