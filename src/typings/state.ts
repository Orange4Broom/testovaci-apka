import { LoanPayload } from './payload';
import { RemoveLoanPayload, PropertyPayload } from './payload';

export interface LoanState {
  [key: string]: LoanPayload;
}

export interface RemoveLoanState {
  [key: string]: RemoveLoanPayload;
}

export interface RootState {
  isAddLoanOpen?: boolean;
  isEditLoanOpen?: boolean;
  loanId?: string;
  propertyId?: string;
  propertyName?: string;
  state?: string;
  startDate?: string;
  endDate?: string;
  calendarStartDate?: string;
  calendarEndDate?: string;
  openedProperties?: string[];
}

export interface PropertyState {
  [key: string]: PropertyPayload;
}
