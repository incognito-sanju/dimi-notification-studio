import bellHero from "@/assets/notifications/bell-hero.png";
import calendarHero from "@/assets/notifications/calendar-hero.png";
import playlistThumbnail from "@/assets/notifications/playlist-thumbnail.png";
import youtubeHero from "@/assets/notifications/youtube-hero.png";

export type NotificationKind = "planner" | "youtube" | "reminder";
export type NotificationAccent = "amber" | "red";

export interface HeadlineSegment {
  text: string;
  accent?: boolean;
}

export interface NotificationConfig {
  kind: NotificationKind;
  accent: NotificationAccent;
  headline: HeadlineSegment[];
  heroSrc: string;
  heroAlt: string;
  sliderLabel: string;
  success: { title: string; message: string };
}

/**
 * Demo source of truth for the notification screens. In the DIMI app these
 * values come from the Riverpod providers (Drift DB / Supabase); the screens
 * render whatever object is passed in, never hardcoded copy.
 */
export const demoData = {
  plannerEvent: {
    label: "Planner Event",
    title: "Deep Work Session",
    startTime: "9:30 AM",
    endTime: "10:15 AM",
    durationMinutes: 45,
  },
  playlist: {
    label: "YouTube Playlist",
    title: "Java Full Stack Development (2025)",
    channel: "CodeWithHarry",
    thumbnail: playlistThumbnail,
    progressPercent: 62,
    videosWatched: 32,
    videosTotal: 52,
  },
  reminder: {
    label: "Reminder",
    title: "Revise DSA",
    scheduledLabel: "Today · 9:00 AM",
    note: "Focus on Arrays & Recursion",
  },
};

export const notificationConfigs: Record<NotificationKind, NotificationConfig> = {
  planner: {
    kind: "planner",
    accent: "amber",
    headline: [
      { text: "Your" },
      { text: "Deep Work Session", accent: true },
      { text: "starts now." },
    ],
    heroSrc: calendarHero,
    heroAlt: "3D calendar illustration",
    sliderLabel: "Slide to start session",
    success: {
      title: "Session started",
      message: `${demoData.plannerEvent.title} is running — Focus Mode is active.`,
    },
  },
  youtube: {
    kind: "youtube",
    accent: "red",
    headline: [
      { text: "Ready to" },
      { text: "continue", accent: true },
      { text: "learning?" },
    ],
    heroSrc: youtubeHero,
    heroAlt: "3D YouTube play illustration",
    sliderLabel: "Slide to continue learning",
    success: {
      title: "Resuming playlist",
      message: `Picking up where you left off in ${demoData.playlist.title}.`,
    },
  },
  reminder: {
    kind: "reminder",
    accent: "amber",
    headline: [
      { text: "A" },
      { text: "reminder", accent: true },
      { text: "for you." },
    ],
    heroSrc: bellHero,
    heroAlt: "3D reminder bell illustration",
    sliderLabel: "Slide to mark as done",
    success: {
      title: "Marked as done",
      message: `${demoData.reminder.title} is completed. Nice work.`,
    },
  },
};

export const notificationRoute: Record<NotificationKind, string> = {
  planner: "/notify/planner",
  youtube: "/notify/youtube",
  reminder: "/notify/reminder",
};
