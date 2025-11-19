import { useEffect, useRef, useState } from "react";

type Options = {
  duration?: number;           // ms
  easing?: string;             // e.g. 'ease-in-out'
  disabled?: boolean;          // skip animation (e.g., floating menus)
};

export function useSmoothCollapse<T extends HTMLElement>(
  isOpen: boolean,
  { duration = 300, easing = "ease", disabled = false }: Options = {}
) {
  const ref = useRef<T | null>(null);
  const [mounted, setMounted] = useState(isOpen);
  const roRef = useRef<ResizeObserver | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (disabled) {
      setMounted(isOpen);
      const el = ref.current;
      if (el) {
        el.style.removeProperty("transition");
        el.style.removeProperty("height");
        el.style.removeProperty("overflow");
      }
      return;
    }

    const el = ref.current;
    if (!el) return;

    const stopRAF = () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const stopObserving = () => {
      roRef.current?.disconnect();
      roRef.current = null;
    };

    // base styles for smooth height animation
    el.style.overflow = "clip"; // avoids scrollbars
    el.style.transitionProperty = "height";
    el.style.transitionDuration = `${duration}ms`;
    el.style.transitionTimingFunction = easing;

    const setHeight = (h: number) => {
      el.style.height = `${Math.max(0, h)}px`;
    };

    const observeContent = () => {
      if (roRef.current) return;
      roRef.current = new ResizeObserver(() => {
        // throttle via RAF to avoid layout thrash
        stopRAF();
        rafRef.current = requestAnimationFrame(() => {
          if (!ref.current) return;
          setHeight(ref.current.scrollHeight);
        });
      });
      roRef.current.observe(el);
    };

    const onOpen = () => {
      setMounted(true);
      // Start from 0 → target height
      setHeight(0);
      // Force reflow so the transition starts from 0
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      el.offsetHeight;

      setHeight(el.scrollHeight);

      const handleEnd = () => {
        // Keep pixel height and observe changes so nested toggles animate too
        setHeight(el.scrollHeight);
        observeContent();
        el.removeEventListener("transitionend", handleEnd);
      };
      el.addEventListener("transitionend", handleEnd, { once: true });
    };

    const onClose = () => {
      // Stop observing while collapsing
      stopObserving();

      // Freeze current height, then go to 0
      const current = el.getBoundingClientRect().height;
      setHeight(current);
      // Force reflow
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      el.offsetHeight;

      setHeight(0);

      const handleEnd = () => {
        setMounted(false);
        el.removeEventListener("transitionend", handleEnd);
      };
      el.addEventListener("transitionend", handleEnd, { once: true });
    };

    if (isOpen) onOpen();
    else onClose();

    return () => {
      stopObserving();
      stopRAF();
    };
  }, [isOpen, duration, easing, disabled]);

  return { ref, mounted };
}
