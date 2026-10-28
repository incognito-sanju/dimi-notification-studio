import { ChevronRight } from "lucide-react";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

import { cn } from "@/lib/utils";
import type { NotificationAccent } from "@/components/notifications/data";

interface SlideToActionProps {
  label: string;
  accent: NotificationAccent;
  onComplete: () => void;
  className?: string;
}

const THUMB_SIZE = 56;
const TRACK_PADDING = 4;

/**
 * Accessible slide-to-action control: drag the thumb to the end (or use
 * arrow keys / Enter) to confirm. Behaves like a slider, never a button.
 */
export function SlideToAction({ label, accent, onComplete, className }: SlideToActionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [done, setDone] = useState(false);

  const setFromClientX = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const max = rect.width - THUMB_SIZE - TRACK_PADDING * 2;
    const x = Math.min(
      Math.max(clientX - rect.left - TRACK_PADDING - THUMB_SIZE / 2, 0),
      max,
    );
    setProgress(max <= 0 ? 0 : x / max);
  };

  const finish = () => {
    if (done) return;
    setDone(true);
    setProgress(1);
    window.setTimeout(onComplete, 280);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (done) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    draggingRef.current = true;
    setDragging(true);
    setFromClientX(event.clientX);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || done) return;
    setFromClientX(event.clientX);
  };

  const handlePointerUp = () => {
    if (!draggingRef.current || done) return;
    draggingRef.current = false;
    setDragging(false);
    if (progress >= 0.92) {
      finish();
    } else {
      setProgress(0);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (done) return;
    const step = 0.1;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowUp": {
        event.preventDefault();
        const next = Math.min(progress + step, 1);
        if (next >= 0.995) finish();
        else setProgress(next);
        break;
      }
      case "ArrowLeft":
      case "ArrowDown": {
        event.preventDefault();
        setProgress(Math.max(progress - step, 0));
        break;
      }
      case "Home": {
        event.preventDefault();
        setProgress(0);
        break;
      }
      case "End":
      case "Enter":
      case " ": {
        event.preventDefault();
        finish();
        break;
      }
    }
  };

  return (
    <div
      ref={trackRef}
      role="slider"
      tabIndex={done ? -1 : 0}
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative h-16 w-full touch-none select-none rounded-full outline-none",
        "ring-ring/60 focus-visible:ring-4",
        accent === "amber" ? "slide-track-amber" : "slide-track-red",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute inset-x-10 top-1/2 -translate-y-1/2 text-center text-[15px] font-semibold tracking-tight transition-opacity duration-150"
        style={{ opacity: Math.max(1 - progress * 1.6, 0) }}
      >
        {label}
      </span>
      <div
        className="absolute top-1/2 flex items-center justify-center rounded-full bg-card shadow-lg"
        style={{
          width: THUMB_SIZE,
          height: THUMB_SIZE,
          left: TRACK_PADDING,
          transform: `translate(calc(${progress} * (100% - ${THUMB_SIZE + TRACK_PADDING * 2}px)), -50%)`,
          transition: dragging
            ? "none"
            : "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <ChevronRight
          className={cn(
            "h-6 w-6",
            accent === "amber" ? "text-foreground" : "text-yt-red",
          )}
        />
      </div>
    </div>
  );
}
