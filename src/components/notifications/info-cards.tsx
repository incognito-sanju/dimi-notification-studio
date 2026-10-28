import { Bell, CalendarDays, Clock, FileText, Youtube } from "lucide-react";

import { demoData } from "@/components/notifications/data";
import { cn } from "@/lib/utils";

function InfoHeader({
  icon,
  label,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  tone: "amber" | "red";
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-2xl",
          tone === "amber" ? "bg-amber-soft" : "bg-yt-soft",
        )}
      >
        {icon}
      </span>
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function PlannerEventCard({
  event = demoData.plannerEvent,
}: {
  event?: typeof demoData.plannerEvent;
}) {
  return (
    <div className="dimi-card p-5">
      <InfoHeader
        tone="amber"
        label={event.label}
        icon={<CalendarDays className="h-5 w-5 text-primary" />}
      />
      <h3 className="mt-3 text-[1.55rem] font-bold leading-tight tracking-tight text-foreground">
        {event.title}
      </h3>
      <div className="mt-4 flex items-center gap-4">
        <div className="flex flex-1 items-center gap-2.5 rounded-2xl bg-muted/70 px-4 py-3">
          <Clock className="h-4 w-4 shrink-0 text-primary" />
          <span className="text-[15px] font-semibold text-foreground">
            {event.startTime} — {event.endTime}
          </span>
        </div>
        <div className="pr-1 text-right">
          <p className="text-[1.55rem] font-bold leading-none text-foreground">
            {event.durationMinutes}
          </p>
          <p className="mt-1 text-xs font-medium text-muted-foreground">min</p>
        </div>
      </div>
    </div>
  );
}

export function PlaylistCard({
  playlist = demoData.playlist,
}: {
  playlist?: typeof demoData.playlist;
}) {
  return (
    <div className="dimi-card p-5">
      <InfoHeader
        tone="red"
        label={playlist.label}
        icon={<Youtube className="h-5 w-5 text-yt-red" />}
      />
      <div className="mt-3 flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-[1.3rem] font-bold leading-snug tracking-tight text-foreground">
            {playlist.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            {playlist.channel}
          </p>
          <div className="mt-3 flex items-center gap-2.5">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="progress-red h-full rounded-full"
                style={{ width: `${playlist.progressPercent}%` }}
              />
            </div>
            <span className="text-sm font-bold text-foreground">
              {playlist.progressPercent}%
            </span>
          </div>
          <p className="mt-2 text-xs font-medium text-muted-foreground">
            {playlist.videosWatched} of {playlist.videosTotal} videos watched
          </p>
        </div>
        <img
          src={playlist.thumbnail}
          alt={`${playlist.title} thumbnail`}
          width={1280}
          height={720}
          loading="lazy"
          className="h-[76px] w-[132px] shrink-0 rounded-xl object-cover shadow-md"
        />
      </div>
    </div>
  );
}

export function ReminderCard({
  reminder = demoData.reminder,
}: {
  reminder?: typeof demoData.reminder;
}) {
  return (
    <div className="dimi-card p-5">
      <InfoHeader
        tone="amber"
        label={reminder.label}
        icon={<Bell className="h-5 w-5 text-primary" />}
      />
      <h3 className="mt-3 text-[1.55rem] font-bold leading-tight tracking-tight text-foreground">
        {reminder.title}
      </h3>
      <div className="mt-2 flex items-center gap-2 text-[15px] font-semibold text-muted-foreground">
        <Clock className="h-4 w-4 shrink-0" />
        {reminder.scheduledLabel}
      </div>
      {reminder.note ? (
        <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-muted/70 px-4 py-3">
          <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            {reminder.note}
          </span>
        </div>
      ) : null}
    </div>
  );
}
