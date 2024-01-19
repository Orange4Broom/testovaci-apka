import { DayInfo } from '../../src/typings/date';

/**
 * Gets the day name for a given date string.
 *
 * @param {string} dateString - The date string in the format 'YYYY-MM-DD'.
 * @returns {string} The day name corresponding to the given date string.
 */
export const getDayNameByDateString = (dateString: string): string => {
  const date = new Date(dateString);
  const dayNumber = date.getDay();

  switch (dayNumber) {
    case 0:
      return 'Ne';
    case 1:
      return 'Po';
    case 2:
      return 'Út';
    case 3:
      return 'St';
    case 4:
      return 'Čt';
    case 5:
      return 'Pá';
    case 6:
      return 'So';
    default:
      return '';
  }
};

/**
 * Converts a Date object to a date string in the format 'YYYY-MM-DD'.
 *
 * @param {Date} date - The Date object to convert.
 * @returns {string} The date string in the format 'YYYY-MM-DD'.
 */
export const getDateStringFromDate = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

/**
 * Gets an array of DayInfo objects for the specified date interval.
 *
 * @param {string} startDate - The start date of the interval in the format 'YYYY-MM-DD'.
 * @param {string} endDate - The end date of the interval in the format 'YYYY-MM-DD'.
 * @returns {DayInfo[]} An array of DayInfo objects representing each day in the interval.
 */
export const getDayInfoForInterval = (
  startDate: string,
  endDate: string
): DayInfo[] => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dayCount = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
  const dayInfo = [];

  for (let i = 0; i < dayCount; i++) {
    const date = new Date(start.getTime() + i * 24 * 3600 * 1000);
    const dateString = getDateStringFromDate(date);
    const dayName = getDayNameByDateString(dateString);
    dayInfo.push({ dateString, dayName });
  }

  return dayInfo;
};

/**
 * Gets a date string offset by a specified number of days from the input date string.
 *
 * @param {string} dateString - The input date string in the format 'YYYY-MM-DD'.
 * @param {number} dayCount - The number of days to offset. Positive values for future dates, negative for past dates.
 * @returns {string} The resulting date string after applying the offset.
 */
export const getOffsetDateStringByDayCount = (
  dateString: string,
  dayCount: number
): string => {
  const date = new Date(dateString);
  date.setDate(date.getDate() + dayCount);
  return getDateStringFromDate(date);
};

export const getLoanDayCount = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return (end.getTime() - start.getTime()) / (1000 * 3600 * 24) + 1;
};
