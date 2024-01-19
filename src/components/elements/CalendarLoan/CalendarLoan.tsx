import React from 'react';
import { Loan } from '../../../typings/loan';

import './CalendarLoan.scss';
import { Icon } from '../Icon/Icon';
import {
  setBackgroundColorByLoanState,
  setColorByLoanState,
  setIconByLoanState,
} from '../../../utils/state';

interface Props {
  id: string;
  loan: Loan;
  loanDayCount: number;
}

export const CalendarLoan: React.FC<Props> = ({ id, loan, loanDayCount }) => {
  return (
    <div
      key={id}
      style={{
        width: `${loanDayCount * 60}px`,
        backgroundColor: setBackgroundColorByLoanState(loan.state),
      }}
      className="loan"
    >
      <div className="loan__button">
        <Icon name="xmark" type="fas" color="dark-grey" />
      </div>

      <Icon
        name={setIconByLoanState(loan.state)}
        type="fas"
        color={setColorByLoanState(loan.state)}
      />
      <p style={{ color: setColorByLoanState(loan.state) }}>
        {`${loan.state[0].toUpperCase() + loan.state.slice(1)}`}
      </p>
    </div>
  );
};
