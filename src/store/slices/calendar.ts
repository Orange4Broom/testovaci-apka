import { createSlice } from '@reduxjs/toolkit';

const handleGenerateDates = (year: number) => {
  const dates: { date: string; day: string }[] = [];
  const days = ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'];

  for (let i = 0; i <= 1; i++) {
    for (let j = 1; j <= 31; j++) {
      const date = new Date(year, i, j);

      if (date.getMonth() === i) {
        dates.push({
          date: date.toString(),
          day: days[date.getDay()],
        });
      }
    }
  }

  return dates;
};

const INITIAL_STATE = {
  year: 2024,
  dates: handleGenerateDates(2024),
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: INITIAL_STATE,
  reducers: {},
});
