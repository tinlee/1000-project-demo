import dayjs from "dayjs";

export type CurrentDate = {
  date: dayjs.Dayjs;
  showDate: number;
  isCurrtentMonth?: boolean;
  timeStamp: number;
  isToday: boolean;
  formatDate: string;
};

export function getMonthDays(
  date?: dayjs.Dayjs | string | Date
): CurrentDate[][] {
  const dateObj = dayjs(date);
  const monthStart = dateObj.startOf("month");
  const dayOfWeek = monthStart.day();
  const fistDay = monthStart.subtract(dayOfWeek, "day");

  const days: CurrentDate[][] = new Array(6).fill(0).map(() => []);

  for (let i = 0; i < 42; i++) {
    const currentDate = fistDay.add(i, "day");
    days[Math.floor(i / 7)].push({
      date: currentDate,
      timeStamp: currentDate.valueOf(),
      showDate: currentDate.date(),
      formatDate: currentDate.format("YYYY-MM-DD"),
      isCurrtentMonth: currentDate.month() === dateObj.month(),
      isToday: currentDate.isSame(dayjs(), "day"),
    });
  }
  return days;
}
