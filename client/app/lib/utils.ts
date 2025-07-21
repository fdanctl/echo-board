export const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

export const secondsToHMS = (seconds: number) => {
  const doubleDigitsOption = {
    minimumIntegerDigits: 2,
    useGrouping: false,
  };
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds - 3600 * h) / 60);
  const s = (seconds - h * 3600 - 60 * m).toLocaleString(
    "en-US",
    doubleDigitsOption
  );

  return `${h > 0 ? h + ":" : ""}${h > 0 ? m.toLocaleString("en-US", doubleDigitsOption) : m
    }:${s}`;
};
