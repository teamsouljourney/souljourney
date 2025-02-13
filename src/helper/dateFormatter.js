import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export const formatDateTime = (date, type) => {
  if (!date) return "";
  const parsedDate = new Date(date);

  if (type === "date") {
    return format(parsedDate, "dd MMMM yyyy", { locale: enUS });
  } else if (type === "time") {
    return format(parsedDate, "HH:mm");
  }

  return format(parsedDate, "dd MMMM yyyy HH:mm", { locale: enUS });
};
