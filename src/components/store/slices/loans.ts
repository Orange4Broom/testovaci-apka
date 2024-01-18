import { createSlice } from '@reduxjs/toolkit';
import { LoanPayload, RemoveLoanPayload } from '../../../typings/payload';
import { LoanState, RemoveLoanState } from '../../../typings/state';

const INITIAL_STATE = {
  2: {
    id: '2',
    propertyId: 'AS34',
    name: 'bagr',
    state: 'nová',
    startDate: new Date('2024-01-02T00:00:00').toString(),
    endDate: new Date('2024-01-16T00:00:00').toString(),
  },
  3: {
    id: '3',
    propertyId: 'AS35',
    name: 'kladivo',
    state: 'hotová',
    startDate: new Date('2024-01-08T00:00:00').toString(),
    endDate: new Date('2024-01-20T00:00:00').toString(),
  },
  4: {
    id: '4',
    propertyId: 'AS36',
    name: 'lopatka',
    state: 'v přípravě',
    startDate: new Date('2024-01-12T00:00:00').toString(),
    endDate: new Date('2024-01-28T00:00:00').toString(),
  },
  5: {
    id: '5',
    propertyId: 'AS36',
    name: 'lopatka',
    state: 'hotová',
    startDate: new Date('2024-01-16T00:00:00').toString(),
    endDate: new Date('2024-01-28T00:00:00').toString(),
  },
};

export const loansSlice = createSlice({
  name: 'loans',
  initialState: INITIAL_STATE,
  reducers: {
    addLoan: (state: LoanState, action: { payload: LoanPayload }) => {
      const {
        id,
        propertyId,
        name,
        state: loanState,
        startDate,
        endDate,
      } = action.payload;
      state[id] = {
        id,
        propertyId,
        name,
        state: loanState,
        startDate,
        endDate,
      };
    },
    updateLoan: (state: LoanState, action: { payload: LoanPayload }) => {
      const { id, state: loanState, endDate } = action.payload;
      if (state[id]) {
        state[id] = {
          ...state[id], // spread the existing loan data
          state: loanState,
          endDate,
        };
      }
    },
    removeLoan: (
      state: RemoveLoanState,
      action: { payload: RemoveLoanPayload }
    ) => {
      const { id: idToRemove } = action.payload;
      delete state[idToRemove];
    },
  },
});

export const { addLoan, updateLoan, removeLoan } = loansSlice.actions;
