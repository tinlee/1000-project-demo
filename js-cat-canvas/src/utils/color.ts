export function getColor() {
  return (
    "hsl(" +
    360 * Math.random() +
    "," +
    // (25 + 70 * Math.random()) +
    100 * Math.random() +
    "%," +
    // (70 + 10 * Math.random()) +
    100 * Math.random() +
    "%)"
  );
}

export function getLightColor() {
  return (
    "hsl(" +
    360 * Math.random() +
    "," +
    (25 + 70 * Math.random()) +
    "%," +
    (90 + 5 * Math.random()) +
    "%)"
  );
}
