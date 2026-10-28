import { createFileRoute } from "@tanstack/react-router";

import { DimiNotification } from "@/components/notifications/dimi-notification";

export const Route = createFileRoute("/notify/youtube")({
  head: () => ({
    meta: [
      { title: "DIMI — YouTube Playlist Notification" },
      {
        name: "description",
        content:
          "Full-screen YouTube playlist notification: playlist progress, channel, and slide to continue learning.",
      },
      { property: "og:title", content: "DIMI — YouTube Playlist Notification" },
      {
        property: "og:description",
        content:
          "Full-screen YouTube playlist notification: playlist progress, channel, and slide to continue learning.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: YoutubeNotification,
});

function YoutubeNotification() {
  return <DimiNotification kind="youtube" className="h-dvh" />;
}
