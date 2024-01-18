import { configureStore } from '@reduxjs/toolkit';
import { calendarSlice } from './slices/calendar';
import { propertiesSlice } from './slices/properties';
import { loansSlice } from './slices/loans';
import { rootStateSlice } from './slices/rootStates';

export const store = configureStore({
  reducer: {
    calendar: calendarSlice.reducer,
    properties: propertiesSlice.reducer,
    loans: loansSlice.reducer,
    rootState: rootStateSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
