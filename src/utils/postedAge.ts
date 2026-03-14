export function postedAgeHours(posted: string | null | undefined): number | null {
  if (!posted) return null;

  const raw = posted.trim().toLowerCase();
  if (!raw) return null;

  if (raw === "just now" || raw === "now") return 0;
  if (raw === "today") return 0;
  if (raw === "yesterday") return 24;

  // Examples: "15 hours ago", "3 days ago", "1 week ago", "30 minutes ago"
  const match = raw.match(
    /(\d+)\s*(minute|minutes|min|mins|hour|hours|hr|hrs|day|days|week|weeks|month|months|year|years)\s*(ago)?/i,
  );
  if (!match) return null;

  const value = Number(match[1]);
  if (!Number.isFinite(value)) return null;

  const unit = match[2];
  if (unit.startsWith("min")) return value / 60;
  if (unit.startsWith("h") || unit.startsWith("hr")) return value;
  if (unit.startsWith("day")) return value * 24;
  if (unit.startsWith("week")) return value * 24 * 7;
  if (unit.startsWith("month")) return value * 24 * 30;
  if (unit.startsWith("year")) return value * 24 * 365;

  return null;
}
