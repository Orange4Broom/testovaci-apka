import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Loan } from '../../typings/loan';

interface InitialStateDefaultObject {
  loans: Loan[];
}

const INITIAL_STATE: InitialStateDefaultObject = {
  loans: [
    {
      id: '1',
      propertyId: 'AS34',
      name: 'Sekera',
      state: 'hotová',
      startDate: '2024-01-21',
      endDate: '2024-02-04',
    },
    {
      id: '2',
      propertyId: 'AS34',
      name: 'bagr',
      state: 'nová',
      startDate: '2024-01-20',
      endDate: '2024-02-16',
    },
    {
      id: '3',
      propertyId: 'AS34',
      name: 'kosa',
      state: 'v přípravě',
      startDate: '2024-01-23',
      endDate: '2024-01-28',
    },
    {
      id: '4',
      propertyId: 'AS35',
      name: 'kladivo',
      state: 'hotová',
      startDate: '2024-01-16',
      endDate: '2024-01-27',
    },
    {
      id: '5',
      propertyId: 'AS36',
      name: 'lopatka',
      state: 'v přípravě',
      startDate: '2024-01-23',
      endDate: '2024-01-28',
    },
    {
      id: '6',
      propertyId: 'AS37',
      name: 'kosa',
      state: 'v přípravě',
      startDate: '2024-01-23',
      endDate: '2024-01-28',
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
