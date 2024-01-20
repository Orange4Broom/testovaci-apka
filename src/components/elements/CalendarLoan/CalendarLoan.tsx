import React from 'react';
import { Loan } from '../../../typings/loan';

import './CalendarLoan.scss';
import { Icon } from '../Icon/Icon';
import {
  setBackgroundColorByLoanState,
  setColorByLoanState,
  setIconByLoanState,
} from '../../../utils/state';
import { getLoanWidthByDate } from '../../../utils/date';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/base';

interface Props {
  id: string;
  loan: Loan;
  loanStartDate: string;
  loanEndDate: string;
  showStatus: boolean;
  top?: number;
}

export const CalendarLoan: React.FC<Props> = ({
  id,
  loan,
  loanStartDate,
  loanEndDate,
  showStatus,
  top,
}) => {
  const calendarEndDate = useSelector(
    (state: RootState) => state.rootState.calendarEndDate
  );

  return (
    <div
      key={id}
      style={{
        width: `${getLoanWidthByDate(loanStartDate, loanEndDate, calendarEndDate) * 60}px`,
        backgroundColor: setBackgroundColorByLoanState(loan.state),
        top: `${top}px`,
      }}
      className="loan"
    >
      {showStatus ? (
        <>
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
        </>
      ) : null}
    </div>
  );
};
