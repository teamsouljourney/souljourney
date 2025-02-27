import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export const formatDateTime = (date, type, endDate = null) => {
  if (!date) return "";
  const parsedDate = new Date(date);

  if (type === "date") {
    return format(parsedDate, "dd MMMM yyyy", { locale: enUS });
  } else if (type === "time") {
    return format(parsedDate, "HH:mm");
  } else if (type === "timeRange" && endDate) {
    const endParsedDate = new Date(endDate);
    return `${format(parsedDate, "HH:mm")} - ${format(endParsedDate, "HH:mm")}`;
  }

  return format(parsedDate, "dd MMMM yyyy HH:mm", { locale: enUS });
};

export const getTimeAgo = (createdAt) => {
  const now = new Date();
  const created = new Date(createdAt);
  const diffInMilliseconds = now - created;
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears > 0) {
    return `${diffInYears} ${diffInYears === 1 ? "year" : "years"} ago`;
  } else if (diffInMonths > 0) {
    return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`;
  } else if (diffInDays > 0) {
    return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} ${
      diffInMinutes === 1 ? "minute" : "minutes"
    } ago`;
  } else {
    return "Just now";
  }
};
