"use client";

import {
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type ScrollRevealProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: "up" | "left" | "right" | "zoom" | "soft";
  threshold?: number;
};

export default function ScrollReveal({
  children,
  className = "",
  variant = "up",
  threshold = 0.28,
  ...props
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(Boolean(entry?.isIntersecting));
      },
      {
        threshold,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return (
    <div
      ref={elementRef}
      className={`scroll-reveal scroll-reveal-${variant}${isVisible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
    </div>
  );
}