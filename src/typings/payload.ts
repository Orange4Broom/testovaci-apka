export interface LoanPayload {
  id: string;
  propertyId: string;
  name: string;
  state: string;
  startDate: string;
  endDate: string;
}

export interface RemoveLoanPayload {
  id: string;
}

export interface PropertyPayload {
  id: string;
  parent_id?: string;
  name: string;
}
