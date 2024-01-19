import React from 'react';
import { Loan } from '../../../typings/loan';

import './CalendarLoan.scss';

interface Props {
  key: string;
  loan: Loan;
  loanDayCount: number;
}

export const CalendarLoan: React.FC<Props> = ({ key, loan, loanDayCount }) => {
  return (
    <div
      key={key}
      style={{
        width: `${loanDayCount * 60}px`,
      }}
      className="loan"
    >
      <div className="loan__button"></div>
      <p className="loan__state">{loan.state}</p>
    </div>
  );
};
