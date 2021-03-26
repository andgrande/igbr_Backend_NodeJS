export default function addWeeksToClasses(
  start_date: Date,
  sum_weeks: number,
): Date {
  if (sum_weeks === 0) {
    return new Date(start_date);
  }
  return new Date(start_date.setDate(start_date.getDate() + 7));
}
