// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatFirestoreTimestamp(timestamp: any): string {
  if (!timestamp) return "";

  // If it's a Firestore Timestamp object
  if (timestamp._seconds !== undefined) {
    const date = new Date(timestamp._seconds * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      timeZone: "UTC",        // always display in UTC
    });
  }

  // If already a string or Date
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  });
}
