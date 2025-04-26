export function secondsToClock(
  totalSeconds: number
): [minutes: string, seconds: string] {
  if (!Number.isFinite(totalSeconds)) {
    return ["--", "--"];
  }

  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return [minutes, seconds];
}

export function getSecondsSince(timestamp: Date | undefined) {
  return getSecondsBetween(timestamp, new Date());
}

export function getSecondsUntil(timestamp: Date | undefined) {
  return getSecondsBetween(new Date(), timestamp);
}

function getSecondsBetween(a: Date | undefined, b: Date | undefined) {
  if (!a || !b) {
    return Number.NaN;
  }

  return Math.max(Math.ceil((+b - +a) / 1000), 0);
}
