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

  return `${h > 0 ? h + ":" : ""}${
    h > 0 ? m.toLocaleString("en-US", doubleDigitsOption) : m
  }:${s}`;
};

export const formatPrice = (priceInCents: number) => {
  const doubleDigitsOption = {
    minimumIntegerDigits: 2,
    useGrouping: false,
  };

  const arr = priceInCents.toString().split("");
  const intPart = arr.slice(0, -2).join("");
  const decPart = Number(arr.slice(-2).join("")).toLocaleString(
    "en-US",
    doubleDigitsOption
  );

  // "" return false
  return (intPart ? intPart : "0") + "." + decPart;
};
