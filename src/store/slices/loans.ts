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
      startDate: '2024-01-20',
      endDate: '2024-01-23',
    },
    {
      id: '3',
      propertyId: 'AS35',
      name: 'kladivo',
      state: 'hotová',
      startDate: '2024-01-21',
      endDate: '2024-01-27',
    },
    {
      id: '4',
      propertyId: 'AS36',
      name: 'lopatka',
      state: 'v přípravě',
      startDate: '2024-01-23',
      endDate: '2024-01-28',
    },
    {
      id: '5',
      propertyId: 'AS36',
      name: 'lopatka',
      state: 'hotová',
      startDate: '2024-01-24',
      endDate: '2024-01-29',
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
