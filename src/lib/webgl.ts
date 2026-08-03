export function isWebGLAvailable(): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    const attrs: WebGLContextAttributes = { failIfMajorPerformanceCaveat: false };
    const gl =
      canvas.getContext("webgl2", attrs) ||
      canvas.getContext("webgl", attrs) ||
      canvas.getContext("experimental-webgl", attrs);

    if (!gl) return false;

    const loseContext = (gl as WebGLRenderingContext).getExtension("WEBGL_lose_context");
    loseContext?.loseContext();

    return true;
  } catch {
    return false;
  }
}
