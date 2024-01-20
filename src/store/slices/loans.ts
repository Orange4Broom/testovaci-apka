import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Loan } from '../../typings/loan';

interface InitialStateDefaultObject {
  loans: Loan[];
}

const INITIAL_STATE: InitialStateDefaultObject = {
  loans: [
    {
      id: '206734f0-f919-4ccb-baea-c69acd588545',
      propertyId: 'AS34',
      name: 'Sekera',
      state: 'hotová',
      startDate: '2024-01-21',
      endDate: '2024-02-04',
    },
    {
      id: '4f49ba91-41ba-46af-87d5-3cf0ea07186a',
      propertyId: 'AS34',
      name: 'bagr',
      state: 'nová',
      startDate: '2024-01-20',
      endDate: '2024-02-16',
    },
    {
      id: 'a993b413-79c3-4f0d-9aee-b4aee3301d61',
      propertyId: 'AS34',
      name: 'kosa',
      state: 'v přípravě',
      startDate: '2024-01-23',
      endDate: '2024-01-28',
    },
    {
      id: 'b6b57ae8-652a-4cba-8abc-dc5e6e5e895f',
      propertyId: 'AS35',
      name: 'kladivo',
      state: 'hotová',
      startDate: '2024-01-16',
      endDate: '2024-01-27',
    },
    {
      id: 'a50ed03a-1d09-4d74-8296-f712b5f86a38',
      propertyId: 'AS36',
      name: 'lopatka',
      state: 'v přípravě',
      startDate: '2024-01-23',
      endDate: '2024-01-31',
    },
    {
      id: '90f9aaba-20eb-4c4a-a26f-bd1ee3f2b15e',
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
      state.loans = state.loans.map((loan) =>
        loan.id === action.payload.id ? action.payload.newLoan : loan
      );
    },
    removeLoan: (state, action: PayloadAction<Loan['id']>) => {
      state.loans = state.loans.filter((loan) => loan.id !== action.payload);
    },
  },
});

export const { addLoan, updateLoan, removeLoan } = loansSlice.actions;
