import { createFileRoute, Link } from "@tanstack/react-router";

import logo from "@/assets/notifications/dimi-logo.png";
import { DimiNotification } from "@/components/notifications/dimi-notification";
import {
  notificationConfigs,
  notificationRoute,
  type NotificationKind,
} from "@/components/notifications/data";

const PREVIEW_SCALE = 0.72;
const SCREEN_WIDTH = 390;
const SCREEN_HEIGHT = 844;

const previews: { kind: NotificationKind; title: string; caption: string }[] = [
  {
    kind: "planner",
    title: "Planner Event",
    caption: "Calendar hero · event details, duration · slide to start session",
  },
  {
    kind: "youtube",
    title: "YouTube Playlist",
    caption: "Red play hero · playlist progress · slide to continue learning",
  },
  {
    kind: "reminder",
    title: "Reminder",
    caption: "Bell hero · date, time, note · slide to mark as done",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DIMI — Full-Screen Notification UI" },
      {
        name: "description",
        content:
          "Three premium full-screen notification screens for DIMI: planner events, YouTube playlists, and reminders — one consistent system.",
      },
      { property: "og:title", content: "DIMI — Full-Screen Notification UI" },
      {
        property: "og:description",
        content:
          "Three premium full-screen notification screens for DIMI: planner events, YouTube playlists, and reminders — one consistent system.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-dvh bg-background px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <header className="text-center">
          <img
            src={logo}
            alt="DIMI logo"
            width={512}
            height={512}
            className="mx-auto h-14 w-14"
          />
          <p className="mt-2 text-sm font-semibold tracking-[0.42em] text-foreground">
            DIMI
          </p>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground">
            Full-Screen <span className="text-primary">Notifications</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[15px] font-medium text-muted-foreground">
            One consistent system, three notification types. Every screen is
            live — open one to drag the slider, snooze, or dismiss.
          </p>
        </header>

        <div className="mt-12 grid grid-cols-1 justify-center gap-10 sm:grid-cols-3">
          {previews.map((preview) => (
            <Link
              key={preview.kind}
              to={notificationRoute[preview.kind]}
              className="group mx-auto block w-fit"
            >
              <div
                className="overflow-hidden rounded-[2.6rem] border-[10px] border-foreground/90 bg-background shadow-[0_30px_60px_-30px_color-mix(in_oklab,var(--color-amber-deep)_45%,transparent)] transition-transform duration-300 group-hover:-translate-y-1.5"
                style={{
                  width: SCREEN_WIDTH * PREVIEW_SCALE,
                  height: SCREEN_HEIGHT * PREVIEW_SCALE,
                }}
              >
                <div
                  className="pointer-events-none"
                  style={{
                    width: SCREEN_WIDTH,
                    height: SCREEN_HEIGHT,
                    transform: `scale(${PREVIEW_SCALE})`,
                    transformOrigin: "top left",
                  }}
                >
                  <DimiNotification
                    kind={preview.kind}
                    className="h-full w-full"
                  />
                </div>
              </div>
              <p className="mt-4 text-center text-[15px] font-bold text-foreground group-hover:text-primary">
                {preview.title}
              </p>
              <p className="mx-auto mt-1 max-w-[300px] text-center text-xs font-medium text-muted-foreground">
                {preview.caption}
              </p>
            </Link>
          ))}
        </div>

        <p className="mt-14 text-center text-xs font-medium text-muted-foreground">
          Shared shell: DIMI logo · headline with hero artwork · dynamic info
          card · slide-to-action slider · Snooze 5 min / Not now
        </p>
      </div>
    </div>
  );
}
