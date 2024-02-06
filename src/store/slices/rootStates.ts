import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getDateStringFromDate } from '../../utils/date';

import { Loan } from '../../typings/loan';

interface InitialStateDefaultObject {
  isAddPropertyOpen: boolean;
  isLoanOpen: boolean;
  shouldAddLoanOpen: boolean;
  loan: Loan[];
  loanId: string;
  propertyId: string;
  propertyName: string;
  state: string;
  startDate: string;
  endDate: string;
  calendarStartDate: string;
  calendarEndDate: string;
  openedProperties: string[];
}

const INITIAL_STATE: InitialStateDefaultObject = {
  isAddPropertyOpen: false,
  isLoanOpen: false,
  shouldAddLoanOpen: false,
  loan: [],
  loanId: '1',
  propertyId: '1',
  propertyName: 'bagr',
  state: 'nová',
  startDate: '2024-01-12',
  endDate: '2024-01-28',
  calendarStartDate: getDateStringFromDate(new Date()),
  calendarEndDate: '2024-01-18',
  openedProperties: ['AS34', 'AS35', 'AS36', 'AS37'],
};

export const rootStateSlice = createSlice({
  name: 'rootState',
  initialState: INITIAL_STATE,
  reducers: {
    updateRootState: (
      state,
      action: PayloadAction<Partial<InitialStateDefaultObject>>
    ) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { updateRootState } = rootStateSlice.actions;
