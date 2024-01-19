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
  startDate: '2024-01-12',
  endDate: '2024-01-28',
  calendarStartDate: '2024-01-01',
  calendarEndDate: '2024-01-18',
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
