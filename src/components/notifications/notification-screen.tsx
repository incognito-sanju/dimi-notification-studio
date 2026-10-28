import { Check, Clock, X } from "lucide-react";
import { useState, type ReactNode } from "react";

import logo from "@/assets/notifications/dimi-logo.png";
import type { NotificationConfig } from "@/components/notifications/data";
import { SlideToAction } from "@/components/notifications/slide-to-action";
import { cn } from "@/lib/utils";

type ScreenStatus = "active" | "success" | "snoozed" | "dismissed";

interface NotificationScreenProps {
  config: NotificationConfig;
  card: ReactNode;
  className?: string | undefined;
}

/**
 * Shared full-screen notification shell: DIMI branding, headline with hero
 * artwork, dynamic info card, slide-to-action slider, and the common
 * Snooze / Not-now actions. Only the artwork, accent, card and labels change
 * per notification type.
 */
export function NotificationScreen({ config, card, className }: NotificationScreenProps) {
  const [status, setStatus] = useState<ScreenStatus>("active");
  const isRed = config.accent === "red";

  const reset = () => setStatus("active");

  return (
    <div
      className={cn(
        "dimi-screen relative",
        isRed && "dimi-screen-red",
        className,
      )}
    >
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[430px] flex-col px-6 pb-8 pt-9">
        <header>
          <img
            src={logo}
            alt="DIMI logo"
            width={512}
            height={512}
            className="mx-auto h-14 w-14"
          />
          <p className="mt-2 text-center text-sm font-semibold tracking-[0.42em] text-foreground">
            DIMI
          </p>
        </header>

        {status === "active" ? (
          <>
            <div className="relative mt-8 min-h-[176px]">
              <img
                src={config.heroSrc}
                alt={config.heroAlt}
                width={1024}
                height={1024}
                className="pointer-events-none absolute -top-4 right-[-30px] w-56 drop-shadow-xl"
              />
              <h1 className="relative max-w-[58%] text-[2.35rem] font-extrabold leading-[1.08] tracking-tight text-foreground">
                {config.headline.map((segment, index) => (
                  <span
                    key={index}
                    className={cn(
                      segment.accent && (isRed ? "text-yt-red" : "text-primary"),
                    )}
                  >
                    {segment.text}
                    {index < config.headline.length - 1 ? " " : ""}
                  </span>
                ))}
              </h1>
            </div>

            <div className="mt-auto pt-8">{card}</div>

            <SlideToAction
              label={config.sliderLabel}
              accent={config.accent}
              onComplete={() => setStatus("success")}
              className="mt-6"
            />

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStatus("snoozed")}
                className="flex items-center justify-center gap-2.5 rounded-full border border-border/80 bg-card/80 py-3 text-[15px] font-semibold text-foreground transition-colors hover:bg-card"
              >
                <Clock className="h-4 w-4 text-muted-foreground" />
                Snooze 5 min
              </button>
              <button
                type="button"
                onClick={() => setStatus("dismissed")}
                className="flex items-center justify-center gap-2.5 rounded-full border border-destructive/15 bg-destructive/10 py-3 text-[15px] font-semibold text-foreground transition-colors hover:bg-destructive/15"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-destructive/15">
                  <X className="h-3.5 w-3.5 text-destructive" />
                </span>
                Not now
              </button>
            </div>
          </>
        ) : (
          <StatusPanel config={config} status={status} onReset={reset} />
        )}
      </div>
    </div>
  );
}

function StatusPanel({
  config,
  status,
  onReset,
}: {
  config: NotificationConfig;
  status: Exclude<ScreenStatus, "active">;
  onReset: () => void;
}) {
  const isRed = config.accent === "red";
  const content = {
    success: {
      title: config.success.title,
      message: config.success.message,
      icon: <Check className="h-8 w-8" />,
      tone: isRed ? "red" : "amber",
    },
    snoozed: {
      title: "Snoozed for 5 minutes",
      message: "We'll bring this back in five minutes.",
      icon: <Clock className="h-8 w-8" />,
      tone: "amber",
    },
    dismissed: {
      title: "Dismissed",
      message: "Maybe later — we won't ask again right now.",
      icon: <X className="h-8 w-8" />,
      tone: "red",
    },
  }[status];

  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <div
        className={cn(
          "flex h-20 w-20 items-center justify-center rounded-[1.6rem] animate-in zoom-in-95 fade-in duration-300",
          content.tone === "amber" && "bg-amber-soft text-primary",
          content.tone === "red" && "bg-yt-soft text-yt-red",
        )}
      >
        {content.icon}
      </div>
      <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
        {content.title}
      </h2>
      <p className="mt-2 max-w-[280px] text-[15px] font-medium text-muted-foreground">
        {content.message}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 rounded-full border border-border/80 bg-card/70 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-card"
      >
        Show notification again
      </button>
    </div>
  );
}
