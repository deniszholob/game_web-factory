// Number utilities

export function wrapValue(v: number, maxV: number): number {
  return (v + maxV) % maxV;
}

export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

export function timeOutWithProgress(
  duration: number, // total duration in milliseconds
  onProgress: (progress: number) => void, // callback for progress updates
  onComplete: () => void, // callback when timeout completes
): void {
  if (duration <= 0) {
    onProgress(100);
    onComplete();
    return;
  }
  let start: number | null = null;

  function updateProgress(timestamp: DOMHighResTimeStamp): void {
    if (!start) start = timestamp;
    const elapsed: number = timestamp - start;
    const progress: number = Math.min((elapsed / duration) * 100, 100);
    onProgress(progress);

    if (elapsed < duration) {
      requestAnimationFrame(updateProgress);
    } else {
      onComplete();
    }
  }
  requestAnimationFrame(updateProgress);
}
