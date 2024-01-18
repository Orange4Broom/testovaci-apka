import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitialStateDefaultObject {
  isAddLoanOpen: boolean;
  isEditLoanOpen: boolean;
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
    updateRootState: (
      state,
      action: PayloadAction<Partial<InitialStateDefaultObject>>
    ) => {
      state = { ...state, ...action.payload };
    },
  },
});

export const { updateRootState } = rootStateSlice.actions;
