import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Loan } from '../../typings/loan';

interface InitialStateDefaultObject {
  loans: Loan[];
}

const INITIAL_STATE: InitialStateDefaultObject = {
  loans: [
    {
      id: '2',
      propertyId: 'AS34',
      name: 'bagr',
      state: 'nová',
      startDate: new Date('2024-01-02T00:00:00').toString(),
      endDate: new Date('2024-01-16T00:00:00').toString(),
    },
    {
      id: '3',
      propertyId: 'AS35',
      name: 'kladivo',
      state: 'hotová',
      startDate: new Date('2024-01-08T00:00:00').toString(),
      endDate: new Date('2024-01-20T00:00:00').toString(),
    },
    {
      id: '4',
      propertyId: 'AS36',
      name: 'lopatka',
      state: 'v přípravě',
      startDate: new Date('2024-01-12T00:00:00').toString(),
      endDate: new Date('2024-01-28T00:00:00').toString(),
    },
    {
      id: '5',
      propertyId: 'AS36',
      name: 'lopatka',
      state: 'hotová',
      startDate: new Date('2024-01-16T00:00:00').toString(),
      endDate: new Date('2024-01-28T00:00:00').toString(),
    },
  ],
};

export const loansSlice = createSlice({
  name: 'loans',
  initialState: INITIAL_STATE,
  reducers: {
    addLoan: (state, action: PayloadAction<Loan>) => {
      state.loans.push(action.payload);
    },
    updateLoan: (
      state,
      action: PayloadAction<{ id: Loan['id']; newLoan: Loan }>
    ) => {
      state.loans.map((loan) =>
        loan.id === action.payload.id ? action.payload.newLoan : loan
      );
    },
    removeLoan: (state, action: PayloadAction<Loan['id']>) => {
      state.loans.filter((loan) => loan.id !== action.payload);
    },
  },
});

export const { addLoan, updateLoan, removeLoan } = loansSlice.actions;
