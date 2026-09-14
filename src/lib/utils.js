import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date) => {
  const formatted = new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const [day, month, year] = formatted.split(" ");

  return `${day} ${month}, ${year}`;
};
