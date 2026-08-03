"use client";

import { Component, type ReactNode, useEffect, useState } from "react";
import { isWebGLAvailable } from "@/lib/webgl";

class CanvasBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

function isWebGLRendererError(reason: unknown): boolean {
  const message =
    reason instanceof Error ? reason.message : typeof reason === "string" ? reason : "";
  return message.includes("WebGLRenderer") || message.includes("WebGL context");
}

export default function Scene3D({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setSupported(isWebGLAvailable());

    // react-three-fiber can surface renderer-creation failures as an
    // unhandled promise rejection rather than a catchable render error,
    // so a React error boundary alone isn't enough — catch it globally too.
    const onRejection = (event: PromiseRejectionEvent) => {
      if (isWebGLRendererError(event.reason)) {
        event.preventDefault();
        setSupported(false);
      }
    };

    window.addEventListener("unhandledrejection", onRejection);
    return () => window.removeEventListener("unhandledrejection", onRejection);
  }, []);

  if (!supported) return <>{fallback}</>;

  return (
    <CanvasBoundary onError={() => setSupported(false)}>{children}</CanvasBoundary>
  );
}
