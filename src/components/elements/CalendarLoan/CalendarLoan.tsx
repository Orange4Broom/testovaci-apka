import React, { MouseEvent } from 'react';
import { Loan } from '../../../typings/loan';
import { useSelector, useDispatch } from 'react-redux';

import './CalendarLoan.scss';
import { Icon } from '../Icon/Icon';

import { getLoanWidthByDate } from '../../../utils/date';

import { RootState } from '../../../store/base';
import { removeLoan } from '../../../store/slices/loans';
import { updateRootState } from '../../../store/slices/rootStates';
import {
  setBackgroundColorByLoanState,
  setColorByLoanState,
  setIconByLoanState,
} from '../../../utils/state';

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
  const dispatch = useDispatch();
  const calendarEndDate = useSelector(
    (state: RootState) => state.rootState.calendarEndDate
  );

  const openModal = (
    e: MouseEvent,
    loanArray: Loan[],
    id: string,
    loanState: string,
    loanStartDate: string,
    loanEndDate: string
  ) => {
    e.stopPropagation();
    dispatch(
      updateRootState({
        isUpdateLoanOpen: true,
        loan: loanArray,
        loanId: id,
        state: loanState,
        startDate: loanStartDate,
        endDate: loanEndDate,
      })
    );
  };

  const removeLoanById = (e: MouseEvent, id: string) => {
    e.stopPropagation();
    dispatch(removeLoan(id));
  };

  return (
    <div
      key={id}
      style={{
        width: `${getLoanWidthByDate(loanStartDate, loanEndDate, calendarEndDate) * 60}px`,
        backgroundColor: setBackgroundColorByLoanState(loan.state),
        top: `${top}px`,
      }}
      className="loan"
      onClick={(e) =>
        openModal(e, [loan], id, loan.state, loan.startDate, loan.endDate)
      }
    >
      {showStatus ? (
        <>
          <div
            className="loan__button"
            onClick={(e) => removeLoanById(e, loan.id)}
          >
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
