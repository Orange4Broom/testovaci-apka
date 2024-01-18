import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../typings/state';

const INITIAL_STATE = {
  isAddLoanOpen: false,
  isEditLoanOpen: false,
  loanId: '1',
  propertyId: '1',
  propertyName: 'bagr',
  state: 'nová',
  startDate: new Date('2024-01-12').toString(),
  endDate: new Date('2024-01-28').toString(),
  calendarStartDate: new Date('2024-01-01T00:00:00').toString(),
  calendarEndDate: new Date('2024-01-18T00:00:00').toString(),
  openedProperties: ['AS34'],
};

export const rootStateSlice = createSlice({
  name: 'rootState',
  initialState: INITIAL_STATE,
  reducers: {
    updateRootState: (state: RootState, action: { payload: RootState }) => {
      const {
        isAddLoanOpen,
        isEditLoanOpen,
        loanId,
        propertyId,
        propertyName,
        state: loanState,
        startDate,
        endDate,
        openedProperties,
      } = action.payload;
      state.isAddLoanOpen = isAddLoanOpen;
      state.isEditLoanOpen = isEditLoanOpen;
      state.loanId = loanId;
      state.propertyId = propertyId;
      state.propertyName = propertyName;
      state.state = loanState;
      state.startDate = startDate;
      state.endDate = endDate;
      state.openedProperties = openedProperties;
    },
  },
});

export const { updateRootState } = rootStateSlice.actions;
