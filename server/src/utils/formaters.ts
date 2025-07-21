export const HMStoSeconds = (s: string): number | null => {
  let hms = s.split(":").map((e) => Number(e));

  if (hms.some((e) => Number.isNaN(e))) return null;

  const len = hms.length;
  return hms.reduce(
    (seconds, val, i) => seconds + val * Math.pow(60, len - i - 1),
    0,
  );
};
