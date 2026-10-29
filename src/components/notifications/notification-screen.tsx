import { BatteryFull, Check, Clock, Signal, Wifi, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

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
 * Shared full-screen notification shell: status bar, DIMI branding, headline
 * with hero artwork, dynamic info card, slide-to-action slider, and the common
 * Snooze / Not-now actions. Only the artwork, accent, card and labels change
 * per notification type.
 *
 * Vertical rhythm is distributed with proportional flex spacers so the layout
 * stays balanced on any phone height instead of pooling empty space in one
 * place.
 */
export function NotificationScreen({ config, card, className }: NotificationScreenProps) {
  const [status, setStatus] = useState<ScreenStatus>("active");
  const [clock, setClock] = useState<string | null>(null);
  const isRed = config.accent === "red";

  useEffect(() => {
    const update = () =>
      setClock(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
      );
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);

  const reset = () => setStatus("active");

  return (
    <div
      className={cn(
        "dimi-screen relative flex items-center justify-center",
        isRed && "dimi-screen-red",
        className,
      )}
    >
      <div className="relative z-10 flex h-full max-h-[880px] w-full max-w-[430px] flex-col px-7 pb-7 pt-3">
        <StatusBar time={clock} />

        <header className="mt-5 flex flex-col items-center">
          <img
            src={logo}
            alt="DIMI logo"
            width={512}
            height={512}
            className="h-12 w-12"
          />
          <p className="mt-1.5 text-[13px] font-semibold tracking-[0.42em] text-foreground">
            DIMI
          </p>
        </header>

        {status === "active" ? (
          <>
            <div className="relative mt-9">
              <img
                src={config.heroSrc}
                alt={config.heroAlt}
                width={1024}
                height={1024}
                className="pointer-events-none absolute -top-12 right-0 w-48 drop-shadow-xl"
              />
              <h1 className="relative max-w-[56%] text-[2.35rem] font-extrabold leading-[1.1] tracking-tight text-foreground">
                {config.headline.map((segment, index) => (
                  <span
                    key={index}
                    className={cn(
                      !segment.accent && "block",
                      segment.accent && (isRed ? "text-yt-red" : "text-primary"),
                    )}
                  >
                    {segment.text}
                  </span>
                ))}
              </h1>
            </div>

            <div aria-hidden className="min-h-8 flex-[3]" />
            <div>{card}</div>
            <div aria-hidden className="min-h-6 flex-[2]" />

            <SlideToAction
              label={config.sliderLabel}
              accent={config.accent}
              onComplete={() => setStatus("success")}
            />

            <div className="mt-3.5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStatus("snoozed")}
                className="flex h-12 items-center justify-center gap-2.5 rounded-full border border-border/80 bg-card/80 text-[15px] font-semibold text-foreground transition-colors hover:bg-card"
              >
                <Clock className="h-4 w-4 text-muted-foreground" />
                Snooze 5 min
              </button>
              <button
                type="button"
                onClick={() => setStatus("dismissed")}
                className="flex h-12 items-center justify-center gap-2 rounded-full border border-destructive/15 bg-destructive/10 text-[15px] font-semibold text-foreground transition-colors hover:bg-destructive/15"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive/15">
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

/** Slim phone status bar: live clock on the left, signal / wi-fi / battery on the right. */
function StatusBar({ time }: { time: string | null }) {
  return (
    <div className="flex h-5 items-center justify-between text-[11px] font-semibold text-foreground/45">
      <span className="tabular-nums">{time ?? ""}</span>
      <span className="flex items-center gap-1.5" aria-hidden>
        <Signal className="h-3 w-3" />
        <Wifi className="h-3 w-3" />
        <BatteryFull className="h-4 w-4" />
      </span>
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
