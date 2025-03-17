import {
  format,
  formatDistance,
  isValid,
  parse,
  formatDistanceToNow,
  isAfter,
  isBefore,
} from "date-fns";
import { enUS } from "date-fns/locale";

/**
 * Format a date based on the specified type
 */
export const formatDateTime = (date, type, endDate = null) => {
  if (!date) return "";

  const parsedDate = new Date(date);
  if (!isValid(parsedDate)) return "";

  if (type === "date") {
    return format(parsedDate, "dd MMMM yyyy", { locale: enUS });
  } else if (type === "time") {
    return format(parsedDate, "HH:mm");
  } else if (type === "timeRange" && endDate) {
    const endParsedDate = new Date(endDate);
    if (!isValid(endParsedDate)) return format(parsedDate, "HH:mm");
    return `${format(parsedDate, "HH:mm")} - ${format(endParsedDate, "HH:mm")}`;
  } else if (type === "shortDate") {
    return format(parsedDate, "dd/MM/yyyy");
  } else if (type === "monthYear") {
    return format(parsedDate, "MMMM yyyy", { locale: enUS });
  } else if (type === "appointmentDate") {
    return format(parsedDate, "MMM d, yyyy");
  } else if (type === "appointmentTime") {
    return format(parsedDate, "h:mm a");
  }

  return format(parsedDate, "dd MMMM yyyy HH:mm", { locale: enUS });
};

/**
 * Get a human-readable time ago string
 */
export const getTimeAgo = (createdAt, t) => {
  if (!createdAt) return "";

  const now = new Date();
  const created = new Date(createdAt);

  if (!isValid(created)) return "";

  const diffInMilliseconds = now - created;
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears > 0) {
    return `${diffInYears} ${
      diffInYears === 1 ? t("GTA-year") : t("GTA-years")
    } ${t("GTA-ago")}`;
  } else if (diffInMonths > 0) {
    return `${diffInMonths} ${
      diffInMonths === 1 ? t("GTA-month") : t("GTA-months")
    } ${t("GTA-ago")}`;
  } else if (diffInDays > 0) {
    return `${diffInDays} ${
      diffInDays === 1 ? t("GTA-day") : t("GTA-days")
    } ${t("GTA-ago")}`;
  } else if (diffInHours > 0) {
    return `${diffInHours} ${
      diffInHours === 1 ? t("GTA-hour") : t("GTA-hours")
    } ${t("GTA-ago")}`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} ${
      diffInMinutes === 1 ? t("GTA-minute") : t("GTA-minutes")
    } ${t("GTA-ago")}`;
  } else {
    return t("GTA-justNow");
  }
};

/**
 * Format a date range
 */
export const formatDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return "";

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (!isValid(start) || !isValid(end)) return "";

  // If same day
  if (start.toDateString() === end.toDateString()) {
    return `${format(start, "dd MMMM yyyy")} ${format(
      start,
      "HH:mm"
    )} - ${format(end, "HH:mm")}`;
  }

  // Different days
  return `${format(start, "dd MMMM yyyy HH:mm")} - ${format(
    end,
    "dd MMMM yyyy HH:mm"
  )}`;
};

/**
 * Parse a date string with a specific format
 */
export const parseDate = (dateString, formatString) => {
  try {
    return parse(dateString, formatString, new Date());
  } catch (error) {
    return null;
  }
};

/**
 * Check if a date is today
 */
export const isToday = (date) => {
  if (!date) return false;

  const today = new Date();
  const checkDate = new Date(date);

  return (
    checkDate.getDate() === today.getDate() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getFullYear() === today.getFullYear()
  );
};

/**
 * Get the nearest appointment from a list of appointments
 */
export const getNearestAppointment = (appointments) => {
  if (!appointments || appointments.length === 0) return null;

  const now = new Date();
  const currentOrUpcomingAppointments = appointments.filter((appointment) =>
    isAfter(new Date(appointment.endTime), now)
  );

  // Sort by date (nearest first)
  currentOrUpcomingAppointments.sort(
    (a, b) => new Date(a.startTime) - new Date(b.startTime)
  );

  return currentOrUpcomingAppointments[0] || null;
};

/**
 * Check if current time is within appointment time
 */
export const isWithinAppointmentTime = (startTime, endTime) => {
  if (!startTime || !endTime) return false;

  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  return isAfter(now, start) && isBefore(now, end);
};

/**
 * Get appointment time status text
 */
export const getAppointmentTimeStatus = (startTime, endTime) => {
  if (!startTime || !endTime) return "";

  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (isBefore(now, start)) {
    return formatDistanceToNow(start, { addSuffix: true });
  } else if (isAfter(now, start) && isBefore(now, end)) {
    return `Ends ${formatDistanceToNow(end, { addSuffix: true })}`;
  } else {
    return "Appointment ended";
  }
};

/**
 * Format appointment time range
 */
export const formatAppointmentTimeRange = (startTime, endTime) => {
  if (!startTime || !endTime) return "";

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (!isValid(start) || !isValid(end)) return "";

  return `${format(start, "h:mm a")} - ${format(end, "h:mm a")}`;
};
