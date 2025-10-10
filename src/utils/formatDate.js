export const formatDate = (value) => {
  if (!value) return null;

  // If it's a string, try to parse it as a Date
  const dateObj = typeof value === "string" ? new Date(value) : value;

  if (!(dateObj instanceof Date) || isNaN(dateObj)) return null;

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
