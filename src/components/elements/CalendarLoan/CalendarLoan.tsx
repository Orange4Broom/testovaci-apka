import React from 'react';
import { Loan } from '../../../typings/loan';

interface Props {
  key: string;
  loan: Loan;
}

export const CalendarLoan: React.FC<Props> = ({ key, loan }) => {
  return (
    <div key={key} className="loan">
      <div className="loan__close-button"></div>
      <p className="loan__state">{loan.state}</p>
    </div>
  );
};
